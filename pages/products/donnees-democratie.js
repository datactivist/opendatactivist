import ProductPage from '../../components/products/ProductPage';
import Layout from '../../components/Layout';

export default function Produit() {
  const produit = {
    nom: 'Livre : Les données de la démocratie',
    baseline:
      'Open data, pouvoirs et contre-pouvoirs, un livre de Samuel Goëta',
    imageUrl: '/images/products/donnees-democratie.png',
    description: `<i>« Comment mettre les données ouvertes au service des citoyens ? Pourrions-nous remettre en cause l'ordre établi avec l'open data ? Comment en faire un outil de la service de la démocratie ? »</i>
    <br><br>
    Gouverner, un pays, une ville, un service, c'est disposer de données pour choisir les orientations et évaluer les résultats. Dans l'équilibre entre pouvoirs et contre-pouvoirs, <b>l'accès direct aux données est indispensable à la participation citoyenne.</b>
    <br><br>
    La démarche de l'open data a été initiée il y a une vingtaine d'années, en commençant par les données scientifiques pour s'étendre aux données géographiques, économiques, sociales, aux informations émanant de la puissance publique ou commandées par elle. En France, la loi Pour une république numérique a constitué un tournant majeur.
    <br><br>
<b>Quel usage démocratique des données ? Comment en garantir l'accès et la durabilité ? Comment permettre leur ré-utilisation par les entreprises, les médias, les citoyens et leurs associations ?</b> Il s'agit de transformer la numérisation du monde au service de quelques uns en une source d'espoir, favorisant l'intervention de tous et toutes dans la vie publique.
Quelles sont les motivations politiques, économiques et informationnelles du mouvement qui défend l'ouverture des données ? Comment médias, entreprises et société civile s'emparent-ils des données ? Comment la culture des données peut-elle devenir <b>un outil au service de la démocratie et des contre-pouvoirs ?</b>
<br><br>
Ponctué de cas d'usage et particulièrement accessible, cet ouvrage de Samuel Goëta présente les origines du mouvement open data, pose <b>un bilan critique</b> de ses réalisations et propose des <b>pistes d'action</b> pour que les données ouvertes renforcent la démocratie.

`,
    targets: [
      '🙋🏻‍♀️ Tout public',
      '👩‍🎓 Etudiants',
      '🧳 Professionnels de la donnée',
    ],
    testimonials: [
      {
        text: "Oscillant entre la théorie et la pratique, l'idéal et la realpolitik, éclectique, inclassable, le livre est à l'image des personnes qui agissent au sein des communautés de l'open data, toujours mus par une aspiration commune.",
        author: "Axelle Lemaire - Ancienne secrétaire d'État chargée du Numérique",
      },
        {
            text: "Convaincu que la transparence des données renforce la démocratie, Samuel expose les défis actuels, les avancées en France et les perspectives pour un usage plus éclairé de l'information.",
            author: "La Netscouade"
        },
    ],
    liens: [
      {
        url: 'https://cfeditions.com/donnees-democratie/',
        texte: '📒 Commander le livre',
      },
      {
        url: 'https://www.lemonde.fr/les-decodeurs/article/2024/03/05/open-data-publique-on-voit-les-limites-des-que-les-donnees-pourraient-remettre-en-cause-le-pouvoir-etabli_6220230_4355770.html',
        texte: '🔎 Lire l‘article du Monde',
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
