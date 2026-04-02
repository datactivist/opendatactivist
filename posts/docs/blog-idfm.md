


<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")


**Hackathon Mobilités d’Île-de-France Mobilités : retour sur l’édition 2025**

*Les 13 et 14 novembre dernier, Île-de-France Mobilités organisait son troisième Hackathon Mobilités. Cet événement récurrent explore comment les données et le numérique peuvent impacter positivement les usagers et tous les acteurs en lien avec les mobilités, que ce soit dans la déclinaison des politiques de mobilités, ou au travers de l’aménagement des territoires. C’était aussi la deuxième fois que Datactivist accompagnait IDFM dans l’organisation de cet événement.*

*Pour ce projet, l’équipe de Datactivist a mis à profit sa méthodologie en matière d’organisation de sprint data et de Hackathon.  Cette méthodologie s’adapte à tout événement pendant lequel des personnes se rassemblent pour résoudre des problèmes, développer des outils, valoriser des données. Elle tire les enseignements de notre expérience dans le domaine ainsi que des bonnes pratiques du secteur.  \
Vous pouvez la consulter à l’adresse suivante : [https://datactivist.coop/datavizchallenge/guide/docs/principes.html](https://datactivist.coop/datavizchallenge/guide/docs/principes.html) *

* \
Cette méthodologie est éprouvée, et peut s’adapter à des événements courts tels que des hackathons, mais aussi à des processus plus asynchrones, en présentiel et à distance, tels que des concours (type #hackaviz, challenge data…).  Vous pouvez retrouver toutes nos ressources et nos articles concernant [la méthodologie des Hackathons sur Open Datactivist](https://open.datactivist.coop/docs?tag=hackathon).*

L’édition 2024 était centrée sur l’usage de l’IA et l’amélioration des services de mobilité. Vous pouvez retrouver un article détaillé sur le site d’IDFM *[“Hackathon IA et Mobilités 2024 : Retour sur deux jours riches en IA et en émulation”](https://prim.iledefrance-mobilites.fr/fr/actualites/article/hackathon-ia-et-mobilites-2024-retour)*. \
Le hackathon de novembre dernier était quant à lui axé sur les questions de mobilité responsable (responsabilité environnementale, accessibilité…). 

Grâce un travail de co-construction avec les équipes d’IDFM, nous avons identifié et proposé quatre défis sur cette thématique, avec des données et des ressources adaptées mises à disposition des participantes et participants :



* Défi 1 - Évaluer et outiller l’impact des mobilités actives et de l’intermodalité
* Défi 2 - Aider les entreprises à décarboner leurs mobilités
* Défi 3 - Créer des outils en faveur des mobilités durables pour les collectivités franciliennes 
* Défi 4 - Améliorer l’accessibilité et le confort dans les services de mobilités


### **Une préparation technique en amont**

La préparation d’un tel événement démarre plusieurs mois en amont. Les équipes d’Île-de-France mobilités (IDFM) ont préparé un ensemble de ressources pour faciliter la tâche des participant·es le jour J. 

Côté environnement de développement, IDFM a de nouveau eu recours à la mise en place d’une instance de la plateforme Onyxia de l'INSEE, qui offre des environnements de développement préconfigurés et stockait les nombreuses données mises à disposition.

Comme l’année précédente, nous avons préparé un[ guide des participant·es](https://github.com/hackathons-mobilites/hackathon_mobilites_2025) (url [https://github.com/hackathons-mobilites/hackathon_mobilites_2025](https://github.com/hackathons-mobilites/hackathon_mobilites_2025)) détaillant toutes les ressources, les processus et les attendus du hackathon. Il était accompagné de snippets de code fourni par l’équipe de IDFM sous forme de notebooks Jupyter pour faciliter la prise en main des API d'information voyageurs et des principales ressources mises à disposition. C’était par exemple le cas pour les accès à un serveur S3 et à un pool d'API d'accès à l'IA générative. Le guide des participant·es reste en ligne et conserve des ressources utiles pour faciliter la prise en main de l’écosystème DATA d’IDFM.

Enfin, une sélection de modèles d'IA a été fournie : Llama 4 Maverick pour la classification, GPT-4o-mini pour les tâches de résumé, Whisper pour le text-to-speech et le speech-to-text, et un modèle d'embedding pour les projets de rapprochement sémantique et de recherche vectorielle.


### **Les données, le nerf du hackathon**

Les données mises à disposition pour le hackathon portaient sur la décarbonation et l'accessibilité. IDFM a profité du hackathon pour explorer de nouvelles opportunités en lien avec les défis proposés. De nouvelles sources ont ainsi pu être explorées et préparées pour les participants, que ce soit par IDFM et par les partenaires producteur : les données du site MétroConnexion, les historiques de demandes de trajets Geovelo ou encore les données centrées sur Saint-Quentin-en-Yvelines dont des données résultantes du [projet “Marche à l’ombre”](https://www.saint-quentin-en-yvelines.fr/wp-content/uploads/2025/06/RAPPORT-DACTIVITE-2024.pdf) ( url [https://www.saint-quentin-en-yvelines.fr/wp-content/uploads/2025/06/RAPPORT-DACTIVITE-2024.pdf](https://www.saint-quentin-en-yvelines.fr/wp-content/uploads/2025/06/RAPPORT-DACTIVITE-2024.pdf)). 

Afin d’en maximiser l’exploitabilité, chaque jeu de données était par ailleurs accompagné d’une description détaillée décrivant sa structure, son mode de production ou de collecte, ainsi que plusieurs exemples d’usages possibles. 

Les données proposées ont été sources d’inspiration pour les participants, avec notamment des réutilisations des informations fournies par la SNCF pour les transports de vélos, tandis que celles de [Métro-Connexion](https://www.metro-connexion.org) ([https://www.metro-connexion.org/](https://www.metro-connexion.org/)) ont permis d’imaginer des solutions de scoring d’accessibilité des stations et gares.

La communauté d'agglomération de Saint-Quentin-en-Yvelines a quant à elle proposé des données issues du projet de marchabilité à l'ombre, et des données relatives aux éco-compteurs déployés sur leur territoire. Leur travail sur la marchabilité à l'ombre est remarquable, notamment sur la reconstitution du filaire piéton et la projection de l'ombre au sol depuis la canopée détectée par LIDAR et la photographie aérienne.


### **Intelligence artificielle et vibe coding**

Les projets du hackathon ont intégré les outils d'intelligence artificielle de manière pertinente, notamment pour le traitement de données, la valorisation de données et la génération de données. Les promesses de l'IA générative commencent à se concrétiser, notamment pour les mobilités.

Le hackathon 2025 est également l'occasion de sonder les pratiques de "*vibe coding*" (une méthode qui permet aux programmeurs et aux non-programmeurs d'utiliser des grands modèles de langage (LLM) pour générer rapidement des prototypes fonctionnels). Il s'agit du premier hackathon organisé par IDFM Mobilités où le "*vibe coding*" est communément adopté par les métiers techniques. 


        *"Au début, Copilot, je lui parlais gentiment, comme à une personne qui aurait fait partie de l’équipe, mais à la fin, il fallait vraiment accélérer et j'avoue que j'étais un peu moins cordial."  \
Participant anonyme du Hackathon Mobilités 2025 *


### **Un petit tour d’horizon des 9 projets proposés**

Le matin du jeudi 13 novembre 2025, neuf équipes se sont retrouvées pour ce challenge de 48 heures. Installées dans un espace dédié, au premier étage du Pan Piper, dans le 11ᵉ arrondissement parisien, elles se sont lancées dans l’exploration des jeux de données (avec grand renfort de café). Les équipes avaient été constituées en amont, la veille, lors d’un webinaire de lancement où l’équipe d’organisation a tâché d’aiguiller les participant·es vers des équipes, en fonction de leurs appétences pour les différents défis et de leurs compétences techniques. 

Quelques mois après, voici un petit tour d’horizon des projets et des lauréats. 


#### 🥇 Le premier prix : l’équipe Groove On avec le projet Relais2Go

*Porté par Alex Saint’Andre, Loïc Mauritius, Estibaliz Legarreta, Malory Pommier et Arthur Boivert*

L’équipe Groove On avait pour objectif de proposer des itinéraires personnalisés pour les personnes en situation de handicap, intégrant des scores d’accessibilité et des signalements communautaires d’obstacles en temps réel. \
 \
Actuellement, il y a peu d’informations fiables en temps réel sur l’accessibilité : sur les applications classiques, les GPS, ignorent les obstacles qui peuvent être gênants et il n’y a pas de possibilité de personnalisation pour les utilisateurs. De plus, l’accessibilité peut changer en fonction des heures de la journée.  

Pour remédier à cela, l’équipe propose **Relais2Go**, une application innovante pour les personnes en situation de handicap (PSH) qui met l’intelligence collective au service d’une mobilité plus accessible.    \




<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")


*Légende : présentation de l’application Relais2Go *

Relais2Go permet aux PSH de générer des itinéraires optimisés selon des niveaux d’accessibilités. Chaque utilisateur·ice définit son profil d'accessibilité et l’application crée ensuite des itinéraires sur mesure. De plus, un système de communauté permet à chacun de signaler, en temps réel, les obstacles ou difficultés rencontrés. 

L’application propose aussi la vérification continue de l’accessibilité avec un score pour chaque parcours et chaque correspondance, ainsi qu’un historique des incidents rencontrés par les utilisateur·ices. Des notifications et des alertes peuvent aussi être activées lors d’un changement d’accessibilité sur l’itinéraire quotidien. Enfin, le partage des données entre les différents opérateurs permet d’améliorer significativement la qualité et la continuité de la prise en charge de bout en bout.

 \
→ Accès au répertoire GitHub du projet : [https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-4](https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-4)  \



### 

<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.png "image_tooltip")


*Légende : L’équipe Groove On : Alex Saint’Andre, Loïc Mauritius, Estibaliz Legarreta, Malory Pommier et Arthur Boivert, accompagnée de Delphine Bürkli, maire du 9e arrondissement de Paris. *

* *


#### 🥈 Le deuxième prix : l’équipe Reg’inna

*Porté par Caroline Hitier, Julien Delmotte, Alix Delannoy, Caspar  Longin-Dimanche, Erwann Yvin, Andres Ladino et Maud Cailly*

Le projet Reg’inna propose d’extraire les données sur la facilitation d'accès

et les données de validation afin de les croiser avec les générateurs de flux PMR (par exemple avec la validation des forfaits améthyste : le titre de transport destiné aux personnes âgées ou invalides si elles sont âgées de plus de 20 ans). 

On obtient alors un niveau de criticité des gares et des scores d'accessibilité qui permettent d'aiguiller les réponses à différentes questions pour la maintenance du service : où faut-il orienter les investissements ? Quelles actions doivent être priorisées ? Où faut-il créer ou ajouter des équipements ?



<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image4.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image4.png "image_tooltip")


*Légende : une des slides de présentation de l’équipe Reg’inna lors de la restitution*

Selon les porteurs du projet, le démonstrateur pourrait être enrichi avec d'autres sources de données génératrices de flux PMR et un état en temps réel des ascenseurs (provenant de la GMAO RATP par exemple).

Un moteur de recommandations d'actions automatiques pourrait aussi être ajouté et proposer une priorisation des actions par station ou gare : réparation, ajout d'ascenseur, d'escalier mécanique.



<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image5.jpg "image_tooltip")


*Légende : L’équipe Reg’Inna en pleine réflexion : Caroline Hitier, Julien Delmotte, Alix Delannoy, Caspar  Longin-Dimanche, Erwann Yvin, Andres Ladino et Maud Cailly*

→ Accès au répertoire GitHub du projet : 

[https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-2](https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-2) 


#### 🥉Le troisième prix : l’équipe Méli-vélo 

*Porté par Judicael Leger, Tatjana Markova, Pierre Rolland, Baptiste Rérolle et Rémi Coulaud*

La présence des vélos se développe à bord des trains, y compris en heures de pointe. L’application Méli-Vélo cherche à faciliter cette multimodalité, en indiquant si la fréquentation rend possible l’accès d’un train avec un vélo.



<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image6.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image6.jpg "image_tooltip")


