import ProductPage from "../../components/products/ProductPage"
import Layout from "../../components/Layout"
export default function Produit() {
  const produit = {
    docsList: ['utilities-asset-management', 'utilities-copper-switchoff', 'utilities-mutualisation-resilience', 'utilities-plan-corps-rue-simplifie', 'utilities-data-transition-energetique'],
    nom: 'Données des réseaux et utilities',
    baseline: 'Notre experience au service des gestionnaires de réseaux, autorités organisatrices et services publics en réseau',
    description: `Nous produisons, traitons les données et conseillons nos clients dans leurs usages au service des infrastructures et des services publics en réseaux.
    Nous avons rassemblé les retours d'expérience les plus significatifs ci-dessous autour de quatre thèmes :
    <ul>
      <li>La transition énergétique</li>
      <li>La gestion des immobilisations et du patrimoine des infrastructures</li>
      <li>Le Plan de Corps de Rue Simplifié (PCRS)</li>
      <li>Le remplacement des télécommunications en cuivre par la fibre optique</li>
    </ul>

    Notre expérience s'établit entre des outils conçus puis maintenus sur ces sujets et au gré des missions pour nos clients, dont nous avons pu publier certaines ressources pour notre propre compte.
    `,
    imageUrl: '/images/products/utilities.png',
    targets: [
      '👥 Les gestionnaires de réseaux',
      '🎯 Collectivités organisatrices de services publics en réseaux',
      '📊 Usagers des services publics en réseaux'
    ],
    partnersIds: ['fnccr', 'oet'],
    liens: [
      {url: 'mailto:hello@datactivi.st?subject=Demande d\'informations - Utilités et infrastructures', texte: '✉️ Nous contacter pour en savoir plus'}
    ]
  }
  
  return (
    <Layout>
    <br></br>
    <ProductPage {...produit} />
    </Layout>
  )
}
