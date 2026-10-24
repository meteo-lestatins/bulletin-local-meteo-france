# Utiliser le code commun

L'installation conserve son profil JSON, ses secrets et ses données. Elle suit automatiquement la branche main du moteur.

Profil minimal : identifiant, nom, lieu, latitude, longitude, département et fuseau horaire. Exemple : test/fixtures/site.json. Champs facultatifs : headerAltitude, headingPrefix et publicUrl.

Dans son workflow GitHub Actions, après actions/checkout :

    - uses: nicklausFR/bulletin-local-meteo-france@main
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

Chaque reconstruction reprend le dernier code de main. Les exécutions programmées propagent donc les mises à jour du moteur sans intervention dans les installations.

Pour une exécution comprenant plusieurs jobs, résoudre main une seule fois, vérifier le moteur puis réutiliser ce commit dans tous les jobs. Le paramètre updates fusionne les acquisitions par cycle sans remplacer les données récentes par un résultat ancien.
