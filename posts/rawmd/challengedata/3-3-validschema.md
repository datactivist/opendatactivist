## 3.1 Valider le schéma des données

### Premier pas : vérifier les schémas des jeux de données à l'aide des validateurs

Pour certains jeux de données, un validateur existe : il permet de vérifier si le schéma (l'agencement du fichier) est respecté et si les valeurs (cellules) sont complètes.

[Ressource clé](https://nextcloud.datactivist.coop/f/1686810 "canvaLinkButton")

### Deuxième pas : vérifier les schémas "manuellement" lorsqu'ils ne disposent pas de validateurs

Lorsqu'il n'existe pas de validateur pour vérifier les jeux de données, une méthode permet de garantir un niveau minimal de qualité. 

Pour cela, il est nécessaire de vérifier l'agencement des différentes colonnes et leur nom. 

Ensuite, chaque champ (colonne) doit faire l'objet d'un contrôle aléatoire : 

Pour chaque colonne, vérifier cinq enregistrements (cellules), de manière aléatoire. Sur ces cinq enregistrements, combien correspondent au format attendu ? 

Si pour chaque colonne, les 5 enregistrements contrôlés correspondent au format attendu, on pourra considérer que le jeu de données ne contient pas d'erreur majeure de structuration.

### Résultat attendu

Des jeux de données qui correspondent aux schémas : 

Un rapport de validation qui ne soulève pas  d'erreur de structure (pour les jeux de données validés grâce à un valideur).

Pour les autres jeux de données, une structure qui correspond au modèle (après vérification "manuelle").
