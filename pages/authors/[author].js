import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Authors.module.css';
import Cards from '../../components/nav/Cards';
import Gallery from '../../components/nav/Gallery';
import Layout from '../../components/Layout';

const AuthorPage = () => {
  const router = useRouter();
  const { author } = router.query;

  const [authorData, setAuthorData] = useState(null);
  const [partnerData, setPartnerData] = useState(null);
  const [authorDocs, setAuthorDocs] = useState([]);

  useEffect(() => {
    fetch(`/sitedata/authors.json`)
      .then((response) => response.json())
      .then((data) => {
        if (Object.prototype.hasOwnProperty.call(data, author)) {
          const authorInfo = data[author];
          setAuthorData(authorInfo);
          if (authorInfo.organisation !== 'datactivist') {
            fetch(`/sitedata/partners.json`)
              .then((response) => response.json())
              .then((partnerData) => {
                setPartnerData(partnerData[authorInfo.organisation]);
              });
          }
        } else {
          setAuthorData(null);
        }
      });
  }, [author]);

  useEffect(() => {
    if (authorData) {
      fetch('/api/docscatalog?action=metadatalist')
        .then((response) => response.json())
        .then((data) => {
          // Split authors string into an array, and then check if it includes the current author
          const docsByAuthor = data.filter((doc) =>
            doc.authors
              .split(',')
              .map((author) => author.trim())
              .includes(author),
          );
          setAuthorDocs(docsByAuthor);
        })
        .catch((error) => {
          console.error(
            'Erreur lors de la récupération des documents de l‘auteur:',
            error,
          );
        });
    }
  }, [author, authorData]);

  if (authorData === null) {
    return <div>Auteur non trouvé</div>;
  }

  if (!authorData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className={styles.authorpageTitle}>
        {authorData.organisation === 'datactivist'
          ? '...Notre équipe'
          : '...Nos contributeurs'}
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
          <div className={styles.authorSectionTitle}>
            Liste des contributions
          </div>
          <Gallery>
            <Cards
              items={authorDocs}
              onClick={(linkId) => router.push(`/docs/${linkId}`)}
              tagRoute="docs"
              showDate={false}
              showAuthors={false}
            />
          </Gallery>
        </div>
      </div>
    </Layout>
  );
};

export default AuthorPage;
