# Configuration privée

Tout le code, les workflows et le modèle de configuration sont dans ce dépôt. Les installations sont des forks sans modification du code.

Copier site.private.example.conf dans un fichier site.private.conf, puis compléter :
- site.name : nom complet affiché, dans un seul champ ;
- site : coordonnées, département pour la Vigilance, altitude affichée dans l’en-tête, fuseau, adresse publique et dépôt GitHub ;
- githubToken : jeton du dépôt du site, autorisations Contents, Workflows et Actions en écriture ;
- meteoFranceToken : jeton des API Météo-France.

Les commentaires commencent par # ; le texte entre guillemets est conservé tel quel. Les commentaires ne sont pas publiés. L’identifiant technique est généré à partir des coordonnées, sans saisie manuelle.

Garder ce fichier privé. Dans chaque fork, enregistrer son contenu dans un seul secret GitHub Actions nommé BULLETIN_CONFIG. Aucun fichier propre au lieu n’est à commiter. Les Actions ne publient que les paramètres du lieu nécessaires au bulletin ; les jetons restent privés.

Dans l’administration, choisir ce même fichier privé puis demander la mise à jour. Le fichier est lu localement ; son jeton GitHub autorise la demande. Le code commun est récupéré, puis le site est construit et publié avec sa configuration privée.

En local : node scripts/private-config.mjs --file=/chemin/site.private.conf, puis npm run build -- --profile=.cache/site-config/site.json.

Activer Actions et choisir GitHub Actions pour Pages sur le fork. La collecte garde la version installée jusqu’à une mise à jour volontaire : PIAF toutes les cinq minutes, autres prévisions chaque heure, sous réserve des délais de GitHub Actions.

Un dépôt indépendant déjà existant ne devient pas un fork en fusionnant une branche. Les anciennes branches de préparation ne changent pas ce statut. La migration vers de vrais forks et leur activation doivent préserver les sites actuellement publiés.