*Légende : présentation de l’application Méli-vélo*

Il s’agit d’un indicateur simple, calculé à partir de l'affluence à bord, la capacité d'emport vélo et l'accessibilité des gares. Si le “Méli-Vélo score” de l’utilisateur·ice est rouge, il est possible de vérifier les places de parkings vélos à la gare de départ et la disponibilité des vélos en libre-service à l’arrivée du parcours. 



<p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image7.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image7.jpg "image_tooltip")


*Légende : L’équipe Méli-vélo : Judicael Leger, Tatjana Markova, Pierre Rolland, Baptiste Rérolle et Rémi Coulaud*

→ Accès au répertoire GitHub du projet : 

[https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-6](https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-6) 


#### 💓  Le prix spécial du jury : le projet MobiPuzzle 

*Porté par Geoffrey Scozzaro, Yacine Khacef, Florian Maziere, Arthur Finkelstein, Amine Ait-Ouahmed et Aurélie Auzas*

MobiPuzzle est une application qui encourage, par la gamification, les déplacements domicile-travail écoresponsables. Il part de ce constat : 13% des émissions de GES liées aux transports proviennent de ces déplacements. 

La région Ile-de-France comptant six millions d'emplois salariés, le potentiel de décarbonation est considérable. Mais comment engager un report modal vers des déplacements plus durables ? C’est pour répondre à cette question que l’équipe propose une application intégrée à celle d’Ile-de-France Mobilités pour “gamifier” les déplacements des salariés.



