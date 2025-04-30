import ProductPage from "../../components/products/ProductPage"
import Layout from "../../components/Layout"
export default function Produit() {
  const produit = {
    docsList: ['foire-aux-questions-boite-noire','cartes-boite-noire','consignes-animation-boite-noire','appel-commentaires-cartes-boitenoire','boite-noire-ia-introduction'],
    nom: 'La Boîte Noire de l\'IA',
    baseline: 'Ouvrez la boîte, révélez les dessous de l\'IA et formez-vous un avis éclairé sur l\'IA générative !',
    description: `Comment se positionner face à une technologie que même les experts peinent à suivre ? Pour la plupart d'entre nous, l'IA reste une boîte noire opaque qui fascine autant qu'elle inquiète.
    <strong>La Boîte Noire de l'IA</strong> est un jeu pédagogique qui accompagne le grand public pour :
    <ul>
      <li>Comprendre le fonctionnement d'une IA générative de texte, en resituant son cycle de vie depuis l'extraction des minéraux jusqu'au coût énergétique des data centers</li>
      <li>Débattre des conséquences sociétales, environnementales et éthiques des IA</li>
      <li>Faire des choix en conscience de nos usages de cette technologie</li>
    </ul>
    Pensé pour le grand public, ce jeu pédagogique favorise la discussion, l'apprentissage et la prise de recul. 
<br></br>
<strong>Ce que vous y gagnerez :</strong>
<ul>
  <li>Une compréhension claire et concrète des IA génératives</li>
  <li>Des débats animés et accessibles, même sans connaissance préalable</li>
  <li>Une expérience coopérative et engageante, en petits groupes</li>
  </ul>
    <strong>Nos partis pris :</strong>
    <ul>
      <li>Aucun pré-requis : l'atelier est accessible à tous et toutes</li>
 <li>Conçu par des professionnels de la médiation numérique, pour le terrain</li>
  <li>Une pédagogie active fondée sur l'échange et le jeu</li>
  <li>Un format frugal, libre (CC-BY-SA), et facilement réutilisable</li>
  <li>Une exploration complète du cycle de vie et du fonctionnement de l'IA générative</li>
  <li>Animation en petits groupes (7 personnes), pour favoriser les échanges</li>
    </ul>
   © photo : Mstream – Axel varyot Gomez`,
    imageUrl: '/images/products/deroule-boite-noire.png',
    targets: [
      '👥 Les citoyens désireux de découvrir l\'IA',
      '🎯 Des médiateurs numériques qui souhaitent sensibiliser aux enjeux sociaux et environnementaux de l\'IA',
      '📊 Tout acteur politique, économique, associatif ou universitaire en prise avec les problématiques d\'IA'
    ],
    partnersIds: ['nantes-metropole'],
    testimonials: [
      {text: "Au moins, je pourrai démystifier l'IA avec un jeu. Pour moi, c'est quand même une bénédiction d'avoir un jeu pour débattre.", author: "Participant·e - La Boîte Noire de l'IA"},
      {text: "J'étais déjà initié à l'IA avec ma formation. Malgré ça, j'ai appris en détail comment ça fonctionne et le débat, c'est bien parce que chacun a son idée de ce qu'il faut faire ou pas avec l'IA.", author: "Participant·e - La Boîte Noire de l'IA"},
      {text: "J'ai aimé avoir cette vision de l'ensemble des étapes de la construction d'une IA, ça m'a permis de comprendre les usages et des enjeux écologiques de l'IA.", author: "Participant·e - La Boîte Noire de l'IA"},
      {text: "J'ai aimé réorganiser les étapes. J'ai encore plus aimé le jeu social, l'IA redevient un objet social et pas juste un objet technique.", author: "Participant·e - La Boîte Noire de l'IA"},
      {text: "J'ai découvert avec vous le monde de l'IA, c'était bien, j'ai aimé.", author: "Participant·e - La Boîte Noire de l'IA"}
    ],
    liens: [
      {url: 'mailto:boitenoireia@datactivi.st?subject=Demande d\'informations - La Boîte Noire de l\'IA', texte: '✉️ Nous contacter pour en savoir plus'},
      {url: 'https://open.datactivist.coop/docs/cartes-boite-noire', texte: '🖨️ Imprimez le jeu'}
    ]
  }
  
  return (
    <Layout>
    <br></br>
    <ProductPage {...produit} />
    </Layout>
  )
}
