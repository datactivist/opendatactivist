import ProductPage from '../../components/products/ProductPage';
import Layout from '../../components/Layout';

export default function Produit() {
  const produit = {
    docsList: ['experimentation-algo-lille'],
    nom: 'Patchwork Algorithmes',
    baseline:
      'Un parcours d‘accompagnement de bout-en-bout pour construire et publier votre registre des algorithmes publics',
    partnersIds: ['metropole-lille'],
    imageUrl: '/images/products/patchwork-algorithmes.png',
    description: `Le patchwork algorithmes est un ensemble de <b>ressources, d'outils et de documentations</b> regroupés pour vous aider à construire et publier votre registre des algorithmes publics.
    <h3>5 étapes pour ouvrir et rendre compte des algorithmes publics</h3>
    <li>Etape 1 : cadrer le projet</li>
    <li>Etape 2 : rassembler une équipe</li>
    <li>Etape 3 : acculturer aux algorithmes</li>
    <li>Etape 4 : identifier les algorithmes</li>
    <li>Etape 5 : publier les algorithmes</li>

                  `,
    targets: ['🧑‍💼 Responsables open data', '👩🏻‍💼 Consultants'],
    testimonials: [
      {
        text: 'Des ressources claires et placées dans une suite logique',
        author: 'Utilisatrice du patchwork',
      },
      {
        text: 'Le patchowork nous a permis de nous poser les bonnes questions au bon moment',
        author: 'Utilisateur du patchwork',
      },
    ],
    liens: [
      {
        url: 'https://opendatacanvas.org/transparence-algo',
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
