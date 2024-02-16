// pages/references/[reference].js
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import styles from '../../styles/References.module.css';
import FilteredDocsDisplay from '../../components/docs/FilteredDocsDisplay';

function formatDate(dateISO) {
    const options = { year: 'numeric', month: 'long' };
    const date = new Date(dateISO);
    return date.toLocaleDateString('fr-FR', options);
  }
  

const renderTextWithLineBreaks = (text) => {
  return text.split('\n').map((line, index) => {
    // Remplace les tirets en début de ligne par un point de puce
    const updatedLine = line.replace(/^\s*-\s*/, '✔︎ ');
    return (
      <span key={index}>
        {updatedLine}
        <br />
      </span>
    );
  });
};

const renderActionsWithIcons = (actionsText) => {
  return actionsText
    .split('\n')
    .map((action, index) => {
      // Vérifie si la ligne n'est pas vide avant de l'ajouter
      if (action.trim() !== '') {
        return (
          <div key={index} className={styles.actionItem}>
            <img src="/icons/action.svg" alt="" className={styles.actionIcon} />
            <span className={styles.actionText}>{action}</span>
          </div>
        );
      }
      return null; // Pour les lignes vides, ne retourne rien
    })
    .filter(Boolean); // Filtre les éléments null pour éviter de les rendre
};

export async function getServerSideProps(context) {
  const { params, req } = context;
  const { reference } = params;

  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const apiUrl = `${protocol}://${host}/api/references?action=get&id=${reference}`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      // Vérifie si la réponse est une erreur
      throw new Error(
        `Erreur lors de la récupération des données : ${res.status}`,
      );
    }
    const data = await res.json();

    // Retourne les données récupérées dans les props, y compris l'identifiant des documents liés si disponible
    return {
      props: {
        referenceData: data,
        docsCatalog: data.docs_catalog || null, // Utilisez null ou une valeur par défaut si docs_catalog n'est pas présent
      },
    };
  } catch (error) {
    console.error(error);
    // Gère le cas où la récupération échoue ou retourne une erreur
    return {
      notFound: true,
    };
  }
}

export default function ReferencePage({ referenceData, docsCatalog }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const {
    title,
    partners,
    mission,
    actions,
    'team-names': teamNames,
    'team-images': teamImages,
    'reference-link': referenceLink,
    'date-debut': dateDebutISO,
    duree,
    team,
  } = referenceData;
  const dateDebutFormatted = formatDate(dateDebutISO); // Formatez ici après déstructuration

  const partnerDescription = referenceData['partner-description'];
  const partnerImage = referenceData['partner-image'];
  const partnerName = referenceData['partner-name'];
  // Supposons que teamImages et teamNames soient des tableaux correspondants
  const teamImagesArray = teamImages.split(',');
  const teamArray = team.split(',');
  const teamNamesArray = teamNames.split(',');

  const referenceImageSrc = `/images/references/${router.query.reference}.png`;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.dateContainer}>
        <div className={styles.date}>📆 {dateDebutFormatted}</div>
          <div className={styles.date}>⏱️ {duree}</div>
        </div>
        <br />
        <div className={styles.partnerContainer}>
          <a href={`/partners/${partners}`} className={styles.partnerLink}>
            <div className={styles.partnerContent}>
              <img
                src={partnerImage}
                alt={`Image of ${partners}`}
                className={styles.partnerImage}
              />
              <div className={styles.partnerDescription}>
                <h2 className={styles.subtitle}>{partnerName}</h2>
                <div className={styles.textBlock}>
                  {renderTextWithLineBreaks(partnerDescription)}
                </div>
              </div>
            </div>
          </a>
        </div>

        <h3 className={styles.subtitle}>Équipe</h3>
        <div className={styles.teamImagesContainer}>
          {teamImagesArray.map((imgSrc, index) => {
            // Ici, index est bien défini
            const teamMemberName = teamNamesArray[index].trim(); // Utilisation de index pour accéder au nom
            const imagePath = imgSrc.trim();
            const teamMemberSlug = teamArray[index].trim(); // Assurez-vous que teamArray[index] est correct

            return (
              <div key={index} className={styles.teamImageContainer}>
                <a
                  href={`/authors/${teamMemberSlug}`}
                  className={styles.teamLink}
                >
                  {' '}
                  {/* Utilisation correcte de index */}
                  <img
                    src={imagePath}
                    alt="Team member"
                    className={styles.teamImage}
                  />
                  <span className={styles.teamName}>{teamMemberName}</span>
                </a>
              </div>
            );
          })}
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.missionContainer}>
            <h3 className={styles.subtitle}>🎯 Mission</h3>
            <div className={styles.mission}>
              {renderTextWithLineBreaks(mission)}
            </div>
          </div>
          <div className={styles.actionsContainer}>
            <h3 className={styles.subtitle}>📋 Actions</h3>
            <div className={styles.actions}>
              {renderActionsWithIcons(actions)}
              {referenceLink && (
                <a
                  href={referenceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.referenceLinkButton}
                >
                  ☞ Voir le résultat
                </a>
              )}
            </div>
          </div>
        </div>
        <img
          src={referenceImageSrc}
          alt="Reference image"
          className={styles.referenceImage}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
{docsCatalog && docsCatalog.length > 0 && (
  <div>
    <h3 className={styles.subtitle}>Publications liées</h3>
    <FilteredDocsDisplay docsList={docsCatalog} />
  </div>
)}
      </div>
    </Layout>
  );
}
