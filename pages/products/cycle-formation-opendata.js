import ProductPage from "../../components/products/ProductPage"
import Layout from "../../components/Layout"

export default function Produit() {
  const produit = {
    docsList: ['cycle-formation-opendata'],
    nom: 'Cycle de formation à l‘ouverture des données',
    baseline: 'Formez vos agents au travail d‘ouverture des données',
    description: `Datactivist a construit un cycle d’acculturation et de formation à la donnée complet, qui permet aux participants d’acquérir une autonomie dans l’ouverture des données. 
    Ce cycle a été construit, testé avec le BercyHub et est actuellement dispensé au Ministère de l’Economie (100  agents formés). 
    <br></br>
    Le cycle est composé de 4 modules.
    <br></br>
    
    <h3>Module 1 - La fresque des données ouvertes</h3>
    [Pour en savoir plus sur la fresque des données ouvertes](https://open.datactivist.coop/products/fresque-opendata).
    
    <h3>Module 2 - Les fondamentaux de l'open data</h3>
    Compétences visées : 
    <li> Construire un discours argumenté et adapté à l’interlocuteur sur les enjeux de l’ouverture d’un jeu de données</li>
    <li> Évaluer un jeu de données en vue de son ouverture afin d’estimer et de prioriser le travail.</li>
    <li> Comprendre l’importance des formats ouverts, découvrir les formats adaptés aux données tabulaires ou géographiques</li>
    <li> Identifier les variables potentiellement problématiques dans un fichier avant son ouverture et découvrir les solutions d’anonymisation ou de pseudonymisation</li>
    <li> Découvrir une plateforme open data</li>
    
    <h3>Module 3 - La qualité des données ouvertes</h3>
    Compétences visées :
    <li> Comprendre l’importance de la mise en qualité des données</li>
    <li> Savoir évaluer la qualité des données</li>
    <li> Être capable de mettre en qualité ses données métiers pour un public large</li>
    <li> Documenter ses données pour faciliter la réutilisation</li>
    <li> Pouvoir publier un jeu de données sur une plateforme open data</li>
    <li> Savoir remplir efficacement les métadonnées de ses jeux de données</li>
    
    
    <h3>Module 4 - La visualisation des données ouvertes</h3>
    Compétences visées : 
    <li> Comprendre les facteurs de réussite d'une dataviz : rigueur, lisibilité, éloquence</li>
    <li> Découverte et appropriation de la grammaire visuelle des dataviz</li>
    <li> Savoir choisir un format de visualisation adapté au message</li>
    <li> Savoir manipuler les outils intégrés d’un portail open data pour éditorialiser ses jeux de données</li>`,
    
    imageUrl: '/images/docs/cycle-fromation-od.jpeg',
    targets: ['👩‍🏫 Novices en matière de données, y compris les personnes n‘en manipulant pas', '🧑🏻‍💻 Agents publics qui manipulent déjà des données', '🧑‍💼 Personnes en charge d‘une stratégie data'],
    partnersIds: ['bercy-hub'],
    testimonials: [
      {text: "Le format participatif et la variation entre les parties théoriques et la pratique fonctionnent très bien.", author: "Participant•e - BercyHub"},
      {text: "Le cycle m'a permis d'avoir les bases nécessaires pour analyser mes jeux de données et avoir un bon socle pour démarrer la publication de nouveaux de jeux de données.", author: "Participant•e - BercyHub"},
      {text: "C’est bien de mettre “les mains dans le cambouis” et d’aller sur l'outil directement, on se sent prêt à publier des jeux de données", author: "Participant•e - BercyHub"},
      {text: "C'est très enrichissant d'échanger avec des collègues d'autres services, et profiter des retours d'expérience", author: "Participant•e - BercyHub"},
    ],
    liens: [
        {url: 'mailto:hello@datactivist.coop?subject=Demande d\'informations - fresque des données ouvertes', texte: '✉️ Nous contacter pour en savoir plus'},
      ]
  }

  return (
    <Layout>
    <br></br>
    <ProductPage {...produit} />
    </Layout>
  )
}
