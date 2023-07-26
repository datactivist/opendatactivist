---
title: Un agent conversationnel pour améliorer la découvrabilité des données ouvertes
image: /images/products/screen-conciergerie.png
description: Comment permettre aux utilisateurs de portails open data de trouver plus facilement des jeux de données ?
type: Bibliographie
tags:
  - IA
  - découvrabilité
  - portail
index: 1
date: 2021-11-11
authors:
  - mathieu-morey
  - anthony-gigerich
--- 

# La découvrabilité des jeux de données : condition de la réutilisation

Le mouvement de l’ouverture de leurs données par des acteurs publics et privés se traduit par la publication sur des portails web d’un grand nombre jeux de données de taille, de nature et de domaines très divers.

</br>

L’accès aux jeux de données et leur utilisation sont cependant entravés par différents
obstacles socio-techniques *(Beno et al., 2017)*. En premier lieu, la capacité d’un utilisateur à trouver les jeux de données qu’il cherche est déterminée en partie par la capacité d’un jeu de données à être trouvé ou découvert, **c’est-à-dire sa découvrabilité** *(Dasgupta et al., 2007)*.

</br>

Les méthodes d’indexation et de recherche développées pour les contenus web (texte, image, vidéo) et mises en œuvre dans les moteurs de recherche **n’étant pas adaptées aux jeux de données ouvertes**, structurées (relationnelles, géospatiales) ou non structurées *(Neumaier et al., 2016)*, les fonctions de recherche proposées par les portails de données ouvertes se limitent essentiellement à un calcul de similarité textuelle entre la requête de l’utilisateur et les métadonnées renseignées par les producteurs lors du dépôt : titre, description, mots-clés, auteur...

> Or, les producteurs décrivent leurs données dans leur contexte de collecte et d’exploitation, avec leur terminologie, alors que les utilisateurs de portails formulent leur besoin de données dans le contexte de leurs propres cas d’usages et avec leur propre terminologie. 

La recherche sur les portails de données ouvertes **souffre donc d’un très fort phénomène de vocabulary mismatch**, d’autant plus difficile à compenser que les métadonnées (y compris la
description) sont souvent très succinctes. 

# Un agent conversationnel dédié aux portails de données

Dans ce contexte, nous avons développé un agent conversationnel pour les portails de données ouvertes, **qui aide l’utilisateur à formuler sa requête** et recueille ses retours sur la pertinence des jeux de données qui lui sont proposés. Les mécanismes génériques de l’agent conversationnel sont fournis par [le framework open source Rasa 1](https://github.com/RasaHQ/rasa/).

</br>

L’expansion de requête repose sur des **ressources lexicales**, actuellement des plongements de mots word2vec (Mikolov et al., 2013) appris sur le corpus frWaC *(Baroni et al., 2009; Fauconnier, 2015)*, qui permettaient une amélioration du rappel supérieure à fastText *(Bojanowski et al., 2016)* et WordNet (WOLF) *(Sagot & Fišer, 2008)* dans nos essais préliminaires.

</br>

L’intégration des ressources distributionnelles word2vec et fastText dans un système interactif (nécessitant une latence faible) est permis par la bibliothèque Magnitude *(Patel et al., 2018b,a)*.

</br>

<div style="text-align: center;">
    <img src="/images/docs/schema-conciergerie.png" alt="schema de la conciergerie" width="500" />
</div>


> Nous travaillons à améliorer le reclassement des résultats, l’exploitation des retours de pertinence et l’intégration de terminologies en complément des ressources lexicales génériques.

Notre agent conversationnel est actuellement [déployé sur le portail de données ouvertes Datasud](https://www.datasud.fr), dans le cadre d’une expérimentation avec la Région Sud.

%%Products:conciergerie%%

</br>

---

# Références

**📖 BARONI M., BERNARDINI S., FERRARESI A. & ZANCHETTA E. (2009).** The wacky wide web : A collection of very large linguistically processed web-crawled corpora. Language resources and evaluation, 43(3), 209–226.

</br>

**📖 BENO M., FIGL K., UMBRICH J. & POLLERES A. (2017).** Perception of key barriers in using and publishing open data. JeDEM-eJournal of eDemocracy and Open Government, 9(2), 134–165.

</br>

**📖 BOJANOWSKI P., GRAVE E., JOULIN A. & MIKOLOV T. (2016).** Enriching word vectors with subword information. arXiv preprint arXiv :1607.04606.

</br>

**📖 DASGUPTA A., GHOSH A., KUMAR R., OLSTON C., PANDEY S. & TOMKINS A. (2007).** The discoverability of the web. In Proceedings of the 16th international conference on World Wide Web, p. 421–430 : ACM.

</br>

**📖 FAUCONNIER J.-P. (2015).** French word embeddings.

</br>

**📖 MIKOLOV T., SUTSKEVER I., CHEN K., CORRADO G. S. & DEAN J. (2013).** Distributed representations of words and phrases and their compositionality. In Advances in neural information processing systems, p. 3111–3119.

</br>

**📖 NEUMAIER S., UMBRICH J. & POLLERES A. (2016).** Automated quality assessment of metadata across open data portals. Journal of Data and Information Quality (JDIQ), 8(1), 2.

</br>

**📖 PATEL A., ALEX, ADMIN P. & JONNY (2018a).** plasticityai/magnitude : Release 0.1.120. DOI : 10.5281/zenodo.1607574.

</br>

**📖 PATEL A., SANDS A., CALLISON-BURCH C. & APIDIANAKI M. (2018b).** Magnitude : A fast, efficient universal vector embedding utility package. In Proceedings of the 2018 Conference on Empirical Methods in Natural Language Processing : System Demonstrations, p. 120–126.

</br>

**📖 SAGOT B. & FIŠER D. (2008).** Building a free french wordnet from multilingual resources. In OntoLex.
