---
title: La boite à outils de Datactivist
image: /images/docs/boite-outils-datactivist.jpg
description: Les outils utilisés par les Datactivistes au quotidien, et leurs recommandations
type: Liste de ressources
tags:
  - outils
  - logiciels
  - méthode
  - test
index: 1 #0 pour ne pas afficher le contenu dans le catalogue, 1 pour qu'il s'affiche dans le catalogue
date: 2023-10-10
authors: #ajouter l'identifiant d'un ou plusieurs auteurs, ou bien si besoin / préférence, "equipe-datactivist"
  - equipe-datactivist
--- 

---
### [Programmation et data science](#r-studio)

[R Studio](#r-studio)

### [Manipulation de données et tableurs](#airtable)

[Airtable](#airtable)

[Grist](#grist)

[Open Refine](#open-refine)

[Open Data Editor](#open-data-editor)

---

# R Studio

## 💡 Pour quoi et pour qui ?

R Studio permet de réaliser des opérations complexes avec des données grâce au langage R : **nettoyage, visualisation (graphiques, cartes), calculs et innombrables fonctions.**

</br>

Il s'adresse aux personnes qui souhaitent manipuler des fichiers volumineux et qui ont déjà des notions en programmation.

</br>

## 💬 Le conseil de Datactivist

> R Studio est un excellent choix pour un usage en data science ou data analyse qui requiert des traitements de **jeux de données volumineux**. **Sa prise en main nécessite plusieurs jours**, mais permet de gagner du temps lorsqu'on a besoin d'effectuer une analyse ou un nettoyage de données.

## 🗂 Caractéristiques

| Critère                               |  Appréciation                               |
|---------------------------------------|---------------------------------------------|
| **🔓 Open source**                    | ✅ Oui, 100 %                                |
| **🎳 Facilité d'utilisation**         | 🟠 Niveau expert, apprentissage nécessaire   |
| **💰 Coût**                           | 🆓 Entièrement gratuit                       |
| **💰 Flexibilité et fonctionnalités** | 🟢 Totale et nombreuses fonctionnalités      |
| **🔀 Alternatives**                   | 🐍 Jupyter Notebook, pour Python             |

## 👉 Accéder à l'outil

%%Links:r-studio%%

## 📖 Ressources complémentaires

%%Docs:r-ou-python%%

# Airtable

## 💡 Pour quoi et pour qui ?

Airtable permet d'éditer des tableurs et de **connecter des objets entre eux**, de manière intuitive et collaborative (pour réaliser des tableaux de suivis, des inventaires, des bases de données clients, etc...) C'est un outil qui fait partie des incontournable des **solutions "no code"**, s'adressant à des profils variés.

</br>

## 💬 Le conseil de Datactivist

> Airtable est idéal pour s'initier aux bases de données relationnelles, car simple à prendre en main et efficace. Cepenandant, de nombreuses fonctionnalités ne sont accessibles qu'avec un abonnement (qui peut se révéler **couteux**), et **les données ne sont pas hébergées en Europe**, ce qui limite fortement l'usage dans la sphère administrative par exemple.

## 🗂 Caractéristiques

| Critère                               |  Appréciation                               |
|---------------------------------------|---------------------------------------------|
| **🔓 Open source**                    | ❌ Non, SaaS avec abonnement                 |
| **🎳 Facilité d'utilisation**         | 🟢 Conçu pour des profils variés             |
| **💰 Coût**                           | 🟠 Version gratuite limitée, puis abonnement rapidement onéreux pour plusieurs utilisateurs |
| **💰 Flexibilité et fonctionnalités** | 🟡 Nombreuses fonctionnalités, mais souvent payantes  |
| **🔀 Alternatives**                   | 🟢 ApiTable, [Grist](#grist) (dont une instance mise à disposition par l'ANCT)     |

## 👉 Accéder à l'outil

%%Links:airtable%%

# Grist

## 💡 Pour quoi et pour qui ?

À l'instar d'[Airtable](#airtable), Grist permet d'éditer et partager des tables de données que l'on peut lier entre-elles.

## 💬 Le conseil de Datactivist

> Bien qu'un peu moins intuitif et agréable d'utilisation qu'Airtable, Grist permet par exemple de visualiser un jeu de données sur une carte. De plus, une instance a été [**mise en ligne par l'ANCT**](https://grist.incubateur.anct.gouv.fr/), spécialiement pour les acteurs publics et leurs partenaires, ce qui présente un avantage notable au regard de la protection des données.

## 🗂 Caractéristiques

| Critère                               |  Appréciation                                                                |
|---------------------------------------|------------------------------------------------------------------------------|
| **🔓 Open source**                    | ✅ Oui                                                                        |
| **🎳 Facilité d'utilisation**         | 🟢 Conçu pour des profils variés                                              |
| **💰 Coût**                           | 🟢 Gratuit via la DINUM pour les acteurs publics                                |
| **💰 Flexibilité et fonctionnalités** | 🟡 Fonctionnalités essentielles, mais possibilité de développer une instance  |
| **🔀 Alternatives**                   | 🟢 [Airtable](#airtable), ApiTable                                            |

## 👉 Accéder à l'outil

%%Links:grist%%

# OpenRefine

## 💡 Pour quoi et pour qui ?

OpenRefine est un outil gratuit et open source pour travailler avec des données à nettoyer ou à transformer d'un format vers un autre.

</br>

## 💬 Le conseil de Datactivist

> Open Refine est très utile pour traiter et nettoyer des jeux de données, par exemple avant une publication. Il permet aussi d'utiliser et importer des données Wikidata.

## 🗂 Caractéristiques

| Critère                               |  Appréciation                                         |
|---------------------------------------|-------------------------------------------------------|
| **🔓 Open source**                    | ✅ Oui, 100 %                                          |
| **🎳 Facilité d'utilisation**         | 🟠 Niveau intermédiaire, petit apprentissage à prévoir |
| **💰 Coût**                           | 🆓 Entièrement gratuit                                 |
| **💰 Flexibilité et fonctionnalités** | 🟡 L'essentiel y est, mais peu paramétrable            |
| **🔀 Alternatives**                   | 🟢 [Open data editor](#open-data-editor), en open source également          |

## 👉 Accéder à l'outil

%%Links:openrefine%%

## 📖 Ressources complémentaires

%%Docs:demo-open-refine%%

# Open Data Editor

## 💡 Pour quoi et pour qui ?

Open Data Editor a été déployé par l'Open Knowledge Foundation. L'outil permet de préparer des jeux de données et réaliser des traitements, le tout en ligne et gratuitement.

</br>

## 💬 Le conseil de Datactivist

> Open Data Editor est très utile pour les étapes avant la publication d'un jeu de données. Il permet aussi d'éditer des métadonnées et des schémas de données.

## 🗂 Caractéristiques

| Critère                               |  Appréciation                                                     |
|---------------------------------------|-------------------------------------------------------------------|
| **🔓 Open source**                    | ✅ Oui, 100 %                                                      |
| **🎳 Facilité d'utilisation**         | 🟡 Prise en main assez rapide                                      |
| **💰 Coût**                           | 🆓 Entièrement gratuit                                             |
| **💰 Flexibilité et fonctionnalités** | 🟡 Nombreuses fonctionnalités, dont une intégration IA (en beta)   |
| **🔀 Alternatives**                   | 🟢 [Open refine](#openrefine), en open source également                           |

## 👉 Accéder à l'outil

%%Links:opendataeditor%%