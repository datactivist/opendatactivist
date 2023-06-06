---
title: Comment nettoyer des données
image: /images/docs/nettoyer-donnees/nettoyer-donnees.jpeg
description: C'est quoi une donnée propre ou une donnée sale ? Comment comprendre les données pour les nettoyer ?
type: Formation
tags:
  - qualité
  - nettoyer
  - technique
index: 1
date: 2020-09-26
authors:
  - sylvain-lapoix
--- 

# Présentation

> Cette formation, réalisée par Sylvain Lapoix, est la 3ème partie du programme appelé "Fake news à l’épreuve des faits".

</br>

# Résumé du contenu

</br>

## Nettoyer les données

### Une donnée "sale"

> Que ce soit pour des raisons techniques ou organisationnelles, il arrive que les données fournies en format tabulaire ou scrapées soient jugées "sales". Une donnée est jugée sale quand son format gêne son utilisation, que ce soit par un humain ou par une machine.

**Plusieurs dimensions d'une base de données peuvent contribuer à sa saleté :**

* une source manquante, défectueuse, imprécise ;
* des têtières incompréhensibles, redondantes, incomplètes ;
* des données imbriquées, mal formatées, lacunaires, excédentaires ;
* des colonnes mal agencées, des lignes incohérentes, une mauvaise architecture...

La présentation inclut également des exemples de données propres et sales, ainsi que des méthodes pour évaluer et améliorer la qualité des données.

### Une "donnée propre" ?

> Une "donnée propre" est une donnée qui répond à quelques critères qui assure sa lisibilité et son usage sans déperdition de sens. Pour en rester aux critères principaux :

* une donnée est propre quand elle est reconnue par la machine pour ce qu'elle est ;
* une donnée est propre quand elle est lisible par l'utilisateur·rice ;
* une donnée est propre quand elle permet de faire les calculs nécessaires.

</br>

Autrement dit : **une donnée propre est souvent une donnée transformée par rapport à sa source suivant des besoins précis**.

</br>

## Pourquoi nettoyer ses données ?

Le "travail de balayeur" que s'avère être le nettoyage n'est pas une petite tâche : [d'après des entretiens menés par le New York Times en 2014](https://www.nytimes.com/2014/08/18/technology/for-big-data-scientists-hurdle-to-insights-is-janitor-work.html), il engouffre 50 à 80% du temps de travail des data scientists.

</br>

En tant que datajournaliste, le nettoyage constitue une étape essentielle de fiabilisation des données utilisées. Autrement dit : nettoyer ses données est une étape clef du travail de vérification dans la démarche datajournalistique.

</br>

## Une méthodologie de nettoyage

1. Est-ce que la source est accessible ? est-ce que la base de données originales est accessible ?
2. Est-ce que je comprends la têtière ? est-ce que je comprends la nature des données que contient ma base ?
3. Est-ce que les donneés sont lues correctement ?
4. Est-ce que je peux faire les calculs dont j'ai besoin ?

Il n'existe pas de méthode miracle ou universelle : de même que toutes les bases de données ont leurs propres lacunes, chaque besoin nécessitera une mise en forme différente.

</br>

Pour paraphraser Hadley Whickam paraphrasant Léon Tolstoï :

> Toutes les bases de données propres se ressemblent, mais chaque base de données sale l'est à sa manière.

### 1. Conserver la source

### 2. Comprendre les données et leur vocabulaire descriptif

<img src="/images/docs/nettoyer-donnees/tidydata.png" alt="variables, observations, valeurs" width="800"/>

<br></br>

- la**base de donnéees** est la structure qui accueille les données ;
- les **variables** sont les caractéristiques renseignées (généralement disposées en colonne) ;
- les **observations** sont les individus sur lesquels des données sont collectées (généralement disposées en lignes) ;
- les **valeurs** sont les valeurs existants pour chaque variable dans une même base de données.
- la **donnée (ou point de données)** est la valeur prise par une variable pour une observation dans une base de données.

</br>

### 3. Nettoyer les données

- trouver / remplacer
- supprimer des colonnes
- scinder une colonne suivant un délimitateur
- tester une chaîne de caractère avec un modèle

<br/>

## [Accéder à la présentation](https://datactivist.coop/dwa_ddj_maroc/3-nettoyage/#1)

<br></br>

<div class="responsiveIframe">
  <iframe
    width="100%"
    height="500"
    src="https://datactivist.coop/dwa_ddj_maroc/3-nettoyage/#">
  </iframe>
</div>

# Guide complémentaire

%%Docs:demo-open-refine%%
