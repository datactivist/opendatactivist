import ProductPage from "../../components/products/ProductPage"
import Layout from "../../components/Layout"
export default function Produit() {
  const produit = {
    docsList: ['appel-commentaires-cartes-boitenoire'],
    nom: 'La Boîte Noire de l\'IA',
    baseline: 'Ouvrez la boîte, révélez les dessous de l\'IA et formez-vous un avis éclairé sur l\'IA générative !',
    description: `À l'heure où les débats et ateliers sur l'Intelligence Artificielle se multiplient partout, une question s'impose : comment se positionner face à une technologie que même les experts peinent à suivre ? Pour la plupart d'entre nous, l'IA reste une boîte noire opaque qui fascine autant qu'elle inquiète.
    <br/><strong>La Boîte Noire de l'IA</strong> est un jeu pédagogique qui accompagne le grand public pour :
    <ul>
      <li>Comprendre le fonctionnement d'une IA générative de texte, en resituant son cycle de vie depuis l'extraction des minéraux jusqu'au coût énergétique des data centers</li>
      <li>Débattre des conséquences sociétales, environnementales et éthiques des IA</li>
      <li>Faire des choix en conscience de nos usages de cette technologie</li>
    </ul>
    Notre conviction : on ne peut pas se positionner face aux enjeux de l'IA sans comprendre sa fabrique et son fonctionnement.
    <br/><strong>Nos partis pris :</strong>
    <ul>
      <li>Aucun pré-requis nécessaire sur l'IA</li>
      <li>Idéal pour des groupes de 7 personnes</li>
      <li>Pédagogie active : tout le contenu est intégré dans les cartes</li>
      <li>Développé par et pour les médiateurs du réseau de Nantes Métropole</li>
      <li>Un commun numérique librement réutilisable (CC-BY-SA), frugal et réplicable</li>
    </ul>`,
    imageUrl: '/images/products/deroule-boite-noire.png',
    targets: [
      '👥 Tout citoyen qui désire découvrir l\'IA',
      '🎯 Des médiateurs numériques qui souhaitent sensibiliser aux enjeux sociaux et environnementaux de l\'IA',
      '📊 Tout acteur politique, économique, associatif ou universitaire en prise avec les problématiques d\'IA'
    ],
    partis_pris: [
      'Accessibilité à toutes et tous : l\'atelier ne nécessite pas de pré-requis sur l\'IA',
      'Pédagogie active, écoute et dialogue loin des discours d\'experts',
      'Frugalité, adaptabilité et reproductibilité du format',
      'Focus sur l\'IA générative, la technologie au centre de toutes les attentions',
      'Un contenu équilibré entre la découverte du cycle de vie d\'une IA et l\'explication du fonctionnement d\'un modèle',
      'Un format d\'animation adapté à des groupes de 7 personnes',
      'Développé par et pour les professionnels du réseau de la médiation numérique'
    ],
    partnersIds: ['nantes-metropole'],
    testimonials: [],
    liens: [
      {url: 'mailto:contact@datactivist.coop?subject=Demande d\'informations - La Boîte Noire de l\'IA', texte: '✉️ Nous contacter pour en savoir plus'}
    ]
  }
  
  return (
    <Layout>
    <br></br>
    <ProductPage {...produit} />
    </Layout>
  )
}
