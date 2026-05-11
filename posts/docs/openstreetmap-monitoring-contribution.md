## Pourquoi mesurer ?

OpenStreetMap est une base de données en constante évolution, sa communauté s'élargit et la contribution peut être observée comme une véritable pulsation. Datactivit contribue au développement du [logiciel Podoma](https://wiki.openstreetmap.org/wiki/Podoma) visant à faciliter cette observation. Nous sommes convaincus que la mesure fine de l'engagement dans des projets donnés au sein de cette vaste communuaté est nécessaire pour gratifier et reconnaître le poids de cette contribution. C'est un enjeu existentiel pour pérenniser le commun sur le long terme.

Podoma a été particulièrement utile dans la mesure de l'engagement au projet MapYourGrid à l'échelle mondiale. Nous sommes parvenus à reconstituer l'historique de la contribution sur deux ans pour 40 millions d'objets répartis en 6 projets (pylônes, lignes électriques, circuits électriques, postes électriques, générateurs et centrales). Vous pouvez visualiser l'actualisation quotidienne en ligne :
- Sur [l'instance Podoma de démonstration](https://mapyourgrid.infos-reseaux.com/)
- Sur [le tableau de bord dédié](https://mapyourgrid.infos-reseaux.com/dashboard/) développé par nos soins

### Mesurer pour exister

Lorsqu'elle est observée globalement, la contribution mondiale à OpenStreetMap apparait comme un bruit de fond, à un rythme indiscernable.  
Souvent, il s'agit d'isoler au milieu de ce bruit, des contributions particulières correspondant à l'effort que nous souhaitons évaluer sur un sujet particulier. En principe, faire cette distinction peut être réalisé quotidiennement au moyen d'opérations manuelles fastidieuses et répétitives. Ainsi l'impact de ces contributions est uniquement estimé, de façon grossière sans prendre le temps de rentrer dans les détails.

L'organisation ou la continuité de la contribution d'un projet nécessite pourtant de pouvoir :
- Récompenser les plus gros contributeurs
- Encourager les moins motivés pour leur expliquer l'intérêt d'un engagement plus important
- Ou les deux en même temps dans le cadre d'une stratégie plus complexe

Sans parler de l'intérêt d'accumuler ces mesures sur un temps suffisament long pour pouvoir raconter l'histoire de cette contribution au milieu de cette gigantesque base de données.

### Explorer l'historique

Chaque édition dans OpenStreetMap alimente un historique en expension constante. Bien qu'étant une mine d'informations y compris à propos d'infrastructures ayant existé dans le passé, son exploration n'est pas aisée pour plusieurs raisons :
- Le volume de données est conséquent, plus de 200 Go en 2026 et nécessite en réalité un espace beaucoup plus important pour être traité décompressé
- Les temps de traitement sont également importants en fonction des objets recherchés et des périmètres géographiques considérés

Disposer d'une solution efficace pour industrialiser ces extractions, constituer des journaux de modification pour enfin parvenir à mesurer permet donc un gain de temps au quotidien.  
C'est très utile en complément du point précédent pour pouvoir identifier des efforts de contributions particuliers, y compris dans le passé.

### Une dimension sociale

Observer la contribution, en particulier sur des thèmes de prédilection, renforce aussi la dimension sociale au sein de la communauté OpenStreetMap. Cela permet de découvrir d'autres contributeurs investis sur le même sujet dans ses environs proches.

Cette connexion entre les humains du projet doit être renforcée, en particulier au niveau local ou même entre de potentiels organisateurs pour mieux connaître les personnes déjà impliquées.

Cette dimension sociale a été très bien décrite par [Jean-Christophe Becquet](https://www.apitux.com/) lors des conférences éclair du State-of-the-Map 2024 à Lyon, [revisionnable en ligne sur la chaîne vidéo de l'événement](https://peertube.openstreetmap.fr/w/6dnSYspzFMS2xgK2UEi7MG?start=1h14m).

## Essayer Podoma

Podoma est une application fonctionnant en instance, configurée pour un usage et des projets de contribution précis.  
[Sa documentation](https://github.com/osm-fr/podoma/blob/main/docs/) vous permettra de l'adapter à votre besoin, selon les fonctionnalités souhaitées.

### Fonctionnalités principales
- Filtrage et mise à jour quotidienne d'un journal de changements présentant de l'intérêt pour un projet
- Etiquetage des modifications en vue d'un dénombrement catégorisé
- Définition d'une pyramide de périmètres administratifs pour la ventilation du calcul d'indicateurs
- Définition d'équipes de contributeurs pour la ventilation du calcul d'indicateurs
- Calcul de KPI révélateurs de la contribution réalisée (nombre d'objets, longueur, surfaces occupées, nombre de contributeurs)
- Calcul des deltas quotidiens
- Editeur intégré et contextualisé pour contribuer sur des cas simples

Datactivist dispose d'une expérience dans la configuration de Podoma, grâce aux références mentionnées en tête d'article.

Revisionnez notre intervention au FOSDEM26 à propos de Podoma avec une démonstration sur le territoire Belge :
<div class="responsiveIframe">
  <iframe
    width="100%"
    height="500"
    src="https://peertube.openstreetmap.fr/videos/embed/rbfWmXjTHFZ22PgeavWd8Z">
  </iframe>
</div>

%%Products:openstreetmap%%
