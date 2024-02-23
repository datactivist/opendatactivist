<a href="https://datactivist.coop/webinaires_intefp/1/index.html#1" class="customButton">👉 Accéder à la présentation</a> 

## De la statistique à la *data science*

> *Les données sont généralement comprises comme étant la matière première produite dans l'abstraction du monde en catégories, mesures et autres formes de représentation - nombres, caractères, symboles, images, sons, ondes électromagnétiques, bits - qui constituent les fondations sur lesquelles l'information et le savoir sont créés.*

<br/>

%%Docs:culture-generale-donnees%%

- la statistique est une relativement vieille science (développement au 18e siècle), pour aider les États (*Statistik*) à compter (les contribuables, les soldats potentiels...) mais aussi des entreprises privées (au départ, les assureurs => actuariat)
- la statistique repose sur une branche des mathématiques, les probabilités, qui émerge au milieu du 17e siècle, avec Pascal et Fermat notamment.
- c'est pourquoi la statistique est une discipline pratiquée par des mathématiciens, avec une importante formalisation mathématique.
- la pratique de la statistique recouvre une forte dimension théorique : on part de problèmes théoriques, et de données d'illustrations, plutôt que de données et de problèmes réels.

## **Changement de paradigme : le *machine learning***

- statistique classique : les problèmes doivent pouvoir être résolus de manière analytique, sans puissance de calcul particulière (d'où le succès du fréquentisme)
- le développement de la puissance de calcul permet de résoudre des problèmes statistiques par la simulation ([MCMC](https://fr.wikipedia.org/wiki/M%C3%A9thode_de_Monte-Carlo_par_cha%C3%AEnes_de_Markov)) : on n'a pas besoin de connaître la solution mathématique, il "suffit" de faire de nombreuses simulations aléatoires.
- Fondamentalement, modélisation et machine learning ne sont pas différents, du point de vue d'un statisticien : modéliser un Y en fonction d'un vecteur de Xi
- Une des différences principales toutefois : veut-on *prévoir* ou *comprendre/analyser* ?
- Et donc : peut-on, veut-on interpréter les coefficients ?

En pratique : le machine learning porte sur des données plus complexes que la modélisation traditionnelle, avec souvent beaucoup de valeurs manquantes.

<br/>

%%Docs:culture-generale-donnees-section-9,r-ou-python%%

## **Algorithmes, IA, code source**

- Un **algorithme** "est la description d'une suite d'étapes permettant d'obtenir un résultat à partir d'éléments fournis en entrée" ([CNIL](https://www.cnil.fr/fr/definition/algorithme)).
- Cet algorithme est considéré comme un **algorithme public** (au sens de la loi pour République numérique) lorsqu'il est utilisé dans le cadre d'une mission de service public, en particuluer pour prendre une décision administrative individuelle.
- Un algorithme peut aller de modèles procéduraux très simples à des modèles d'IA très complexes -- avec un rapport variable entre importance des règles (calcul de l'impôt) et importance des données d'entraînement (détection de la fraude fiscale) (modèles procéduraux vs modèles auto-apprenants).
- Le **code source** désigne la manière dont un algorithme est traduit dans une suite concrète d'instructions informatiques, dans un langage informatique donné.

S'agissant de modèles auto-apprenants/de *machine learning* supervisé, **l'ouverture du code source ne suffit pas à sa transparence** : il est très dépendant des données d'entraînement en amont, et se caractérise par ses *poids* (le modèle entraîné) en aval.

<br/>

%%Docs:chatgpt-blade-runner%%