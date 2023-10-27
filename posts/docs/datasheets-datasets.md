---
title:  Écrire les métadonnées - La méthode "Datasheets for datasets"
image: /images/docs/datasheets-datasets.webp
description: Une liste de questions pour compléter pas à pas des métadonnées.
type: Guide
tags:
  - documentation
  - méthode
  - métadonnées
  - qualité
index: 1
date: 2023-10-27
authors:
  - samuel-goeta
license: ccbysa
--- 

Lorsqu'on publie un jeu de données, il est important d'y associer ses métadonnées : les informations complètes sur les données, leur origine, leur périmètre, etc...

</br>

Datasheets for Datasets est [un modèle de documentation](https://arxiv.org/pdf/1803.09010.pdf) qui pose une série de questions pour **guider la rédaction des métadonnées.** En voici une traduction réalisée par Samuel Goëta et Laure Huguenin :

</br>

## Motivations pour la création du jeu de données

- Pourquoi le jeu de données a-t-il été initialement créé ?
- Quelles ont été les utilisations non prévues du jeu de données ?
- Pour quelles autres tâches le jeu de données pourrait-il être utilisé ?
- Quelles sont les utilisations trompeuses du jeu de données ?
- Qui a financé ou soutenu la création du jeu de données ?

## Composition du jeu de données

- Que contient le jeu de données principalement ? Les enregistrements représentent-ils principalement des documents, des personnes, des territoires, des entreprises… ?
- Dispose-t-on d’un schéma décrivant les variables du jeu de données ?
- Que contient chaque champ du jeu de données ?
- Est-ce que le contenu du jeu de données dépend de ressources externes (ex. identifiant SIRET ou lien vers le document…) ? De quelles garanties dispose-t-on concernant la pérennité de ces ressources ?

## Processus de collecte des données

- Comment les données ont été collectées (avec des capteurs, manuellement, par des outils informatiques…) ?
- Qui a assuré le processus de collecte de données (des agents, des bénévoles, des étudiants…) ?
- Quelle a été la période de collecte des données ?
- Les données ont-elles été collectées directement ou inférées à partir d’autres données ?
- Les données ont-elles été collectées sur un échantillon ? Quelle est la population complète ? Selon quelles méthodes ?
- Quelles sont les erreurs connues, les limites, les sources de bruit ou de redondances associées à ces données ?

## Pré-traitement des données

- Comment les données ont-elles nettoyées ou préparées ?
- Les données « brutes » ont-elles été conservées ? Sont-elles diffusées ?
- L’outil de pré-traitement des données est-il disponible ?

## Diffusion du jeu de données

- Les données sont-elles diffusées en ligne ? Selon quelles modalités (sur un portail open data, un site web, une API…) ?
- Si non, les données sont-elles diffusées au cas par cas ? à la demande ?
- Selon quelle licence les données sont-elles diffusées ?
- Des redevances ou des restrictions sont-elles appliquées dans l’accès aux données ?

## Maintenance du jeu de données

- Qui assure la maintenance du jeu de données ? Comment peut-on contacter cette personne ? Quel est le service responsable du jeu de données ?
- Est-ce que les rôles sont distincts entre la production des données, leur éditorialisation et leur diffusion ?
- Le jeu de données sera-t-il mis à jour ? Si oui, à quelle fréquence ?
- Si les données deviennent obsolètes, comment cette information sera-t-elle communiquée ?
- Est-il possible de contribuer à l’amélioration des données ? Selon quelles modalités ?

## Considérations légales et éthiques

- Si le jeu de données concerne des individus, ont-ils exprimé leur consentement de manière claire ?
- Les individus ont-ils été informés sur la finalité du traitement de données ?
- Le jeu de données peut-il exposer de manière directe ou indirecte des individus ?
- Ces données sont-elles conformes au RGPD ?
- Les données peut-elles avantager ou désavantager des groupes sociaux ?
- Le jeu de données contient-il des informations pouvant être considérées comme inappropriées ou offensantes ?

</br>

---

</br>

## On en discute sur TeamOpenData

%%Links:1400%%

</br>

## Contenus complémentaires

%%Docs:ameliorer-qualite-documentation%%