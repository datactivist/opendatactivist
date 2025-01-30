import ProductPage from "../../components/products/ProductPage"
import Layout from "../../components/Layout"

export default function Produit() {
  const produit = {
    docsList: ['kit-immersion-ia'],
    
    nom: 'Kit pédagogique IMMERSION IA',
    baseline: 'Former vos équipes aux enjeux de l\'IA',
    description: `
    <h3>Une expérience immersive</h3>
    En 3 heures, les équipes explorent l'IA à travers un parcours dynamique et interactif.
    De l'introduction ludique avec quiz jusqu'au débat final, en passant par 6 stands thématiques, chaque participant découvre concrètement les usages et enjeux de l\'IA.
    <br></br>
    <h3>Les atouts du kit IMMERSION IA</h3>
    Ce qui rend IMMERSION IA unique, c\'est sa capacité à créer une culture partagée.
    Le format s\'adapte aussi bien à un groupe de 10 personnes qu\'à une soixantaine de participants, <b>sans nécessiter de connaissances techniques préalables</b>.
    L\'hétérogénéité des profils est même un atout, enrichissant les échanges et <b>favorisant l\'identification collective de cas d\'usage pertinents pour votre organisation</b>.
    <br></br>
    <h3>Qui a conçu ce kit ?</h3>
    'Ce nouveau format a été co-conçu avec <a href= "https://www.erasme.org/-Accueil-331">ERASME - UrbanLab</a>, <a href="https://data.grandlyon.com/portail/fr/">le laboratoire d’innovation et Données Métropolitaines et <a href="https://liris.cnrs.fr/>Université de Lyon</a> dans le cadre de la <a href="https://datagora.erasme.org/">DatAgora</a>
    'Pour faciliter son déploiement, nous avons conçu un kit clé en main qui permet à vos formateurs internes de s\'approprier le format.
    'Supports détaillés, conseils d\'animation, ressources pédagogiques : tout est pensé pour une prise en main efficace et une adaptation à vos besoins spécifiques.

    `,
    imageUrl: '/images/products/kit-immersion-ia.png',
    targets: ['🧑🏻‍💻 Agents publics','👩‍🏫 Universitaires, étudiants'],
    partnersIds: ['Métropole de Lyon','Université de Lyon, ERASME - UrbanLab'],
    liens: [
        {url: 'https://erasme.notion.site/Kit-p-dagogique-IMMERSION-IA-cfc1d38fed704c4caebd66272b8d4d78', texte: '🔎 Voir le site du kit IMMERSION IA'},
        {url: 'mailto:ventes@datactivist.coop?subject=Demande d\'informations - Kit IMMERSION IA', texte: '✉️ Nous contacter pour en savoir plus'},
      ]
  }

  return (
    <Layout>
    <br></br>
    <ProductPage {...produit} />
    </Layout>
  )
}


