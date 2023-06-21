import ProductPage from "../../components/products/ProductPage"
import Layout from "../../components/Layout"

export default function Produit() {
  const produit = {
    docsList: ['expo-smartcity-images'],

    nom: 'Exposition - Souriez, vous êtes captés',
    baseline: 'Une exposition qui décrypte la smart city',
    description: `
    <h3>Plongez au cœur des rues connectées ! </h3>
    « Souriez, vous êtes captés ! » vous fait découvrir de façon concrète et réaliste les usages
    les plus innovants des territoires connectés. Entre pédagogie et mise en garde, ce tour
    d'horizon démontre également pourquoi ces projets doivent être accompagnés d'une grande transparence vis-à-vis des citoyens.
    
    <h3>Pourquoi une telle exposition ?</h3>
    <li> Parce qu'en 2022, plus de <b>200 territoires</b> ont engagé en France des projets « intelligents ». </li>
    <li> Parce que le rôle des services publics est d'informer sur le sujet et d'être garant de la <b>protection des données</b> des habitants.</li>
    <li> Parce que la « smart city » est <b>l'affaire de toutes et tous !</b></li>

    <h3>Qui a conçu cette exposition ?</h3>
    Présentée pour la première fois lors de la Nantes Digital Week en septembre 2020, l'exposition
    a été conçue par des entreprises partenaires de projets locaux innovants et des étudiants de
    l'école de design de Nantes Atlantique. Les illustrations de l'exposition sont de Charlotte Blay.
    <br></br>
    L'exposition « Souriez, vous êtes captés ! » est dorénavant diffusée auprès de territoires et
    d'acteurs engagés dans la construction de villes « intelligentes ». Sa diffusion est assurée par
    les équipes de Civiteo, Datactivist et Gens d'Evénement.

    `,
    imageUrl: '/images/products/expo-smartcity-product.jpeg',
    targets: ['🦊 Curieuses et curieux','👩‍🏫 Elèves, étudiants','🧑🏻‍💻 Agents publics'],
    partnersIds: ['civiteo','gens-evenement'],
    testimonials: [
      {text: "Un des temps forts de la Digital Week : une exposition qui reconstitue virtuellement une rue pour faire comprendre au citoyen les multiples façons qui permettent aujourd’hui de capter ses données. Une leçon de choses très instructive !", author: "Ouest France"},
      {text: "« Souriez, vous êtes captés ! », l'expo qui explique bénéfices et risques de là ville connectée. La ville de demain sera connectée. Qu‘est-ce que cela signifie ? Quel intérêt pour les citoyens ? Quels risques ?", author: "Le Figaro"},
      {text: "Alors que le numérique au sens très large soulève des peurs qui échappent parfois au domaine du rationnel, les organisateurs de l'exposition « Souriez, vous êtes captés ! » offrent une approche simple et ludique du sujet.", author: "Le Figaro"},

    ],
    liens: [
        {url: 'https://github.com/datactivist/nextjs-doc/blob/main/public/files/plaquette-expo-smartcity.pdf', texte: '🔎 Voir la plaquette complète'},
        {url: 'mailto:hello@datactivist.coop', texte: '✉️ Nous contacter pour en savoir plus'},
      ]
  }

  return (
    <Layout>
    <br></br>
    <ProductPage {...produit} />
    </Layout>
  )
}
