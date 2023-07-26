import ProductPage from "../../components/products/ProductPage"
import Layout from "../../components/Layout"

export default function Produit() {
  const produit = {
    nom: 'Patchwork PGD',
    baseline: 'Un parcours d‘accompagnement de bout-en-bout pour construire son Plan de Gestion des Données',
    partnersIds: ['urfist-occitanie'],
    imageUrl: '/images/products/patchwork-pgd.png',
    description: `Bâti autour du cycle de vie de la donnée, vous y trouverez un patchwork de savoir-faire, d'outils et de documentations tissé pour construire votre PGD.
    <h3>5 étapes pour construire son PGD</h3>
    <li>Etape 1 : Acquisition des données</li>
    <li>Etape 2 : Traitement des données</li>
    <li>Etape 3 : Accès et partage des données</li>
    <li>Etape 4 : Conservation et archvage des données</li>
    <li>Etape 5 : Réutilisation des données</li>   `,
    targets: ['🧑‍💼 Responsables data', '👩🏽‍💻 Responsables informatique dans les universités', '👩🏻‍💼 Consultants'],
    testimonials: [
      {text: "Le patchwork nous a aidé à bien distinguer les différentes étapes nécessaires", author: "Utilisateur du patchwork"},
      {text: "Ça permet d'avancer à notre rythme et d'accéder aux ressources pertinentes", author: "Utilisatrice du patchwork"}
    ],
    liens: [
        {url: 'https://opendatacanvas.org/sprint-pgd', texte: '👾 Accéder au patchwork'},
      ]
  }

  return (
    <Layout>
    <br></br>
    <ProductPage {...produit} />
    </Layout>
  )
}
