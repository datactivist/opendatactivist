import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Authors.module.css';
import Cards from '../../components/nav/Cards';
import Gallery from '../../components/nav/Gallery';
import Layout from '../../components/Layout';
import ResearchCard from '../../components/nav/ResearchCard';
import { getItemById } from '../../utils/siteData';

const readJson = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
};

const AuthorPage = () => {
  const router = useRouter();
  const { author } = router.query;

  const [authorData, setAuthorData] = useState(undefined);
  const [partnerData, setPartnerData] = useState(null);
  const [authorDocs, setAuthorDocs] = useState([]);
  const [referencesDetails, setReferencesDetails] = useState([]);
  const [researchDetails, setResearchDetails] = useState([]);
  const [isAuthorLoading, setIsAuthorLoading] = useState(true);
  const [isAuthorMissing, setIsAuthorMissing] = useState(false);

  useEffect(() => {
    if (!author) return;

    setIsAuthorLoading(true);
    setIsAuthorMissing(false);
    setAuthorData(undefined);
    setPartnerData(null);

    fetch(`/sitedata/authors.json`)
      .then(readJson)
      .then((data) => {
        const authorInfo = getItemById(data, author);

        if (!authorInfo) {
          setAuthorData(null);
          setIsAuthorMissing(true);
          return;
        }

        setAuthorData(authorInfo);

        if (authorInfo.organisation && authorInfo.organisation !== 'datactivist') {
          fetch(`/sitedata/partners.json`)
            .then(readJson)
            .then((partners) => {
              setPartnerData(getItemById(partners, authorInfo.organisation));
            })
            .catch((error) => {
              console.error('Failed to fetch partner data:', error);
              setPartnerData(null);
            });
        }
      })
      .catch((error) => {
        console.error('Failed to fetch author data:', error);
        setAuthorData(null);
        setIsAuthorMissing(true);
      })
      .finally(() => {
        setIsAuthorLoading(false);
      });
  }, [author]);

  useEffect(() => {
    if (!author) return;

    fetch('/api/references?action=list')
      .then(readJson)
      .then((allReferences) => {
        const filteredReferences = allReferences.filter(
          (reference) => reference.team.includes(author)
        );
        setReferencesDetails(filteredReferences);
      })
      .catch((error) => {
        console.error('Failed to fetch references:', error);
      });

    fetch('/api/research-projects?action=list')
      .then(readJson)
      .then((allResearch) => {
        const filteredResearch = allResearch.filter(
          (research) => research.team.includes(author)
        );
        setResearchDetails(filteredResearch);
      })
      .catch((error) => {
        console.error('Failed to fetch research projects:', error);
      });

    if (authorData) {
      fetch('/api/docscatalog?action=metadatalist')
        .then(readJson)
        .then((data) => {
          const docsByAuthor = data.filter((doc) =>
            doc.authors
              .split(',')
              .map((authorId) => authorId.trim())
              .includes(author)
          );
          setAuthorDocs(docsByAuthor);
        })
        .catch((error) => {
          console.error('Failed to fetch author documents:', error);
        });
    }
  }, [author, authorData]);

  if (!author || isAuthorLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthorMissing || !authorData) {
    return <div>Auteur non trouvé</div>;
  }

  return (
    <Layout>
      <h1 className={styles.authorpageTitle}>
        {authorData.organisation === 'datactivist' ? (
          <Link href="/equipe" className={styles.authorPageLink}>
            ...Notre équipe
          </Link>
        ) : (
          '...Nos contributeurs'
        )}
      </h1>

      <div className={styles.authorBox}>
        <div className={styles.authorContainer}>
          <div className={styles.authorHeader}>
            <img
              src={authorData.image}
              alt={authorData.name}
              className={styles.authorImageLarge}
            />
            <div className={styles.authorInfo}>
              <h1>{authorData.name}</h1>
              {partnerData && (
                <Link href={`/partners/${authorData.organisation}`}>
                  <img
                    className={styles.partnerLogo}
                    src={partnerData.image}
                    alt={partnerData.name}
                  />
                </Link>
              )}
              <div className={styles.authorBio}>
                <p className={styles.authorBioText} />
                <p>{authorData.bio}</p>
              </div>
            </div>
            <div className={styles.authorContacts}>
              {authorData.linkedinUrl && (
                <a href={`https://linkedin.com/in/${authorData.linkedinUrl}`}>
                  <img src="/images/footer/linkedin.svg" alt="LinkedIn" />
                </a>
              )}
              {authorData.emailAddress && (
                <a href={`mailto:${authorData.emailAddress}`}>
                  <img src="/images/footer/mail.svg" alt="Email" />
                </a>
              )}
            </div>
          </div>
          {researchDetails.length > 0 && (
            <>
              <div className={styles.authorSectionTitle}>Projets de recherche</div>
              {researchDetails.map((research) => (
                <Gallery key={research.id}>
                  <ResearchCard
                    key={research.id}
                    id={research.id}
                    title={research.title}
                    partnerNames={research.partners.map((partner) => partner.name)}
                  />
                </Gallery>
              ))}
            </>
          )}

          {authorDocs.length > 0 && (
            <>
              <div className={styles.authorSectionTitle}>Publications</div>
              <Gallery>
                <Cards
                  items={authorDocs}
                  onClick={(linkId) => router.push(`/docs/${linkId}`)}
                  tagRoute="docs"
                  showDate={false}
                  showAuthors={false}
                />
              </Gallery>
            </>
          )}
        </div>
        {referencesDetails.length > 0 && (
          <div className={styles.referencesSection}>
            <div className={styles.authorSectionTitle}>Références</div>
            <div className={styles.referencesGallery}>
              {referencesDetails.map((reference, index) => (
                <Link key={index} href={`/references/${reference.id}`}>
                  <div className={styles.referenceCard}>
                    <h3 className={styles.referenceTitle}>{reference.title}</h3>
                    <div className={styles.partnerLogosContainer}>
                      {reference['partner-image'].map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={image}
                          alt={`Logo partenaire ${imgIndex + 1}`}
                          className={styles.partnerLogo}
                        />
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AuthorPage;
