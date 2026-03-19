import ProductPage from '../../components/products/ProductPage';
import Layout from '../../components/Layout';

export default function Produit() {
  const produit = {
    docsList: [],
    nom: 'Kit pédagogique IMMERSION IA',
    baseline: "Former vos équipes aux enjeux de l'IA",
    description: `Le <strong>Kit pédagogique IMMERSION IA</strong> est un outil complet pour accompagner vos équipes dans la compréhension des enjeux liés à l'intelligence artificielle.
    
    <strong>Ce kit comprend :</strong>
    <ul>
      <li>Des modules de formation adaptés à différents niveaux</li>
      <li>Des supports pédagogiques prêts à l'emploi</li> 
      <li>Des exercices pratiques et cas d'usage</li>
      <li>Des outils d'évaluation des connaissances</li>
    </ul>
    
    <strong>Objectifs pédagogiques :</strong>
    <ul>
      <li>Comprendre les fondamentaux de l'intelligence artificielle</li>
      <li>Identifier les opportunités et les risques de l'IA dans votre contexte</li>
      <li>Développer une approche éthique et responsable de l'IA</li>
      <li>Acquérir les compétences nécessaires pour piloter des projets IA</li>
    </ul>
    
    Développé en partenariat avec des experts reconnus du domaine, ce kit offre une approche pragmatique et accessible pour démystifier l'IA et accompagner la montée en compétences de vos équipes.`,
    imageUrl: '/images/products/kit-immersion-ia.png',
    targets: [
      "👥 Équipes en entreprise souhaitant se former à l'IA",
      '🎯 Formateurs et consultants spécialisés dans le numérique',
      '🏢 Organisations publiques et privées engagées dans la transformation numérique',
      '📊 Responsables formation et RH',
    ],
    partnersIds: [],
    testimonials: [],
    liens: [
      {
        url: "mailto:hello@datactivist.coop?subject=Demande d'informations - Kit IMMERSION IA",
        texte: '✉️ Nous contacter pour en savoir plus',
      },
      { url: '/products', texte: '🔙 Retour aux produits' },
    ],
  };

  return (
    <Layout>
      <br></br>
      <ProductPage {...produit} />
    </Layout>
  );
}