<p id="gdcalert8" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image8.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert9">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image8.png "image_tooltip")


*Légende : Capture d’écran du projet MobiPuzzle*

L’objectif est de motiver les employés à suivre des trajets décarbonés grâce à des récompenses collectées sur leur parcours. Chaque semaine, ils résolvent des casse-têtes et peuvent gagner des récompenses, telles que des bons d'achat pour du matériel cycliste ou des tickets pour des événements culturels.

La distribution des indices s'appuie sur un calculateur d'itinéraires intermodal. Il combine les forces d'outils de planification tels que Navitia, Géovélo et GraphHopper (pour la voiture), tout en intégrant précisément les données de parking vélos et relais fournies par Île-de-France Mobilités (IDFM). Ce calculateur offre une vision holistique de l'offre de transport, en tenant compte de l'environnement de l'utilisateur et de son accès aux différentes solutions de transport à proximité.



<p id="gdcalert9" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image9.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert10">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image9.jpg "image_tooltip")


*Légende : Geoffrey Scozzaro, Yacine Khacef, Florian Maziere, Arthur Finkelstein, Amine Ait-Ouahmed et Aurélie Auzas, accompagnés de Delphine Bürkli, maire du 9e arrondissement de Paris. *

* *

→ Accès au répertoire GitHub du projet : [https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-1/resultats/repository/equipe-1-petits-farcis](https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-1/resultats/repository/equipe-1-petits-farcis)  \
 \



