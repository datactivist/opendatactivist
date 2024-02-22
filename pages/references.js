import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Assurez-vous d'importer Link de next/link
import styles from '../styles/ReferencesPage.module.css';
import Layout from '../components/Layout';

const ReferencesPage = () => {
  const [references, setReferences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/references?action=list')
      .then(response => response.json())
      .then(data => {
        setReferences(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch references:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className={styles.referencePageTitle}>Nos références</h1>
      <div className={styles.referencesContainer}>
        {references.map((reference) => (
          <Link key={reference.id} href={`/references/${reference.id}`} passHref>
            <div className={styles.referenceCard}>
              <h2 className={styles.referenceTitle}>{reference.title}</h2>
              <img src={`/images/references/${reference.id}.png`} alt={reference.title} className={styles.referenceImage} />
              <div className={styles.partnerLogos}>
                {reference['partner-image'].map((image, index) => (
                  <img key={index} src={image} alt={`Partner logo ${index + 1}`} className={styles.partnerLogo} />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default ReferencesPage;
