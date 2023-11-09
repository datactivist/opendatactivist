---
title: R ou Python - quel outil pour la Data Science ?
image: /images/docs/rpython-cover.jpeg
description: Comment choisir entre R et Python, deux langages de data science incontournables.
type: 📘 Guide
tags:
  - data science
  - R
  - python
  - R Studio
  - langage
  - librairies
index: 1 #0 pour ne pas afficher le contenu dans le catalogue, 1 pour qu'il s'affiche dans le catalogue
date: 2023-03-27
authors:
  - anthony-gigerich
partners:
  - dreal-grand-est
license: ccbysa
--- 

> La Data Science est devenue l’un des domaines les plus importants de l’informatique moderne. Deux langages majeurs ont émergé comme des incontournables : **R et Python.**

Une question se pose donc : *Python ou R ?*

Cette interrogation a traversé l’esprit de nombreuses personnes, allant de l’étudiant qui aspire à apprendre un nouveau langage au chef de projet qui réfléchit à la pile technologique nécessaire pour le futur projet de son équipe.

> Bien que les deux langages soient utilisés pour résoudre des problèmes similaires, ils présentent des différences significatives, que nous allons étudier au travers des tâches principales du data scientist. L’objectif est de vous fournir les éléments nécessaires pour faire un choix éclairé.

## Python : langage généraliste

### Un langage populaire