#### Les autres projets issus du hackathon



* Le projet MyCoachMobilités 

*Porté par Achille Popelier, Corentin Barand, Simon Aharonian, Zakaria Hammal, Souheila Bouaicha, Amine Mouaici et Vivien Michon. *

L’équipe part du constat que la part modale de la voiture est encore trop importante aujourd’hui dans les déplacements travail-domicile.  De plus, les entreprises manquent de visibilité sur ces déplacements pour leurs employés. Comment atteindre concrètement l’objectif de report modal pour une mobilité durable ? \
 \
L’application MyCoachMobilités propose de récompenser les trajets alternatifs grâce à un système de “scoring” basé sur l’intermodalité et l’impact CO₂.



<p id="gdcalert10" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image10.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert11">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image10.png "image_tooltip")


*Légende : Capture d’écran du projet MyCoachMobilités*

La “gamification” incite les utilisateurs à adopter des modes de déplacement plus durables : des classements entre collègues, entreprises ou amis renforcent cette motivation.

Les entreprises disposent d’indicateurs pour suivre les pratiques de mobilité de leurs employés et peuvent ainsi renforcer leur contribution globale à la décarbonation.



* Le projet Prédict’mob 

*Porté par Sofiene Salah, Marc-Stéphane Amon, Sami Marrekchi, Gabriel, Corinne Berges, Marc Bresson et David Jalbert-Gagnier*

