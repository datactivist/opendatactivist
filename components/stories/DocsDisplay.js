import React, { useState, useEffect } from 'react';
import styles from '../../styles/links-catalog.module.css';

const DocsDisplay = ({ ids }) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch('/api/docs?action=list');
        const data = await response.json();
        const filteredDocs = data.filter(doc => ids.includes(doc.name));
        setDocs(filteredDocs);
      } catch (error) {
        console.error('Erreur lors de la récupération des documents:', error);
      }
    };

    fetchDocs();
  }, [ids]);

  const handleCardClick = (docName) => {
    window.open(`/docs/${docName}`, '_blank');
  };

  return (
    <div className={styles.container}>
      <h2>Contenus utiles</h2>
      <br />
      <div className={styles['gallery-wrapper']}>
        <div className={styles.gallery} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {docs.map((doc) => (
            <div
              key={doc.name}
              className={styles['link-card']}
              onClick={() => handleCardClick(doc.name)}
            >
              <div className={styles['image-container']}>
                {doc.metadata.image && (
                  <img src={doc.metadata.image} alt={doc.metadata.title} />
                )}
              </div>
              <h2>{doc.metadata.title}</h2>
              <p>{doc.metadata.description}</p>
              <br />
              <div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocsDisplay;
