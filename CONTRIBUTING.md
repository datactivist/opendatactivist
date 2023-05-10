# Guide de contributions

> **Note**  
> For an English version of this document, please see [CONTRIBUTING.en.md](/CONTRIBUTING.en.md).

Merci de l'intérêt que vous portez à ce projet ! Toutes les contributions sont les bienvenues, qu'il s'agisse de rapports d'erreurs, de demandes de fonctionnalités, d'ajout de contenu, d'améliorations de la documentation ou de modifications du code.

## Signaler un problème ou proposer une nouvelle fonctionnalité

Si vous trouvez un problème ou si vous avez une suggestion de fonctionnalité, vous pouvez ouvrir une nouvelle [issue](https://github.com/datactivist/nextjs-doc/issues/new).

Lorsque vous ouvrez une issue :

> 1. Vérifiez les [issues](https://github.com/datactivist/nextjs-doc/issues) et [pull requests](https://github.com/datactivist/nextjs-doc/pulls) pour vous assurez que le problème ou la fonctionalité n'ont pas déja été adréssé ou sont en cours de traitement.
> 2. Soyez le plus descriptif possible quant à la nature du problème ou de la fonctionnalité. Si vous avez trouvé un problème, fournissez des étapes pour le reproduire lorsque cela est possible.

## Contribuer au contenu

### Ajouter un doc 

[Ajout rapide](https://github.com/datactivist/nextjs-doc/new/main/posts/docs/filename=nom-du-doc.md))

Quels types de contenus publier dans le dossier docs ?
- article (type billet de blog) 
- présentation, 
- liste de liens ou d'objets (benchmarks)

#### Les métadonnées (entête YAML)
Il s'agit des métadonnées du fichier, qui permettent notamment d'alimenter le catalogue des documents

```title``` : titre du doc

```image``` : le chemin de l'image qui illustre le doc

```description``` : la description courte du contenu, en une phrase

```type``` : Formation, Liste, Guide, Cas pratique...

```tags``` : les mots clés (dataviz, commande publique, qualité, etc...)

```index``` : ```0``` pour ne pas afficher le contenu dans le catalogue, ```1``` pour qu'il s'affiche dans le catalogue

```index``` : date de publication au format ```yyyymmdd```



## Contribuer au code

Les contributions sur ce dépôt sont les bienvenues !

Si vous souhaitez contribuez à l'ajout d'une fonctionnalité ou à la correction d'un bug, suivez ces étapes :

> 1. Vérifiez les [issues](https://github.com/datactivist/nextjs-doc/issues) et [pull requests](https://github.com/datactivist/nextjs-doc/pulls) pour vous assurez que le problème ou la fonctionalité n'ont pas déja été adréssé ou sont en cours de traitement.
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