Les Franciliens subissent un manque d’anticipation face aux perturbations de transport, peinent à trouver rapidement des alternatives pertinentes et ne disposent d’aucun outil simple pour suivre l’impact carbone de leurs déplacements — tandis que les entreprises manquent de données fiables pour leurs indicateurs RSE.

Predict'Mob est une solution qui combine anticipation des perturbations, alternatives éco-responsables et “gamification” pour accompagner les entreprises et leurs salariés vers une mobilité durable tout en fournissant des indicateurs RSE aux entreprises, le tout dans un écosystème ouvert intégrant les partenaires mobilité (Karos, Véligo, ou encore Klaxit...). .  \


→ Accès au répertoire GitHub du projet : [https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-9/resultats/repository](https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-9/resultats/repository)  \




* Le projet Cycloflow 

*Porté par Théophile Molcard, Michel Kaddouh, Lissa Chen et Felipe Lopes-Reis*

Comment garer son vélo en sécurité à Paris ? C’est la question que s’est posée l’équipe du projet Cycloflow. En effet, d’après l’étude de référence de l’Académie des Mobilités Actives (ADMA) publiée en avril 2023, entre 350 000 et 580 000 vélos sont volés chaque année en France. 27% des vols nationaux ont lieu à Paris et en Île-de-France.  \


Cycloflow propose un itinéraire personnalisé permettant de choisir un point de départ, une destination et le parking vélo le plus adapté. L’application propose plusieurs options de trajet : le plus court, le plus sécurisé, celui privilégiant les pistes cyclables ou encore combinant vélo et transports en commun acceptant les vélos. Elle intègre également des informations contextuelles utiles, comme la météo ou les zones d’ombre sur le parcours, afin d’accompagner l’usager dans son choix.



<p id="gdcalert11" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image11.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert12">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image11.jpg "image_tooltip")


*Légende : L’équipe Cycloflow très concentrée avant le pitch final : Theophile, Michel, Lissa et Felipe*

→ Accès au répertoire GitHub du projet : [https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-8/resultats/repository](https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-8/resultats/repository)  \




* Le projet Mobisens 

*Porté par Daniel Phan, Anthony Fraise, Amine Chemchem, Jimmy Dimont, Audrey Macé*

L’équipe Mobisens a souhaité explorer la question de l’accessibilité. Ils sont partis du constat que l’information voyageur reste pensée pour les usagers “standards” mais ne couvre pas assez les besoins d’accessibilité, avec des données souvent incomplètes et peu adaptées aux différents profils.

L’enjeu de la solution est de faire de l’accessibilité un pilier de l’information voyageur, en proposant pour chaque personne un trajet adapté, fiable et sans rupture. \




<p id="gdcalert12" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image12.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert13">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image12.png "image_tooltip")


*Légende : Capture d’écran de la maquette de l’application Mobisens (Figma) *

 \
La solution identifie en amont le profil de l’usager pour prendre en considération ses préférences et ses contraintes. Le produit est doté de services et de fonctionnalités évolutifs qui s’adaptent au fil du temps. Elle s’intègre également de manière fluide dans l’écosystème applicatif existant, garantissant une bonne expérience de navigation. 



