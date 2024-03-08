import ProductPage from '../../components/products/ProductPage';
import Layout from '../../components/Layout';

export default function Produit() {
  const produit = {
    nom: 'Stickers Datactivist',
    baseline:
      'Le coeur de notre activité produits',
    imageUrl: '/images/products/stickers.png',
    description: `« Chez Datactivist, on adore les stickers. Et les blagues (qui ne font parfois rire que nous). Et les stickers.
    Comme la plupart de nos productions, nos stickers sont sous licence libre. Vous pouvez aussi nous en commander.
`,
    targets: [
      '🤷🏻‍♂️ Vos amis',
      '👩 Vos collègues',
      '👶 Vos enfants',
    ],
    testimonials: [
      {
        text: "Un effet garanti, ce sont ces stickers qui m'ont inspirés pour accélérer l'open data en France",
        author: "François Hollande",
      },
        {
            text: "Je n'ai pas compris les blagues, mais vive l'open data.",
            author: "Kim Jong-un"
        },
    ],
    liens: [
      {
        url: 'https://odoo.datactivist.coop/nos-stickers/',
        texte: '💖 Commander des stickers',
      },
      {
        url: 'https://github.com/datactivist/stickers',
        texte: '📁 Tous nos stickers sous licence libre',
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
