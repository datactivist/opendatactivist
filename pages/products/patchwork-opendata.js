import ProductPage from '../../components/products/ProductPage';
import Layout from '../../components/Layout';

export default function Produit() {
  const produit = {
    nom: 'Patchwork Open Data',
    baseline:
      'Un parcours d‘accompagnement de bout-en-bout pour se lancer dans l‘open data',
    partnersIds: ['anct', 'sciencespo-sgl'],
    imageUrl: '/images/products/patchwork-opendata.jpeg',
    description: `Le patchwork open data est un ensemble de savoir-faire, d'outils et de documentations tissé pour permettre à toutes les collectivités qui se lancent de publier et valoriser leurs premiers jeux de données
    <h3>5 étapes pour ouvrir les données des collectivités</h3>
    <li>Etape 1 : Diagnostic</li>
    <li>Etape 2 : Identification</li>
    <li>Etape 3 : Mise en qualité</li>
    <li>Etape 4 : Publication</li>
    <li>Etape 5 : Valorisation des données</li>   `,
    targets: ['🧑‍💼 Responsables open data', '👩🏻‍💼 Consultants'],
    testimonials: [
      {
        text: ' La plateforme de travail ne manquait pas d’informations et d’outils pour mieux cerner les attendus, sans pour autant installer une pression démesurée.',
        author: 'Etudiante - Sciences Po St Germain-en-Laye',
      },
      {
        text: 'Durant cette semaine nous avons appris à manipuler les données ainsi qu’à maîtriser les outils informatiques correspondants. De plus, nous avons le sentiment d’avoir pris part à une mission de service public en mettant à disposition sous licence libre les données de la commune de Sailly-lez-Lannoy',
        author: 'Etudiant - Sciences Po St Germain-en-Laye',
      },
    ],
    liens: [
      {
        url: 'https://table2site.com/site/opendatacanvas/challenge-data',
        texte: '👾 Accéder au patchwork',
      },
    ],
  };

  return (
    <Layout>
      <br></br>
      <ProductPage {...produit} />
    </Layout>
  );
}