<p id="gdcalert13" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image13.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert14">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image13.png "image_tooltip")


*Légende : architecture applicative de l’application Mobisens *

→ Accès au répertoire GitHub du projet : [https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-7/resultats/repository](https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-7/resultats/repository)  \




* Le projet Rayon d’action  \


*Porté par Nicolas Bonge, Alexandre Santacreu, Ugo Demy, Benoît Boucaud, Lancelot Valverde, Pierre-Yves Rollo et Emmanuel Seguin* \
 \
Chaque jour, des milliers de vélos sont embarqués dans les trains franciliens. Parallèlement, près d’un quart des lieux publics d’Île-de-France se situent à plus de 2 000 mètres d’une gare, créant un déficit d’accès significatif entre les pôles d’intérêt et le réseau ferroviaire. 

L’équipe de Rayon d’Action part du constat que le premier et le dernier kilomètre demeurent un frein majeur à l’adoption des transports collectifs, particulièrement dans les zones trop isolées pour justifier la mise en place de lignes de bus dédiées. À cela s’ajoute une méconnaissance des règles d’emport des vélos propres à chaque opérateur, ce qui complique la fluidité et les déplacements multimodaux.

 \



### 

<p id="gdcalert14" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image14.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert15">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image14.jpg "image_tooltip")


*Légende : l’équipe de Rayon d’Action : Nicolas, Alexandre, Ugo, Benoît, Lancelot, Pierre-Yves, et Emmanuel*

Le calculateur d'itinéraire proposé dans la solution permet d’informer les Franciliens sur les opportunités d’emport du vélo à bord des trains. Il permet également de guider l’usager sur les itinéraires les plus pertinents, en fonction de l’heure de la journée. 



<p id="gdcalert15" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image15.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert16">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image15.png "image_tooltip")


*Légende : Principe de fonctionnement de l’application Rayon d’Action*

→ Accès au répertoire GitHub du projet : \
[https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-3/resultats/repository/transport_optimizer](https://github.com/hackathons-mobilites/hackathon_mobilites_2025/tree/equipe-3/resultats/repository/transport_optimizer) 

 \



## Clap de fin 

Le hackathon s’est achevé le vendredi 14 novembre 2025 à 15h avec la présentation des projets devant un jury d’expert·es, suivi par un cocktail convivial. 

Merci encore à Delphine Bürkli, maire du 9e arrondissement de Paris, présidente de la Commission qualité de service, de l’air, de l’accessibilité et des relations avec les usagers (CQSAAU) ; Agnès Grisoglio, directrice de la Transformation & Mass Transit Academy de la SNCF ; Patrick Gendre, expert mobilités, données pour les études de mobilité au CEREMA ; Emmanuel Veiga, directeur général adjoint du développement économique et des mobilités à Saint-Quentin-en-Yvelines ; Régis Bac, directeur juridique, économique et financier chez Voies Navigables de France ; Mounia Latrech, chief data officer, en charge du programme d'accélération Data & IA à la RATP ; et Hélène Brisset, directrice du numérique chez Ile-de-France Mobilités. 



<p id="gdcalert16" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image16.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert17">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image16.png "image_tooltip")


*Légende : Slide de présentation des membres du jury*

Merci aux participant·es qui ont mis du cœur à l’ouvrage pendant ces 48h de hackathon, les partenaires qui ont mis la main à la pâte, les équipes IDFM et leurs opérateurs représentés par Transilien SNCF et la RATP et tous les autres participants qui ont répondu à l’appel ! Merci aussi aux expert.es pour l’accompagnement à l’exploitation des données spécifiquement mises à disposition, pour l’appui à l’utilisation du Datalab Onyxia et du portail PRIM, pour la préparation des défis et l’accompagnement des participants et pour leur présence et leur expertise sur les questions de mobilités.

Merci aux partenaires qui ont fourni des données exclusives de qualité, notamment la SNCF, Géovélo, la communauté d’agglomération SQY, et Métro-Connexion.

