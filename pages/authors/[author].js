import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Authors.module.css';
import Cards from '../../components/nav/Cards';
import Gallery from '../../components/nav/Gallery';
import Layout from '../../components/Layout';

const AuthorPage = () => {
  const router = useRouter();
  const { author } = router.query;

  const [authorData, setAuthorData] = useState(null);
  const [authorDocs, setAuthorDocs] = useState([]);

  useEffect(() => {
    fetch(`/sitedata/authors.json`)
      .then(response => response.json())
      .then(data => {
        if (Object.prototype.hasOwnProperty.call(data, author)) {
          const authorInfo = data[author];
          setAuthorData(authorInfo);
        } else {
          setAuthorData(null);
        }
      });
  }, [author]);

  useEffect(() => {
    if (authorData) {
      fetch(`/api/docs?action=list`)
        .then(response => response.json())
        .then(data => {
          const docsByAuthor = data.filter(
            doc => doc.metadata.authors.includes(author)
          );
          setAuthorDocs(docsByAuthor);
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
          <h1 className={styles.h1Gray}>...Notre équipe</h1>
          <div className={styles.productBox}>
      <div className={styles.authorContainer}>
        <div className={styles.authorHeader}>
          <img src={authorData.image} alt={authorData.name} className={styles.authorImageLarge} />
          <div className={styles.authorInfo}>
            <h1>{authorData.name}</h1>
            <div className={styles.authorBio}>
              <p className={styles.authorBioText}/>
              <p>{authorData.bio}</p>
            </div>
          </div>
        </div>
        <br />
        <Gallery>
          <Cards items={authorDocs} onClick={(linkId) => router.push(`/docs/${linkId}`)} tagRoute="docs" showDate={false} showAuthors={false} />
        </Gallery>
      </div>
      </div>
    </Layout>
  );
};

export default AuthorPage;