Selon le classement [PYPL](https://pypl.github.io/PYPL.html), et le [TIOBE Index](https://www.tiobe.com/tiobe-index/), Python est actuellement le langage de programmation le plus utilisé dans le monde, loin devant R. De nombreuses nouvelles librairies et fonctionnalités sont régulièrement proposées par la communauté, ce qui le rend extrêmement polyvalent et offre une large gamme de choix pour un même cas d’usage.

<br></br>

Cette forte communauté assure une documentation avancée des librairies les plus populaires, et d’autres développeurs ont bien souvent déjà rencontré et résolu les problèmes auxquels vous pourriez vous-même faire face.

<br></br>

### Un langage accessible

Python est considéré par beaucoup comme l’un des langages les plus simples à apprendre et à utiliser. De par sa syntaxe et son indentation, il se veut aussi très lisible. C’est le cas nativement, mais il existe de nombreuses librairies qui permettent de rendre le code plus concis, plus lisible ou plus robuste.

<br></br>

## R : langage des statisticiens et data scientists

### Un langage toujours à l’état de l’art

Lorsqu’on regarde les langages utilisés exclusivement par les data scientists, l’écart entre R et Python se resserre, comme l’indique ce [sondage du site KDnuggets](https://www.kdnuggets.com/2019/05/poll-top-data-science-machine-learning-platforms.html) en 2019 avec **46%** des répondants affirmant utiliser R, et **66%** affirmant utiliser Python. Bien que la tendance soit à Python aujourd’hui, R reste l’un des langages de référence dans le domaine de la data science, avec une communauté presque exclusivement composée de statisticiens et data scientists.

<br></br>

Cela permet une évolution rapide et contrôlée des fonctionnalités du langage dans ce domaine : les paradigmes au sein du tidyverse sont cohérents, cette philosophie partagée permet d’imbriquer intuitivement les différentes fonctions les unes dans les autres, offrant un processus fluide de la récupération des données à leur visualisation.

<br></br>

### Une grande maturité et profondeur de ses fonctionnalités

R offre également un très large catalogue de fonctions pour l’analyse de données, et ces dernières sont souvent ancrées dans le langage, ce qui assure une grande maturité et stabilité de leurs fonctionnalités.

<br></br>

C’est un langage développé par et pour des statisticiens et des data scientists. Souvent considéré à tort ou à raison comme plus difficile d’accès que Python, il offre des outils tels que le tidyverse qui simplifient la chaîne de traitement de vos données. Les tâches plus complexes nécessitent généralement moins de travail et de lignes de code en R qu’en Python grâce à son large catalogue de fonctions dédiées à l’analyse de données.

<br></br>

## Les tâches du Data Scientist

Les tâches courantes du data scientist peuvent être réalisées avec succès aussi bien en Python qu’en R, en effet chaque langage dispose de librairies et packages spécialement conçus pour celles-ci :

<br></br>

![table1](/images/docs/rpython.png)

*Liste (non-exhaustive) des librairies utilisées*

<br></br>

### La collecte de données

Lorsqu’il s’agit de collecter des données depuis une API, ou extraire de l’information d’une page web statique, Python et R sont tout aussi bien outillés.

<br></br>

En revanche, pour des tâches plus complexes, comme extraire les données d’une page web dynamique, qui injecte des éléments via javascript : Python offre de meilleures solutions, notamment la librairie *selenium*. Des alternatives existent néanmoins en R avec par exemple *rselenium*, qui reprend une partie des fonctionnalités de la librairie Python, mais qui nécessite au final dans certains cas du bricolage avec *PhantomJS*.

### Le traitement et l’analyse de données

Ces deux langages sont à l’état de l’art du traitement et de l’analyse de données, ils sont tous les deux capables de répondre à vos besoins efficacement. La seule différence peut être celle de l’interface entre vous et vos données, qui peut vous paraître plus ou moins intuitive.

> Personnellement, je trouve les packages R, ts et zoo, plus intuitifs que les alternatives en Python *pandas, statsmodels et dateutil* pour la manipulation de séries temporelles. C’est au ressenti de tout un chacun.

### La visualisation de données

Encore une fois, les deux langages sont à l’état de l’art de la visualisation de données. Python a l’avantage d’offrir un bouquet varié de librairies (*matplotlib, plotly, seaborn*, …), qui peut vous assurer de trouver chaussure à votre pied.

<br></br>

En R, *ggplot2* offre une interface puissante, qui permet la création de graphes complexes rapidement et efficacement lorsqu’elle est maîtrisée. Il existe d’ailleurs la librairie *plotnine* en Python, qui se base sur la grammaire de *ggplot2*, très appréciée dans le domaine.

<br></br>

### Le développement d’applications web

Le développement d’une application web, tel qu’un outil de visualisation, peut être une étape importante de votre projet.

<br></br>

*RShiny* est le principal package utilisé pour générer une application web en R, il permet de générer un tableau de bord interactif et des outils de visualisation de données.

<br></br>

En python, il y a plusieurs options : allant des frameworks de sites web plus classiques comme *Django* ou *Flask*, aux frameworks spécialisés pour la visualisation de données interactives comme Dash et Streamlit.

<br></br>

RShiny est souvent considéré comme plus complexe à prendre en main que ses équivalents Python *Dash* et *Streamlit*. Ce choix peut néanmoins directement découler de votre langage de visualisation de données de prédilection.

<br></br>

### Le Machine Learning

Bien que R possède sont lot de packages conçus pour mettre en place des modèles prédictifs, tels que *caret* et *MLR*, Python offre une variété de librairies à l’état de l’art, et surpasse largement les possibilités que peut offrir R.

<br></br>

Allant de scikit-learn, pour des modèles plus “traditionnels” de régressions ou de clustering, jusqu’à *Pytorch* ou *Tensorflow*, pour concevoir des modèles d’apprentissage profond, en passant par HuggingFace, une compilation de modèle de traitement automatique du langage open-source comme GPT-2 ou BERT, Python est **le** langage à apprendre si l’on souhaite faire de l’intelligence artificielle.

<br></br>

## L’intégration à votre pile technologique

En tant que langage généraliste, Python est souvent mieux équipé et documenté pour s’intégrer à des composants externes, cependant il est tout à fait possible d’utiliser R.

<br></br>

Quelques exemples :

<br></br>

### Base de données

Pour appeler des bases de données classiques, type SQL (MySQL, PostreSQL, SQLite, …) ou même des bases NoSQL comme MongoDB, R et Python sont tous deux très bien outillés. Cependant lorsque l’on parle de quantité de données massives, Python s’intègre mieux aux frameworks Big Data comme Apache Hadoop ou Spark grâce, entre autres, à *PySpark*.

<br></br>

Cela dit, il reste tout à fait possible d’utiliser R avec ces frameworks, via les packages *rhipe* ou *SparkR*, mais l’intégration n’est pas forcément aussi robuste qu’avec Python, souvent privilégié et donc mieux maintenu.

<br></br>

### Plateforme Cloud

Python et R sont tous deux pris en charge par les principaux fournisseurs de cloud computing tels qu’AWS, Azure, ou des français comme OVH ou Scaleway, et vos outils pourront être déployés sur leurs serveurs via des conteneurs Docker.

<br></br>

En revanche, lorsqu’il s’agit d’interagir avec des données et services hébergés sur le Cloud, Python peut être mieux équipé que R, car il est privilégié par les fournisseurs, il existe par exemple la librairie Python officielle Boto3 chez AWS. Encore une fois, il est tout de même possible d’utiliser R grâce à des packages tels que *cloudyr* ou *paws-r*.

<br></br>

### Et pourquoi pas les deux ?

Il n’est pas nécessaire de choisir un seul langage, une équipe peut très bien utiliser les deux langages et tirer parti de leurs points forts respectifs.

<br></br>

De plus en plus de logiciels et de librairies permettent cette approche :

<br></br>

- **[Quarto](https://quarto.org/)**, le successeur de RMarkdown qui supporte maintenant entre autres Python et R, et qui est découplé de RStudio : il est possible de l’utiliser depuis Jupyter ou VS Code en plus de RStudio.
- **RStudio** justement, en Juillet 2022, l’entreprise qui développe ce logiciel a changé son nom en [Posit](https://posit.co/) pour signifier son ouverture à de nouveaux langages en plus de R, notamment Python.
- **Jupyter** est une suite logique de iPython : une interface interactive pour Python, qui a évolué vers Jupyter Notebook lorsque la possibilité de choisir entre différents noyaux (**JU**lia, **PYT**hon, **R**) a été ajoutée.
- **Des librairies comme [Spacy](https://spacy.io/)**, une librairie de traitement automatique du langage, majoritairement utilisée en Python, assure un développement simultané dans les deux langages via le wrapper [R Spacyr](https://spacyr.quanteda.io/).

<br></br>

Cela peut donc par exemple permettre à une équipe composée d’experts dans les deux langages, d’utiliser R pour explorer les données et Python pour les collecter et construire un outil de visualisation, tout en utilisant les mêmes outils et environnements de développement intégré au sein de l’équipe.

<br></br>

## Mais alors, comment choisir ?

Essayons de récapituler tout ce qui a été dit…

<br></br>

![table2](/images/docs/rpython-table2.png)

<br></br>

Python est polyvalent, ce qui en fait un langage de choix pour tous les développements où R n’excelle pas : back-end, API, apprentissage automatique, ou production d’applications web, car il s’intègre souvent mieux au reste de la pile technologique qui peut être nécessaire pour ce type de cas d’usage.

<br></br>

R, quant à lui, est un langage de choix pour l’analyse et la visualisation de données, notamment pour les chercheurs et les équipes R&D, qui souhaitent explorer rapidement et efficacement leurs données ou de nouveaux modèles statistiques.

<br></br>

Vous l’aurez compris, au final, lorsqu’il s’agit de manipuler des données, une production quasi-équivalente peut être développée dans les deux langages. Il y a cependant d’autres facteurs qui entrent en compte au-delà des fonctionnalités intrinsèques des langages. Tels que les compétences actuelles de l’équipe, ou de celles du marché du travail pour d’éventuels futurs recrutements.

<br></br>

Enfin, il n’est pas obligatoire de choisir entre les deux langages, et maîtriser les deux peut être un atout majeur pour la carrière d’un data scientist.
Le choix de votre langage de programmation pour tous vos projets futurs ne doit au final pas être dicté par une décision unique. Au contraire, cette question doit se poser à chaque nouveau projet en fonction de ses spécificités et de son contexte.

<br></br>

---

<br></br>

*Ce document s’inscrit dans l’accompagnement à la mise en œuvre du Datahub porté par la DREAL Grand Est. L’un des questionnements porte sur la rationalisation des outils et des langages utilisés. La publication de ce travail se fait avec le soutien de la DREAL Grand Est.*
