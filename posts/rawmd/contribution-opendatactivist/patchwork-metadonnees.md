## Créer un fichier csv avec toutes les étapes

- ↓ [Téléchargez ce modèle](https://github.com/datactivist/nextjs-doc/blob/main/public/sitedata/canvas/standards.csv)
- Adaptez-le avec le contenu souhaité

## Complétez les étapes / sections du patchwork

Chaque ligne du tableau est une section du patchwork, ce sera une page par section.
Et donc chaque section sera un fichier markdown distinct.

### Métadonnées

**⚠️ La première ligne du tableau génère les métadonnées**

- Pour la colonne ```filename``` il faut inscrire la valeur "meta"
- Pour la colonne ```title``` choisissez le titre de votre patchwork
- Pour la colonne ```level``` il faut inscrire la valeur "0"
- Pour la colonne ```description```choisissez une phrase courte qui décrit le patchwork

### Sections

Chaque ligne représente une section

- ```filename``` sera la section de l'url et le nom du fichier markdown dans lequel le contenu sera rédigé
- ```title``` est le nom de la section, qui sera affiché dans le menu de navigation
- ```level```est le niveau de titre, utilisé pour l'ordre et pour déterminer si c'est un titre de premier ou second niveau
  - Titre principal (ex: ```1``` ou ```2``` ou ```3```, etc...) = il regroupera un ensemble de section
  - Titre secondaire (ex: ```1.2``` ou ```2.3```, etc...) = c'est une section, qui ne peut pas comprendre d'autres ensemmbles
- ```description``` ne doit pas être complété (sauf pour la 1ère ligne, les métadonnées)

## Uploader le fichier dans le site

Une fois votre tableau terminé :

- Enregistrez-le sous le nom ```[url-du-patchwork].csv```
- [Ajoutez-le ici](https://github.com/datactivist/nextjs-doc/tree/main/public/sitedata/canvas)