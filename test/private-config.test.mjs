import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { parsePrivateConfig, preparePrivateConfig } from '../scripts/private-config.mjs';
import { adminTokenFromConfig } from '../public/admin-api.js';

const value = () => ({
  site: { id:'example',name:'Bulletin',place:'Exemple',latitude:48.8566,longitude:2.3522,
    department:'75',timezone:'Europe/Paris',githubRepository:'example/weather' },
  githubToken:'github-private-fixture',meteoFranceToken:'meteo-private-fixture'
});
test('private config exports only the public profile; masks credentials and scopes the repository', async () => {
  const workspace=await mkdtemp(path.join(os.tmpdir(),'bulletin-config-'));
  try {
    const config=value(), masked=[];
    const result=await preparePrivateConfig({ text:JSON.stringify(config),workspace,
      expectedRepository:'example/weather',outputFile:path.join(workspace,'outputs'),
      envFile:path.join(workspace,'environment'),mask:token=>masked.push(token) });
    const profileText=await readFile(result.profilePath,'utf8');
    assert.equal(profileText.includes(config.githubToken),false);
    assert.equal(profileText.includes(config.meteoFranceToken),false);
    assert.equal(JSON.parse(profileText).latitude,48.8566);
    assert.deepEqual(masked,[config.githubToken,config.meteoFranceToken]);
    assert.equal(await readFile(path.join(workspace,'environment'),'utf8'),'METEO_FRANCE_API_KEY='+config.meteoFranceToken+'\n');
    await assert.rejects(preparePrivateConfig({text:JSON.stringify(config),workspace,expectedRepository:'other/site'}),/autre dépôt/);
  } finally { await rm(workspace,{recursive:true,force:true}); }
});
test('invalid JSON and injected environment lines never expose credentials in errors', () => {
  assert.throws(()=>parsePrivateConfig('{"githubToken":"private-value"'),error=>!error.message.includes('private-value'));
  const config=value(); config.meteoFranceToken='private\nINJECTED=value';
  assert.throws(()=>parsePrivateConfig(JSON.stringify(config)),error=>!error.message.includes('private\n'));
});
test('admin reads only the GitHub authorization from the matching private file', () => {
  const config=value();
  assert.equal(adminTokenFromConfig(JSON.stringify(config),'example/weather'),config.githubToken);
  assert.throws(()=>adminTokenFromConfig(JSON.stringify(config),'other/weather'),/autre site/);
  config.githubToken='';
  assert.throws(()=>adminTokenFromConfig(JSON.stringify(config),'example/weather'),/githubToken/);
});
