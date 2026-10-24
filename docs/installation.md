# Utiliser le code commun

L'installation conserve son profil JSON, ses secrets et ses données. Elle choisit une version précise du moteur.

Profil minimal : identifiant, nom, lieu, latitude, longitude, département et fuseau horaire. Exemple : test/fixtures/site.json. Champs facultatifs : headerAltitude, headingPrefix et publicUrl.

Dans son workflow GitHub Actions, après actions/checkout :

    - uses: nicklausFR/bulletin-local-meteo-france@COMMIT
      id: bulletin
      with:
        profile: site.json
        state: .cache/weather/site.json
        collect: 'true'
      env:
        METEO_FRANCE_API_KEY: ${{ secrets.METEO_FRANCE_API_KEY }}

Le dossier construit est fourni dans steps.bulletin.outputs.site-directory. L'action ne déploie rien.

Avec collect: 'false', seules les données déjà disponibles sont utilisées. publicUrl permet de restaurer les derniers JSON publics en cas de cache absent. Aucun token d'API n'est envoyé à cette adresse.

En local : npm run build -- --profile=/chemin/site.json --state=/chemin/etat.json

Changer de version du moteur consiste à remplacer COMMIT après validation de l'aperçu.
