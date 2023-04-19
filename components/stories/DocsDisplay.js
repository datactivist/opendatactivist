import React, { useState, useEffect } from 'react';
import styles from '../../styles/links-catalog.module.css';

const DocsDisplay = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch('/api/docs?action=list');
        const data = await response.json();
        setDocs(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des documents:', error);
      }
    };

    fetchDocs();
  }, []);

  const handleCardClick = (docName) => {
    window.open(`/docs/${docName}`, '_blank');
  };

  return (
    <div className={styles.container}>
      <h2>Contenus utiles</h2>
      <br />
      <div className={styles.gallery}>
        {docs.map((doc) => (
          <div
            key={doc.name}
            className={styles['link-card']}
            onClick={() => handleCardClick(doc.name)}
          >
            <h2>{doc.metadata.title}</h2>
            <p>{doc.metadata.description}</p>
            <br />
            <div>
              {doc.metadata.tags.map((tags, index) => (
                <span key={index} className={styles.topic}>
                  {tags}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocsDisplay;
