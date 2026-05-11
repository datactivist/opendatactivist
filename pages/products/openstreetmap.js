import ProductPage from "../../components/products/ProductPage"
import Layout from "../../components/Layout"
export default function Produit() {
  const produit = {
    docsList: ['openstreetmap-presentation-generale', 'tout-savoir-licence-odbl', 'openstreetmap-acceder-donnees', 'openstreetmap-chez-datactivist', 'openstreetmap-confiance-qualite', 'openstreetmap-monitoring-contribution', 'openstreetmap-nature-ville', 'openstreetmap-ontologie'],
    nom: 'OpenStreetMap : utiliser et contribuer à la base de données collaborative',
    baseline: 'Découvrez nos ressources à propos du projet mondial de cartographie, pour vous aussi vous lancer dans la contribution à ce commun numérique',
    description: `<strong>Découvrez nos expertises et ressources à propos du projet OpenStreetMap</strong>
    <p>
    Datactivist est membre de la fédération des professionnels d'OpenStreetMap et mobilise depuis plusieurs années différents savoirs-faire.
    <br/>La cartographie participative représente une ressource cruciale pour l'aménagement du territoire, la mobilité ou l'adaptation au changement climatique. Nous pensons être en mesure de soutenir la communauté en valorisant ses productions et contribuant à la maintenance des outils de l'écosystème.
    </p>
    <p>
    Nous publions ici les ressources produites dans le cadre de projets passés. Nous espérons qu'elles vous inspirent sur les sujets suivants : 
    <ul>
      <li>Améliorer sa connaissance du projet et réaliser sa première contribution</li>
      <li>Découvrir des cas d'usage des données cartographiques collaborative</li>
      <li>Utiliser ou développer vos propres outils numériques en utilisant ces données dans vos projets</li>
      <li>Mesurer pour comprendre puis agir au contact de communs numériques de grande taille</li>
    </ul>
    `,
    imageUrl: '/images/products/openstreetmap.png',
    targets: [
      '🗺️ Les géomaticiens',
      '👥 Les acteurs politiques et administratifs (élus, agents)',
      '📊 Le grand public'
    ],
    partnersIds: ['fede-pros-openstreetmap', 'oet'],
    liens: [
      {url: 'mailto:hello@datactivi.st?subject=Demande d\'informations - OpenStreetMap', texte: '✉️ Nous contacter pour en savoir plus'}
    ]
  }
  
  return (
    <Layout>
    <br></br>
    <ProductPage {...produit} />
    </Layout>
  )
}
