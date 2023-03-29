---
title: Formation Dataviz - communiquer par les chiffres
image: /images/formation-dataviz/dataviz-formation-cover.png
description: Comment réussir ou rater une data visualisation ?
slug: "formation-dataviz"
type: formation
tags:
  - dataviz
  - formation
datasets:
  - 5c9df4b68b4c415e1d76aac6
discourse_id: 
  - panorama-des-formats-de-data-visualisation
index: 1 #1 = affiché dans les recherches ; #0 = masqué
next-method: "r-ou-python | R ou Python, quel langage choisir pour la Data Science ?" #Insérer le nom du fichier exact, puis le titre que vous souhaitez afficher
---

--- 

## 👉 Accéder au support de formation

[![acces-slides](/images/formation-dataviz/formation-dataviz.png)](https://datactivist.coop/futurocite_ouvrir-ma-ville/dataviz)

# Comment notre cerveau se représente une donnée ?

La visualisation de la donnée consiste en un **encodage**, c'est-à-dire une "conversion" d'un format à un autre.

En l'occurence, le passage d'une forme brute non interprétée (les _data_), à une forme raffinée interprétée (la _dataviz_).

Que ce soit dans un usage informationnel ou communication, la mise en forme implique aussi un _message_ dont l'image doit être le vecteur.

Nous avons donc trois éléments constitutifs de la démarche :

1. des données ;
2. une mise en forme ;
3. un message

# Trois qualités d'une dataviz

## Premier objectif : la rigueur

#### Offrir à comprendre la valeur

La dataviz étant un encodage, elle doit pouvoir se passer des données qu'elle représente pour leur substituer des équivalences visuelles.

L'encodage doit permettre :

1. de comprendre **la nature** des données ;
2. d'apprécier **le rapport** qu'elles entretiennent entre elles ;
3. de saisir les points saillants et **phénomènes** clefs ;
4. le tout sans déperdition de sens.

Chacun de ces aspects repose sur des caractéristiques visuelles liées à des représentations.

#### Un type de graph = une approche

Les types de graphique ne sont pas interchangeables : par leurs modalités d'encodage, ils nécessitent des données d'un certain type et en certaine quantité et induisent visuellement un nombre limité de lecture possibles.

Le choix de l'un ou de l'autre devra être dicté par le mécanisme que l'on souhaite étudier dans un jeu de données :

- Comparaison
- Corrélation
- Distribution
- Evolution
- Données géographiques
- Visualisation de concept
- Une partie d'un ensemble

Source : [le Data Viz Project](https://datavizproject.com).

#### Expliciter la nature de la donnée

L'encodage doit permettre de saisir immédiatement le sens de chaque élément : où sont les points de données ? Que représentent-ils individuellement.

La dataviz explicite ici le phénomène lui-même. Il s'agit du point de départ de la démarche journalistique. Les causes, elles, sont explorées et détaillées dans le texte.
Comme pour une illustration classique, la complémentarité texte-image joue ici en s'adaptant à la complexité des phénomènes décrits.

#### Présenter les interactions

L'accumulation de données doit se faire de manière à décrire les rapports qu'elles entretiennent entre elles : rupture, continuité, proportionnalité, etc. Le choix du visuel induit de manière implicite ces rapports (ou bien peut induire en erreur).

Le [data visualisation catalogue](https://datavizcatalogue.com/) propose de chercher par type ou par fonction.

#### Décrire un phénomène

Un mauvais choix graphique peut fausser la représentation de la donnée en ne donnant pas à constater le phénomène qu'elles permettent de décrire.

#### La granularité

Le niveau de précision minimale d'une donnée (aussi appelé **granularité** peut modifier de façon radicale la lecture d'une phénomènne.
Dans le cas d'une carte, le choix de l'échelle peut mener à la généralisation de phénomène extrêmement circonscrits (ou inversement).
[Comme le montre cet excellent exemple sur le blog de Datawrapper](https://blog.datawrapper.de/weekly-chart-europegrowth/)

#### Cluster et agrégats

Les niveaux de granularité peuvent se superposer pour offrir une profondeur d'analyse **à explorer**.

Pour ce faire, une carte interactive peut proposer des niveaux agrégés : selon le zoom, le niveau de granularité change et l'information avec elle, comme ici avec la carte de [la qualité de l'air aux abords des écoles en Île-de-France de l'association Respire (2019)](https://respire-asso.org/pollution-de-lair-dans-les-ecoles/).

#### Où est mon zéro ?

Le choix de l'échelle est aussi celui de son étendue. Il peut être tentant pour amplifier un phénomène d'en augmenter l'amplitude artificiellement en réduisant l'échelle.
L'exemple le plus courant est le "data-does-not-start-at-zero". Si ce choix peut se justifier, il est bien souvent utilisé comme méthode de manipulation.

## Deuxième objectif : la lisibilité

#### 1er risque : "l'overplotting"

En statistique, le terme "overplotting" se réfère à l'effet produit par l'intégration d'un trop grand nombre de points de données dans un graph le rendant illisible.

Exemple : une heat-map qui ne sert à rien ([source](https://twitter.com/i/web/status/1009836270376366081))

#### 2è risque : "l'overcomplicated"

L'autre risque courant est de multiplier les dimensions et axes de lecture jusqu'à rendre le graphique incompréhensible.

#### 3è risque : l'excès d'esthétisme

La tentation de mêler précision et esthétique peut produire de très beaux graphs... trop compliqués pour être compris du premier coup.

Ex. : [un super papier, un très beau visuel mais un concept tordu](https://pegasusdata.com/2012/11/25/opendata-copinage-au-gouvernement-quand-lanalyse-de-reseau-vient-en-aide-au-journalisme-dinvestigation/)

#### Laissez parler les données

Les fioritures peuvent constituer des distractions : quand les données sont claires, autant leur laisser le champs libre.

#### Choisir ses référentiels

Plutôt que l'abstraction, il peut être utile de s'approprier des motifs figuratifs et d'y encoder les données.

Ex. : comment évoquer les compensations pour accidents du travail ? [ProPublica a choisi l'anamorphose](https://projects.propublica.org/graphics/workers-compensation-benefits-by-limb#)

#### Suivre une dynamique

Ce qui rend un graphique lisible, c'est aussi la possibilité de s'y repérer "naturellement". Par exemple, en adoptant un référentiel spatial cohérent.

Ex. : [un cadran pour un phénomène décrit dans le temps](https://www.wsj.com/articles/SB10000872396390444914904577617333130724846)

#### Mettre en évidence

Un simple "avant / après" peut véhiculer un puissant constat par l'ajout de quelques indices graphiques.

Dans cet exemple, trois éléments suffisent à pointer, à la fois dans l'absolu et en proportion, l'efficacité du dépistage du cancer :

1. les 17 "nouveaux cas" de surdiagnostique ;
2. une nouvelle catégorie (à part et de couleur différente) pour les femmes sauvées "grâce" au dépistage ;
3. un encadré synthétique.

[Cancer Research UK](https://scienceblog.cancerresearchuk.org/2018/03/06/overdiagnosis-when-finding-cancer-can-do-more-harm-than-good/)

#### Offrir une grille de lecture claire

La mise en image des données peut aussi consister à structurer l'information dans un tableau.

Mais, là aussi, des clefs de lecture peuvent tout changer : donner à percevoir une grille de lecture claire, c'est permettre de comparer les étapes et composantes d'un phénomène. En offrant [une lecture graphique et dynamique de son rapport financier](http://rapportfinancier.issy.com/2019/), la ville d'Issy-les-Moulineaux (Île-de-France) offre aux administré·es un outil de compréhension des mécanismes financiers de la municipalité et des services qu'elle propose.

### Sans message, l'image devient vaine

Il peut arriver que la dataviz n'ait d'intention que décorative ou spectaculaire. Précise et lisible, elle devient un panneau vide de sens et de propos qui n'explicite rien du monde faute de choisir comment parler de son sujet.

## Troisième objectif : l'éloquence

#### Les points de repère

La façon la plus simple de mettre en avant un message reste encore de l'expliciter : relever les infos clefs et guider dans la lecture.

--

Ex. : [Paris Match veille toujours à semer des focus ou à donner des clefs de lecture pour comprendre sa rubrique DataMatch](https://askmedia.fr/blog/ask-media-pour-paris-match-ya-t-il-trop-daeroports-en-france/)

#### La symbolique comme message

Le choix d'une représentation figurative allégorique plutôt que littérale peut constituer en soi l'angle d'une dataviz. Claire et bien choisie, la référence agit alors comme un sous-texte à l'image.

Ex. : en botanique, les cernes ou anneaux de croissance désignent les cercles concentriques de la section d'un tronc d'arbre. [Elles permettent de suivre l'évolution de l'arbre saison après saison](https://twitter.com/i/web/status/1010012782253826048)

#### Décaler pour resituer

Un matin en écoutant la radio, j'ai entendu pour la énième fois un cri d'alarme sur la fonte de l'Arctique. Avec mon collègue Nicolas Patte chez OWNI, nous nous sommes demandé pendant une journée comment "rafraîchir" ce propos alarmant qui n'alarme plus personne.

[Après moults essais](http://owni.fr/2012/09/28/bye-bye-banquise/index.html), nous avons réalisé qu'il nous fallait changer de perspective pour rendre le propos parlant.

#### Permettre l'exploration

Beaucoup d'informations visuelles précises et bien organisées peuvent aussi permettre l'exploration.

Ex. : [ce diagramme de Sankey](http://well-formed-data.net/archives/331/neuroscience-infoporn) sur l'invention des neurosciences réalisé par Moritz Stefaner pour Wired laisse découvrir l'émergence d'une nouvelle discipline

#### Subjectiver pour resituer

"[Qui sommes-nous ?](https://dataviz.rennesmetropole.fr/quisommesnous/)" propose aux internautes d'explorer les données du recensement sur le territoire de l'agglomération de Rennes. Sur la base de critères socio-démographiques, cette interface permet de _"se situer"_ dans la population et l'espace de cette collectivité :

#### D'autres sens parlent

Le message peut aussi passer par d'autres sens que la vue.
L'ouïe peut être mobilisé. Ou, comme ici pour The Guardian, le toucher : mis "en relief", la liste des réfugié·e·s mort·e·s en tentant de rejoindre l'Europe frappe l'esprit avec une force renouvelée.

#### Le data art dans la ville

L'artiste et graphiste Ellie Balk porte les données des habitant·es sur les murs mêmes de leurs quartiers.

Au printemps 2019, elle investit le mur de Buschwick, à New York, et propose à des lycén·nes du quartier d'y projete leurs canaux de communications et les émotions associées. Le projet [Moods and modes](http://elliebalk.com/#/moods-and-modes/) associe la double démarche sensible et quantitative au street art : le rapport à l'espace devient un rapport à l'autre où les couleurs tirées d'une gamme inspirée par l'architecture du quartier reflettent l'état d'esprit de celles et ceux qui y vivent.

#### Une de mes dataviz préférées

[Fewer helmets, more deaths](https://www.nytimes.com/interactive/2014/03/31/science/motorcycle-helmet-laws.html) (NYT, 31/03/2014)

### Des dataviz pour changer la société ?

Statisticienne et infirmière sur le front de Crimée, .red[**Florence Nightingale**] produit en 1858 un graphique résumant les causes de mortalité prouvant que les conditions sanitaires faisaient plus de dégâts que les cosaques de l'armée russe. En lire plus dans [The Guardian](https://www.theguardian.com/news/datablog/2010/aug/13/florence-nightingale-graphics).

👉 [Accéder au support de formation](https://datactivist.coop/futurocite_ouvrir-ma-ville/dataviz)

[![acces-slides](/images/formation-dataviz/formation-dataviz.png)](https://datactivist.coop/futurocite_ouvrir-ma-ville/dataviz)
