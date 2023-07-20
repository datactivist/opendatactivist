import ProductPage from "../../components/products/ProductPage"
import Layout from "../../components/Layout"

export default function Produit() {
  const produit = {
    nom: 'TeamOpenData',
    baseline: 'Rejoignez la communauté francophone de l‘open data et bénéficiez des retours de spécialistes et d‘agents publics.',
    imageUrl: '/images/products/screen-tod.jpeg',
    description: `TeamOpenData est un forum au service de la <b>communauté open data française :</b> agents publics en charge de l’ouverture des données, prestataires, consultants, militants, simples citoyens…
                  <br></br>
                  Échangeons nos bonnes pratiques, mutualisons notre veille, aidons-nous les uns les autres, bref… ouvrons-nous !
                  <br></br>
                  Ce forum a été créé et est hébergé par Datactivist, mais il a une vocation communautaire : ses animateurs doivent être ses usagers, dans leur diversité.
                  <br></br>
                  Vous souhaitez trouver ou <b>comprendre un jeu de données</b> ? Publier une <b>offre d'emploi</b> liée à l'open data ? Recruter des <b>participants pour un hackathon</b> ? Rejoignez dès aujourd'hui les 1500 membres de la communauté #TeamOpenData !
                  `,
    targets: ['🙋🏻‍♂️ Citoyens', '🧑‍💼 Agents publics', '👩🏻‍💼 Consultants','🕵️‍♀️ Recruteurs'],
    testimonials: [
      {text: "TeamOpenData m'a permis d'obtenir des retours d'usagers sur le portail que notre collectivité a lancé.", author: "Chargé de mission open data d'un Département"},
      {text: "J'ai pu présenter notre hackathon et identifier nos premiers participants", author: "Organisatrice d'un hackathon"}
    ],
    liens: [
        {url: 'https://teamopendata.org', texte: '🐝 Accéder à #TeamOpenData'},
      ]
  }

  return (
    <Layout>
    <br></br>
    <ProductPage {...produit} />
    </Layout>
  )
}
