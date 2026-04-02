# Guide de contributions

> **Note**  
> For an English version of this document, please see [CONTRIBUTING.en.md](/CONTRIBUTING.en.md).

Merci de l'intérêt que vous portez à ce projet ! Toutes les contributions sont les bienvenues, qu'il s'agisse de rapports d'erreurs, de demandes de fonctionnalités, d'ajout de contenu, d'améliorations de la documentation ou de modifications du code.

## Signaler un problème ou proposer une nouvelle fonctionnalité

Si vous trouvez un problème ou si vous avez une suggestion de fonctionnalité, vous pouvez ouvrir une nouvelle [issue](https://github.com/datactivist/opendatactivist/issues/new).

Lorsque vous ouvrez une issue :

> 1. Vérifiez les [issues](https://github.com/datactivist/opendatactivist/issues) et [pull requests](https://github.com/datactivist/opendatactivist/pulls) pour vous assurez que le problème ou la fonctionalité n'ont pas déja été adréssé ou sont en cours de traitement.
> 2. Soyez le plus descriptif possible quant à la nature du problème ou de la fonctionnalité. Si vous avez trouvé un problème, fournissez des étapes pour le reproduire lorsque cela est possible.

# Contribuer au contenu

Consultez également en ligne [une documentation plus conviviale](https://open.datactivist.coop/canvas/contribution-opendatactivist).

## Ajouter un doc 

### Métadonnées

1. Complétez la table "docs_catalog" dans la base Airtable Open Datactivist (ajoutez les métadonnées de votre document)
2. Exportez la table au format CSV
3. Convertir le [CSV en JSON](https://csvjson.com/csv2json), et le nommer ```docs_catalog.json```
4. Puis [ajoutez le ici](https://github.com/datactivist/opendatactivist/upload/main/public/sitedata) (ça met à jour le catalogue automatiquement)
5. Enfin, ajoutez les dépendances nécessaires : exportez la table "authors" sous ```authors.csv``` et même opération pour les autres tables si ajout de dépencances depuis votre document (références, partenaires...). Bien vérifier le [nommage des fichiers ici](https://github.com/datactivist/opendatactivist/upload/main/public/sitedata)

✏️ **En utilisant NextCloud** 
1. Se rendre dans le dossier OpenDatactivist / docs
2. Créer un fichier texte (md) et le nommer par exemple ```methode-ouverture-donnees```
3. Commencer à rédiger le contenu, sans écrire le titre (qui sera ajouté par les métadonnées)

⚡️ [Ajout rapide sans interpreteur Markdown](https://github.com/datactivist/opendatactivist/new/main/posts/docs/filename=nom-du-doc.md))

👉 [Un exemple fichier que vous pouvez copier et adapter](https://raw.githubusercontent.com/datactivist/opendatactivist/main/posts/docs/demo-doc.md)

Quels types de contenus publier dans le dossier docs ?
- article (type billet de blog) 
- présentation, 
- liste de liens ou d'objets (benchmarks)

### Compléter les métadonnées (entête YAML)

Il s'agit des métadonnées du fichier, qui permettent notamment d'alimenter le catalogue des documents.

```title``` : titre du doc

```image``` : le chemin de l'image qui illustre le doc. 
> **Warning**  
> Veiller à ce que l'image d'illustration ne dépasse pas les 150 KB

```description``` : la description courte du contenu, en une phrase

```type``` : Formation, Liste, Guide, Cas pratique...

```tags``` : les mots clés (dataviz, commande publique, qualité, etc...)

```index``` : ```0``` pour ne pas afficher le contenu dans le catalogue, ```1``` pour qu'il s'affiche dans le catalogue

```index``` : date de publication au format ```yyyy-mm-dd```

### Rédiger votre contenu (Markdown / html)

Chaque document peut être rédigé en markdown, avec un peu de html.

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

Un saut de ligne : 

```html
</br>
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

Ajouter une image : 

```html
<img src="/images/docs/nettoyer-donnees/tidydata.png" alt="variables, observations, valeurs" width="800"/>
```
>**Note**
>Pour ajouter une image, la placer dans le dossier public/images/docs/dossier-du-doc/votre-image.png

Ajouter un iframe

```html
<div class="responsiveIframe">
  <iframe
    width="100%"
    height="500"
    src="https://datactivist.coop/upop/#1">
  </iframe>
</div>
```

### Intégrer d'autres contenus

Tout l'intérêt du site est de permettre de trouver facilement du contenu pertinent au bon endroit.

Plusieurs intégrations sont possibles :

#### 1. Un autre doc

Par exemple, vous souhaitez ajouter un cas pratique ou un article pertinent, il sufit d'ajouter le code suivant

```markdown
## Un cas pratique pertinent

%%Docs:nom-du-doc%%
```
>**Note**
>Vous pouvez en ajouter plusieurs, et ils s'afficheront comme une galerie :

```markdown
## Quelques articles complémentaires

%%Docs:nom-du-doc,nom-deuxieme-doc,nom-troisieme-doc%%```
```

#### 2. Des liens

Pour ajouter un lien sous la forme d'une carte, il est d'abord nécessaire de l'ajouter dans le fichier des liens ```links.catalog.json``` [qui se trouve ici](https://github.com/datactivist/opendatactivist/blob/main/public/sitedata/links-catalog.json)

2.1. Ajoutez votre lien comme ceci à la fin du fichier

```json
 {
      "id": "id-unique-lien",
      "title": "Le nom du lien",
      "type": "outil",
      "description": "Description courte du lien",
      "url": "https://votre-url.com",
      "tags": ["Data Science", "IA", "Climat"]
 }
 ```
 
2.2. Intégrez votre lien dans le corps de texte de votre doc

```markdown
## Liens utiles

%%Links:id-unique-lien%%
```
>**Note**
>Vous pouvez en ajouter plusieurs, et ils s'afficheront comme une galerie :

```markdown
## Liens utiles

%%Links:id-unique-lien,autrelien,lien3%%
```

#### 3. Une conversation sur TeamOpenData

3.1. Ajoutez le lien de la conversation à la suite du [fichier des liens](https://github.com/datactivist/opendatactivist/blob/main/public/sitedata/links-catalog.json)

> **Warning**  
> Pour que le lien s'affiche comme une conversation, il est nécessaire de le catégoriser en "type = tod"

Exemple : 

```json
    {
      "id": "2469",
      "title": "Médiation scientifique autour de la donnée",
      "type": "tod",
      "description": "",
      "url": "https://teamopendata.org/t/mediation-scientifique-autour-de-la-donnee/2469",
      "tags": ["mediation", "exposition"]
    },
```
3.2. Intégrez votre lien dans le corps de texte de votre doc

```markdown
## On en discute sur TeamOpenData

%%Links:2469%%
```

#### 4. Une cartographie de données

(Méthode complète à venir)

4.1. Téléchargez les exports des tables depuis Airtable (base master - cartographies de données)

4.2. Remplacer les fichiers public/datamap

4.3. Insérez un iframe du datamap vers la vue épurée. Exemple : https://open.datactivist.coop/view/datamaplight?data&datamap-id=sud-transports

4.4. Ajoutez un lien vers la cartographie complète. Exemple : https://open.datactivist.coop/datamap/datamap?data=&datamap-id=sud-transports&view=gallery 

#### 5. Des jeux de données data.gouv.fr

Si vous souhaitez afficher des jeux de données pertinents (et qu'ils sont disponibles sur data.gouv.fr) :

3.1 - Récupérez l'identifiant d'un jeu de données sur data.gouv.fr (onglet informations > ID)
Exemple : ```5de8f397634f4164071119c5```

3.2. - Intégrez le dans votre doc

```markdown
## Les données utilisées
%%Datagouv:5de8f397634f4164071119c5%%
```

>**Note**
>Vous pouvez en ajouter plusieurs, et ils s'afficheront comme une galerie :

```markdown
## Les données utilisées

%%Datagouv:5b7ffc618b4c4169d30727e0,5de8f397634f4164071119c5%%
```

#### 6. Des données sous la forme d'une gallerie

4.1 - Ajoutez un CSV dans le fichier ```/posts/data```
>**Note**
>Nommez le fichier de manière simple, du type ```liste-epci-france```
>Veillez à supprimer les champs qui comportent des textes trop longs ou qui ne sont pas adaptés pour un affichage en lecture (exemple : les coordonnées géographiques)

>**Warning**
>Les performances ne sont pas optimales si le CSV comporte plusieurs millers d'enregistrements

4.2 - Intégrez la galerie dans votre doc
```markdown
%%JsonGallery:nom-de-votre-csv%%
```

## Contribuer au code

Les contributions sur ce dépôt sont les bienvenues !

Si vous souhaitez contribuez à l'ajout d'une fonctionnalité ou à la correction d'un bug, suivez ces étapes :

> 1. Vérifiez les [issues](https://github.com/datactivist/opendatactivist/issues) et [pull requests](https://github.com/datactivist/opendatactivist/pulls) pour vous assurez que le problème ou la fonctionalité n'ont pas déja été adréssé ou sont en cours de traitement.
> 2. Faites un **Fork** du dépôt.
> 3. Suivez le [guide d'installation](/INSTALL.md) pour lancer le projet dans un environnement de **développement local**.
> 4. Créez une nouvelle branche dans votre fork, et faites les changements souhaités dans celle-ci.
> 5. Ajoutez la **documentation** et/ou les **tests** associés à vos modifications si applicable.
> 6. Appliquez les [conventions de style](#conventions-de-style) du projet. Testez votre code en utilisant `npm run lint` et `npm run test`.
> 7. Ouvrez une **Pull Request** de votre branche vers ce dépôt.
> 8. Dans la description de la **Pull Request**, expliquez les changements que vous avez apporté et pourquoi ils sont nécessaires.

## Conventions de style & pre-commit

Ce projet utilise [ESLint](https://eslint.org/) pour le linting et [Prettier](https://prettier.io/) pour le formatage du code. Les règles de style sont définies dans le fichier `.eslintrc` et les règles de formatage dans le fichier `.prettierrc`.

Vous pouvez lancer les commandes suivantes pour appliquez les styles automatiquement, et vérifier que votre code est conforme aux règles de style et de formatage :

```bash
npm run format
npm run lint:fix
npm run lint
```

Alternativement, si vous utilisez **VSCode**, vous pouvez installer les extensions associés à **ESLint** et **Prettier** pour obtenir un feedback directement dans votre éditeur.

> **Warning**  
> Ce projet utilise [husky](https://www.npmjs.com/package/husky) pour s'assurer que le code est conforme avant chaque commit, si `npm run lint` ou `npm run test` renvoie des erreurs, le commit est annulé.
