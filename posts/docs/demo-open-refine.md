---
title: Demo Open Refine
image: /images/docs/demo-open-refine/openrefine.jpeg
description: Démonstration de l'outil open refine, pour préparer et mettre en qualité des données
type: Guide
tags:
  - outil
  - qualité
  - data science
index: 1 #0 pour ne pas afficher le contenu dans le catalogue, 1 pour qu'il s'affiche dans le catalogue
date: 2022-01-01
---

> Ce guide a été produit par Datactivist, pour le Ministère de la Culture. L'outil Open Refine est un outil qui permet de nettoyer et préparer des données, par exemple pour réaliser une visualisation.

%%Links:openrefine%%

# Charger un fichier

Charger le fichier, plusieurs format sont acceptés.
<br></br>
<img src="/images/docs/demo-open-refine/demo_OR_1.png" alt="1" width="600"/>

<br></br>

# Sélectionner les options et créer le projet

Suivant les cas : choix du séparateur, de l'encodage, de l'en-tête...puis créer le projet.
<br></br>
<img src="/images/docs/demo-open-refine/demo_OR_2.png" alt="2" width="600"/>

<br></br>

# Les facettes

Le contenu de chaque colonne peut être visualiser sous la forme de facette.
Test sur la facette *Commune* : changer la valeur blank

<br></br>

## Changer une valeur

Faire une facette sur *Affectataire* : changer la Direction Générale du Patrimoine en Ministère de la Culture

- **Méthode 1** : en modifiant la valeur dans la fenêtre des facettes (*edit*)

- **Méthode 2** : en sélectionnant la colonne, *edit cells* et *replace*, permet de faire le changement grâce à un chercher-remplacer

<br></br>

<img src="/images/docs/demo-open-refine/demo_OR_5.png" alt="5" width="600"/>

<br></br>

**Méthode 3** : par une expression régulière, *edit cells*, *transform* puis saisir

<code>value.replace("direction générale des patrimoines","Ministère de la Culture")</code>

<br></br>

<img src="/images/docs/demo-open-refine/demo_OR_6.png" alt="6" width="600"/>

<br></br>

**Méthode 4** : par du rapprochement sémantique. Pour cela il faut choisir une autre colonne, par exemple *commune*

<br></br>

## Séparer des colonnes

Choisir la colonne *Date de protection*, *split into several columns* et choisir les paramètres. Ne garder que la date dans la colonne.

<br></br>

<img src="/images/docs/demo-open-refine/demo_OR_8.png" alt="8" width="600"/>

<br></br>

## Autres changements

### Changer le type de champ

La colonne date peut être transformer en une véritable colonne de date : choisir la colonne, *edit cells*, *commons transforms*, *to date*

<br></br>

<img src="/images/docs/demo-open-refine/demo_OR_9.png" alt="9" width="600"/>

<br></br>

## Supprimer des espaces

Lors des changements précédents des espaces sont apparus en tête de champ, ils peuvent être supprimés : *edit cells*, *Trim leading and trailing whitespace* 

<br></br>

# Aller plus loin avec Open Refine

Open Refine peut appeler l'API de Wikidata, la base de données en web sémantique de Wikimédia. Il est ainsi possible de récupérer des éléments de Wikidata.

Par exemple, notre fichier comprend, pour certains monuments, un auteur. Si ces auteurs existent sur Wikidata, il est possible de rapatrier des informations, par exemple leur lieu de naissance.

<br></br>

Cette opération s'appelle une *réconciliation* de données.

<br></br>

## Réconciliation des auteurs

Choisir la colone puis *reconcile*, *start reconciling* ajouter le service de réconciliation français

<br></br>

👉 https://wikidata.reconci.link/fr/api

<br></br>

<img src="/images/docs/demo-open-refine/demo_OR_11.png" alt="11" width="600"/>

<br></br>

La réconciliation porte sur des être humains, *start reconciling*

<br></br>

<img src="/images/docs/demo-open-refine/demo_OR_12.png" alt="12" width="600"/>

<br></br>

Le système à fait le lien entre notre fichier et Wikidata, il propose une correspondance (matching), si cela correspond bien il faut le valider.

<br></br>

<img src="/images/docs/demo-open-refine/demo_OR_13.png" alt="13" width="600"/>

<br></br>

**Alors ?**

<br></br>

La qualité de la colonne ne permet pas de faire une bonne réconciliation.

<br></br>

## Réconciliation à partir d'un identifiant

Tentons la réconciliation sur une autre colonne : *Référence*. Wikidata intègre de nombreux référentiel dont celui sur les identifiants des monuments historiques. 

<br></br>

<img src="/images/docs/demo-open-refine/demo_OR_14.png" alt="14" width="600"/>

<br></br>

Cette fois cela fonctionne mieux, on peut ensuite récupérer les coordonnées géographiques des monuments, *add columns*, *add columns from reconcilied values*

<br></br>

<img src="/images/docs/demo-open-refine/demo_OR_15.png" alt="15" width="600"/>

# Guide complémentaire

%%Docs:ameliorer-qualite-documentation%%
