## Etapes pour ajouter les métadonnées

1. Complétez la table "docs_catalog" dans la base Airtable Open Datactivist (ajoutez les métadonnées de votre document)
2. Exportez la table au format CSV
3. Convertir le [CSV en JSON](https://csvjson.com/csv2json), et le nommer ```docs_catalog.json```
4. Puis [ajoutez le ici](https://github.com/datactivist/nextjs-doc/upload/main/public/sitedata) (ça met à jour le catalogue automatiquement)
5. Enfin, ajoutez les dépendances nécessaires : exportez la table "authors" sous ```authors.csv``` et même opération pour les autres tables si ajout de dépencances depuis votre document (références, partenaires...). Bien vérifier le [nommage des fichiers ici](https://github.com/datactivist/nextjs-doc/tree/main/public/sitedata)


## Effectuer la *pull request*

### Option 1 : plus rapide

Si vous avez bien vérifié le nom de votre export (c'est le plus important) ```docs_catalog.json```, cela fonctionnera très bien.

Lancez la pull request, directement sur la branche principale (main)

### Option 1 : plus sûre mais plus lente

Effectuez la *pull request* en **évitant de la lancer sur la branche principale**

![1](/images/canvas/contribution-opendatactivist/1.png)

Une fois effectuée, des tests automatiques sont réalisés, et dès qu'ils sont validés, vous pouvez cliquer sur *Merge pull request*

Et donc... à répéter pour chaque fichier

--- 

## Détails sur les métadonnées

Il s'agit des métadonnées du fichier, qui permettent notamment d'alimenter le catalogue des documents.

```title``` : titre du doc

```image``` : le chemin de l'image qui illustre le doc. Veiller à ce que l'image d'illustration ne dépasse pas les 150 KB

```description``` : la description courte du contenu, en une phrase

```type``` : Formation, Liste, Guide, Cas pratique...

```tags``` : les mots clés (dataviz, commande publique, qualité, etc...)

```index``` : ```0``` pour ne pas afficher le contenu dans le catalogue, ```1``` pour qu'il s'affiche dans le catalogue

```index``` : date de publication au format ```yyyy-mm-dd```

