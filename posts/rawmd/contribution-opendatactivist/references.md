## Ajouter une référence

- L'ajout se fait directement dans la table "références" de la base Airtable Open Datactivist
- 👉 Reprenez le modèle d'une autre ligne
- Pour afficher les puces sous forme d'icones, dans ```Missions```et dans ```Actions```, c'est automatique (à chaque saut de ligne, une étape).
- 🏞️ Les images sont ajoutées automatiquement, il faut seulement [importer votre image ici](https://github.com/datactivist/opendatactivist/tree/main/public/images/references) et la nommer ```[nom-reference].png```

## Ne pas oublier les dépendances

Lorsque vous ajoutez des références, vous les liez probablement à des "docs", des "authors", des "partners".

Dans ce cas, les relations se font automatiquement, mais il faut exporter les tables concernées

- ```references.csv```
- ```docs_catalog.csv``` --> ⚠️ à transformer en ```docs_catalog.json```
- ```authors.csv```
- ```partners.csv``` ([importer le logo du partenaire ici](https://github.com/datactivist/opendatactivist/upload/main/public/images/partners)

## Importer les fichiers dans Github

- Une fois les exports réalisés, [ajoutez les fichiers ici](https://github.com/datactivist/opendatactivist/upload/main/public/sitedata) 
- Lancez une *pull request*
