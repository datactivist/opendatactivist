import ProductPage from "../../components/products/ProductPage"
import Layout from "../../components/Layout"
export default function Produit() {
  const produit = {
    docsList: ['rapport-final-excom','flyer-excom','methodo-excom','super-commerces-excom','commerce-etages-excom','rapport-excom-1'],
    nom: 'La boîte à outils EXCOM',
    baseline: 'Découvrez toutes les ressources produites dans le cadre du projet de recherche-action EXCOM',
    description: `<strong>Comment mesurer la valeur non-marchande du commerce de proximité ? </strong>. C'est à cette question que cherche à répondre le projet de recherche-action EXCOM, lancé fin 2022 avec nos partenaires Paris Commerces, Altavia Foundation, Urbanis Fondation, Urbanis Aménagement, Métropole Rouen Normandie.
    Grâce aux ressources produites dans le cadre de ce projet, vous allez pouvoir : 
    <ul>
    <li>En apprendre plus sur les effets non-marchands des commerces de proximité</li>
      <li>Découvrir des pistes d'actions pour aider les commerçants à continuer de contribuer à un cadre de vie de qualité</li>
      <li>Vous saisir de notre méthodologie pour mener votre propre enquête logalement</li>
       </ul>
    `,
    imageUrl: '/images/products/flyer-excom.png',
    targets: [
      '👥 Les acteurs politiques et administratifs (élus, agents)',
      '🎯 Les commerçants',
      '📊 Le grand public'
    ],
    partnersIds: ['part-excom'],
    liens: [
      {url: 'mailto:elise@datactivi.st?subject=Demande d\'informations - EXCOM', texte: '✉️ Nous contacter pour en savoir plus'},
    ]
  }
  
  return (
    <Layout>
    <br></br>
    <ProductPage {...produit} />
    </Layout>
  )
}
