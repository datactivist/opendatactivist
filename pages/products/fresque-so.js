import ProductPage from '../../components/products/ProductPage';
import Layout from '../../components/Layout';
export default function Produit() {
  const produit = {
    docsList: ['fresque-so'],
    nom: 'Fresque de la Science Ouverte',
    baseline:
      'Une fresque pour comprendre les enjeux et les concepts de la science ouverte',
    description: `
    <h3>Découvrez les concepts et les enjeux de la science ouverte </h3>
    La fresque de la science ouverte a été développée en collaboration avec les équipes de la mission science ouverte de l'IRD. Elle vise à comprendre et mettre en perspectives les principales notions de la science ouverte.
    
    <h3>Pourquoi le format fresque ?</h3>
    <li> Parce que ce format est particulièrement propice à un apprentissage par le questionnement, il favorise également les discussions et les échanges entre personnes participant à l'atelier.</b></li>

    <h3>Pour qui est fait ce format ?</h3>
    Ce format a été pensé pour de jeunes chercheurs mais il d'adresse à toutes personne curieuse de la science ouverte.

    `,
    imageUrl: '/images/products/fresque-so.png',
    targets: [
      '🦊 Curieuses et curieux',
      '👩‍🏫 Elèves, étudiants',
      '🧑🏻‍💻 Agents publics',
    ],
    partnersIds: ['ird'],

    liens: [
      {
        url: "mailto:hello@datactivist.coop?subject=Demande d'informations - fresque science ouverte",
        texte: '✉️ Nous contacter pour en savoir plus',
      },
      {
        url: 'https://open.datactivist.coop/docs/cartes-fresque-so',
        texte: '🖨️ Imprimez le jeu',
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
