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
  if (!text) return null; // Ajoutez cette ligne pour gérer les valeurs undefined ou null
  return text.split('\n').map((line, index) => {
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
  if (!actionsText) return null; // Ajoutez cette ligne pour gérer les valeurs undefined ou null
  return actionsText
    .split('\n')
    .map((action, index) => {
      if (action.trim() !== '') {
        return (
          <div key={index} className={styles.actionItem}>
            <img src="/icons/action.svg" alt="" className={styles.actionIcon} />
            <span className={styles.actionText}>{action}</span>
          </div>
        );
      }
      return null;
    })
    .filter(Boolean);
};

export async function getServerSideProps(context) {
  const { params, req } = context;
  const { research } = params;

  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const apiUrl = `${protocol}://${host}/api/research-projects?action=get&&id=${research}`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(
        `Erreur lors de la récupération des données : ${res.status}`,
      );
    }
    const data = await res.json();

    return {
      props: {
        referenceData: data,
        docsCatalog: data.docs_catalog || null,
      },
    };
  } catch (error) {
    console.error(error);
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
    description,
    realisations,
    methode,
    'team-names': teamNames,
    'team-images': teamImages,
    'reference-link': referenceLink,
    'date-debut': dateDebutISO,
    duree,
    team,
  } = referenceData;
  const dateDebutFormatted = formatDate(dateDebutISO);

  const partnerDescription = referenceData['partner-description'];
  const partnerImage = referenceData['partner-image'];
  const partnerName = referenceData['partner-name'];

  const referenceImageSrc = `/images/research/${router.query.research}.png`;

  return (
    <Layout>
            <img
        src="/icons/research.png"
        alt="Research"
        style={{
          position: 'absolute',
          top: 30,
          left: 10,
          height: '200px',
          zIndex: 1000,
          rotate: '-10deg',
        }}
      />

      <div className={styles.pageContainer}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.dateContainer}>
          <div className={styles.date}>📆 {dateDebutFormatted}</div>
          <div className={styles.date}>⏱️ {duree}</div>
        </div>
        <br />

        <h3 className={styles.subtitle}>Équipe</h3>
        <div className={styles.teamImagesContainer}>
          {teamImages.map((imgSrc, index) => {
            const teamMemberName = teamNames[index].trim();
            const teamMemberSlug = team[index].trim();

            return (
              <div key={index} className={styles.teamMemberContainer}>
                <a
                  href={`/authors/${teamMemberSlug}`}
                  className={styles.teamLink}
                >
                  <img
                    src={imgSrc.trim()}
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
            <h3 className={styles.subtitle}>🔎 Le projet scientifique</h3>
            <div className={styles.mission}>
              {renderTextWithLineBreaks(description)}
            </div>
          </div>

          <div className={styles.methodeContainer}>
            <h3 className={styles.subtitle}>🔬 Méthode</h3>
            <div className={styles.methode}>
              {renderTextWithLineBreaks(methode)}
            </div>
          </div>

          <div className={styles.actionsContainer}>
            <h3 className={styles.subtitle}>📋 Réalisations</h3>
            <div className={styles.actions}>
              {renderActionsWithIcons(realisations)}
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
                <br />
        <div className={styles.partnerContainer}>
          {partners.map((partnerSlug, index) => (
            <a
              key={index}
              href={`/partners/${partnerSlug}`}
              className={styles.partnerLink}
            >
              <div className={styles.partnerContent}>
                <img
                  src={partnerImage[index]}
                  alt={`Image of ${partnerName[index]}`}
                  className={styles.partnerImage}
                />
                <div className={styles.partnerDescription}>
                  <h2 className={styles.subtitle}>{partnerName[index]}</h2>
                  <div className={styles.textBlock}>
                    {renderTextWithLineBreaks(partnerDescription[index])}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {docsCatalog && docsCatalog.length > 0 && (
          <div>
            <h3 className={styles.subtitle}>Contenus liés</h3>
            <FilteredDocsDisplay docsList={docsCatalog} />
          </div>
        )}
      </div>
    </Layout>
  );
}
