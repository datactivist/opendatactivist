# Syntaxe Markdown

Chaque document peut être rédigé en markdown, avec parfois un peu de html.

```markdown
# Titre de premier niveau
```

```markdown
## Titre de 2e niveau
```

```markdown
### Titre de 3e niveau
```

```markdown
#### Titre de 4e niveau
```

```markdown
Du texte
```

```html
Un saut de ligne

</br>

Une autre ligne
```

```markdown
**Texte en gras**
```

```markdown
*Texte en italique*
```

```markdown
[Voici un lien](https://datactivist.coop)
```

### Images

Pour ajouter une image, la placer dans ce dossier [public/images/docs/dossier-du-doc/votre-image.png](https://github.com/datactivist/opendatactivist/tree/main/public/images/docs)

Puis l'insérer comme ceci dans le document

```html
<img src="/images/docs/nettoyer-donnees/tidydata.png" alt="variables, observations, valeurs" width="800"/>
```

### Ajouter un iframe

```html
<div class="responsiveIframe">
  <iframe
    width="100%"
    height="500"
    src="https://datactivist.coop/upop/#1">
  </iframe>
</div>
```

## Intégrer d'autres contenus

Tout l'intérêt du site est de permettre de trouver facilement du contenu pertinent au bon endroit.

Plusieurs intégrations sont possibles :

### 1. Un autre doc

Par exemple, vous souhaitez ajouter un cas pratique ou un article pertinent, il sufit d'ajouter le code suivant

```markdown
## Un cas pratique pertinent

%%Docs:nom-du-doc%%
```

**Note** : Vous pouvez en ajouter plusieurs, et ils s'afficheront comme une galerie :

```markdown
## Quelques articles complémentaires

%%Docs:nom-du-doc,nom-deuxieme-doc,nom-troisieme-doc%%```
```

### 2. Des liens

#### 2.1. Ajoutez la ressourre externe

⚠️ Vérifiez si cette resssource n'existe pas déjà

[Voir toutes les ressources externes](https://open.datactivist.coop/links "canvaLinkButton")

Pour ajouter un lien sous la forme d'une carte, il est d'abord nécessaire de l'ajouter dans le fichier des liens.

[Ajouter un lien](https://airtable.com/appyfWzMQVuv4ZoNR/shrQqei9MsiEfurnQ "canvaLinkButton")
 
#### 2.2. Intégrez votre lien dans le corps de texte de votre doc

```markdown
## Liens utiles

%%Links:id-unique-lien%%
```

**Note** : Vous pouvez en ajouter plusieurs, et ils s'afficheront comme une galerie :

```markdown
## Liens utiles

%%Links:id-unique-lien,autrelien,lien3%%
```

**2.3. Pensez à exporter la table Airtable des liens** en la nomant ```links.csv``` puis [la téléverser ici](https://github.com/datactivist/opendatactivist/tree/main/public/sitedata)

### 3. Une conversation sur TeamOpenData

#### 3.1. Ajoutez le lien de la conversation

⚠️ Pour que le lien s'affiche comme une conversation, il est nécessaire de le catégoriser en "type = tod"

[Ajouter un lien](https://airtable.com/appyfWzMQVuv4ZoNR/shrQqei9MsiEfurnQ "canvaLinkButton")

**3.2. Pensez à exporter la table Airtable des liens** en la nomant ```links.csv``` puis [la téléverser ici](https://github.com/datactivist/opendatactivist/tree/main/public/sitedata)

#### 3.3. Intégrez votre lien dans le corps de texte de votre doc

```markdown
## On en discute sur TeamOpenData

%%Links:2469%%
```

### 4. Une cartographie de données

(Méthode complète à venir)

4.1. Téléchargez les exports des tables depuis Airtable (base master - cartographies de données)

4.2. Remplacer les fichiers public/datamap

4.3. Insérez un iframe du datamap vers la vue épurée. Exemple : https://open.datactivist.coop/view/datamaplight?data&datamap-id=sud-transports

4.4. Ajoutez un lien vers la cartographie complète. Exemple : https://open.datactivist.coop/datamap/datamap?data=&datamap-id=sud-transports&view=gallery 

### 5. Des jeux de données data.gouv.fr

Si vous souhaitez afficher des jeux de données pertinents (et qu'ils sont disponibles sur data.gouv.fr) :

5.1 - Récupérez l'identifiant d'un jeu de données sur data.gouv.fr (onglet informations > ID)
Exemple : ```5de8f397634f4164071119c5```

5.2. - Intégrez le dans votre doc

```markdown
## Les données utilisées
%%Datagouv:5de8f397634f4164071119c5%%
```

**Note** : Vous pouvez en ajouter plusieurs, et ils s'afficheront comme une galerie :

```markdown
## Les données utilisées

%%Datagouv:5b7ffc618b4c4169d30727e0,5de8f397634f4164071119c5%%
```

### 6. Des données sous la forme d'une gallerie

#### 6.1 - Ajoutez un CSV dans le fichier ```/posts/data```

**Note** : Nommez le fichier de manière simple, du type ```liste-epci-france```

Veillez à supprimer les champs qui comportent des textes trop longs ou qui ne sont pas adaptés pour un affichage en lecture (exemple : les coordonnées géographiques)

⚠️ : Les performances ne sont pas optimales si le CSV comporte plusieurs millers d'enregistrements

#### 6.2 - Intégrez la galerie dans votre doc

```markdown
%%JsonGallery:nom-de-votre-csv%%
```