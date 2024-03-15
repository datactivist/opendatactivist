// pages/references/[reference].js
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import styles from '../../styles/References.module.css';
import FilteredDocsDisplay from '../../components/docs/FilteredDocsDisplay';
import fetch from 'node-fetch';

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


async function fetchQuotes(quoteIds, baseUrl) {
  const quotesPromises = quoteIds.split(',').map(async (id) => {
    const quoteResponse = await fetch(`${baseUrl}/api/quotes?ID=${id}`);
    if (!quoteResponse.ok) return null;
    return quoteResponse.json();
  });
  return Promise.all(quotesPromises);
}



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
  const baseUrl = `${protocol}://${host}`;

  try {
    const apiUrl = `${baseUrl}/api/references?action=get&id=${reference}`;
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch reference: ${res.statusText}`);
    }
    const referenceData = await res.json();

    // Fetch quotes if they exist
    let quotes = [];
    if (referenceData.quotes) {
      quotes = await fetchQuotes(referenceData.quotes, baseUrl);
      quotes = quotes.filter(Boolean); // Remove any failed fetches (null values)
    }

    return {
      props: { referenceData, docsCatalog: referenceData.docs_catalog || null, quotes },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}




export default function ReferencePage({ referenceData, docsCatalog, quotes }) {
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
  const dateDebutFormatted = formatDate(dateDebutISO);

  const partnerDescription = referenceData['partner-description'];
  const partnerImage = referenceData['partner-image'];
  const partnerName = referenceData['partner-name'];
  // Supposons que teamImages et teamNames soient des tableaux correspondants

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
            <h3 className={styles.subtitle}>Contenus liés</h3>
            <FilteredDocsDisplay docsList={docsCatalog} />
          </div>
        )}
                {quotes.length > 0 && (
          <div className={styles.quotesSection}>
            <h3 className={styles.quotesSectionTitle}>📸 La presse en parle</h3>
            <div className={styles.quotesGrid}>
              {quotes.map((quote, index) => (
                <a key={index} href={quote.Link} className={styles.quoteCard}>
                  <img src={quote.journal_image} alt={quote.Journal} className={styles.quoteImage} />
                  <div className={styles.quoteContent}>
                    <h2 className={styles.quoteTitle}>{quote.Title}</h2>
                    <p className={styles.quoteDate}>⏱️ {formatDate(quote['Date published'])}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}
