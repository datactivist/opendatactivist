import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/ReferencesPage.module.css';
import Layout from '../components/Layout';

const ReferencesPage = () => {
  const [references, setReferences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    fetch('/api/references?action=list')
      .then(response => response.json())
      .then(data => {
        const types = [...new Set(data.flatMap(reference => reference.type))];
        setUniqueTypes(types);
        setReferences(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch references:', error);
        setIsLoading(false);
      });
  }, []);

  const toggleFilter = (type) => {
    setSelectedType(selectedType === type ? null : type);
  };

  const filteredReferences = selectedType
    ? references.filter(reference => reference.type.includes(selectedType))
    : references;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className={styles.referencePageTitle}>Nos références</h1>
      <div className={styles.buttonContainer}> {/* Use buttonContainer for the div containing the buttons */}
        {uniqueTypes.map((type, index) => (
          <button
            key={index}
            onClick={() => toggleFilter(type)}
            className={selectedType === type ? `${styles.filterButton} ${styles.activeFilterButton}` : styles.filterButton} /* Use filterButton and conditionally activeFilterButton */
          >
            {type}
          </button>
        ))}
      </div>
      <div className={styles.referencesContainer}>
        {filteredReferences.map((reference) => (
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
