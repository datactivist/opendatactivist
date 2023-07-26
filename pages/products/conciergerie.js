import ProductPage from "../../components/products/ProductPage"
import Layout from "../../components/Layout"

export default function Produit() {
  const produit = {
    docsList: ['agent-conversationnel-decouvrabilite','ameliorer-qualite-documentation'],
    nom: 'Conciergerie de données',
    baseline: 'Permettez aux utilisateurs de votre portail open data de trouver plus facilement des jeux de données',
    imageUrl: '/images/products/screen-conciergerie.png',
    description: `
    <h3>Des données décrites différemment par les producteurs et les utilisateurs de données</h3>

    La <b>découvrabilité</b> des jeux de données ouverts a un impact important sur leur utilisation. Souvent, les jeux de données 
    et leurs métadonnées sont décrits tels que le producteur les connaît, alors que les usagers formulent leur besoin de données dans le contexte 
    de leurs propres cas d’usages et avec leur propre terminologie.
    <br></br>

    <h3>Améliorer la découvrabilité des données ouvertes</h3>

    Dans ce cadre, Datactivist a développé la conciergerie de données, un <b>agent conversationnel</b> pour les portails de données ouvertes, qui aide l’utilisateur à 
    formuler sa requête et recueille ses retours sur la pertinence des jeux de données qui lui sont proposés.

    <h3>Déployez votre conciergerie de données</h3>

    Déjà intégrée à la plateforme DataSud, la conciergerie a été conçue pour s'intégrer sur tout portail open data.
    Vous souhaitez faciliter l'utilisation de vos données, et donner à vos utilisateurs l'envie de revenir sur votre portail ? Contactez-nous pour en discuter !
    `,
    targets: ['👩🏽‍💻 Responsables de portails open data', '🖥 Editeurs de logiciels'],
    partnersIds: ['region-sud'],
    testimonials: [
      {text: "Je pense même que c'est plus performant que la recherche normale !", author: "Utilisateur du portail DataSud"},
      {text: "J'anime une formation data à destination de futurs techniciens [...] je les fais rechercher des datasets via le databot. ça marche bien !", author: "Formateur open data"}
    ],
    liens: [
        {url: 'https://www.datasud.fr/', texte: '🔎 Voir la conciergerie sur DataSud'},
        {url: 'mailto:hello@datactivist.coop', texte: '💬 Déployez votre conciergerie'},
      ]
  }

  return (
    <Layout>
    <br></br>
    <ProductPage {...produit} />
    </Layout>
  )
}
