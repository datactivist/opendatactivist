import ProductPage from "../../components/products/ProductPage"
import Layout from "../../components/Layout"

export default function Produit() {
  const produit = {
    docsList: ['appel-commentaires-cartes-boitenoire'],
    nom: 'La Boîte Noire de l\'IA',
    baseline: 'Un format d\'atelier qui vise à accompagner le grand public dans la compréhension du fonctionnement d\'une IA',
    description: `Depuis le lancement de ChatGPT, ces techniques sorties des laboratoires restent méconnues du grand public bien qu'il les manipule au quotidien. Notre conviction : on ne peut pas se positionner par rapport aux enjeux de l’IA sans comprendre sa fabrique et son fonctionnement. 

    <br></br>
    Notre proposition : un format d'atelier qui explique l'IA en replaçant dans les grandes étapes de sa construction (collecte de données, choix du modèle, entraînement, déploiement) et son cycle de vie (depuis l'extraction de minéraux jusqu'au coût énergétique des data centers).
    <br></br>
    L'atelier reprend des éléments du format des Fresques avec un grand support visuel sur lequel on vient placer des cartes, dans un travail de collaboration et d'intelligence collective.`,
    imageUrl: '/images/products/deroule-boite-noire.png',
    targets: [
      '👥 Tout citoyen qui désire découvrir l\'IA',
      '🎯 Des médiateurs numériques qui souhaitent monter en compétences et reproduire l\'expérience auprès de leurs publics',
      '📊 Tout acteur politique, économique, associatif ou universitaire en prise avec les problématiques d\'IA ou qui souhaite simplement se sensibiliser'
    ],
    partnersIds: ['nantes-metropole'],
    testimonials: [],
    partis_pris: [
      'Accessibilité à toutes et tous : l\'atelier ne nécessite pas de pré-requis sur l\'IA',
      'Pédagogie active, écoute et dialogue loin des discours d\'experts',
      'Frugalité, adaptabilité et reproductibilité du format',
      'Focus sur l\'IA générative, la technologie au centre de toutes les attentions'
    ],
    liens: [
      {url: 'mailto:contact@datactivist.coop?subject=Demande d\'informations - La Boîte Noire de l\'IA', texte: '✉️ Nous contacter pour en savoir plus'},
      {url: 'https://docs.google.com/document/d/e/2PACX-1vSvb0MDcIM1LlIgk1Q-xBD3PaaC-En8epEpZl5yJjTKNLGDGgw7AyHZpa0s0RUgtV51vecNtg3wUUfO/pub', texte: 'Lire la note de concept détaillée'}
    ]
  }

  return (
    <Layout>
    <br></br>
    <ProductPage {...produit} />
    </Layout>
  )
}
