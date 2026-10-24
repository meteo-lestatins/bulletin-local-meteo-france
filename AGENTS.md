# Règles du projet

- Base générique de bulletin météo local. Ne pas ajouter d'administration, de fichier de configuration utilisateur ou de module optionnel sans demande.
- Aucun déploiement ni activation de GitHub Pages sans demande explicite.
- Ne jamais versionner de jeton, de fichier .env ou de données météo locales. Les collectes Actions lisent METEO_FRANCE_API_KEY dans GitHub Secrets.
- Avant toute modification distante : vérifier le compte et origin, puis exécuter le script GitHub multicompte avec nicklausFR et bulletin-local-meteo-france.
- Pour une évolution visible ou fonctionnelle, ajouter une ligne dans CHANGELOG.md : JJ/MM/AAAA HH:mm — vN — changements.
- Vérifications : npm ci, npm run check, npm test et npm run build.
