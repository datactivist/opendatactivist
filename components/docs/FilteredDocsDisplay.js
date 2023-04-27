import React, { useState, useEffect } from 'react';
import styles from '../../styles/links-catalog.module.css';

const FilteredDocsDisplay = ({ docsList }) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchFilteredDocs = async () => {
      try {
        const response = await fetch(`/api/docs?action=list`);
        const data = await response.json();
        const filteredDocs = data.filter((doc) => docsList.includes(doc.name));
        setDocs(filteredDocs);
      } catch (error) {
        console.error('Erreur lors de la récupération des documents filtrés:', error);
      }
    };

    fetchFilteredDocs();
  }, [docsList]);

  const handleCardClick = (docName) => {
    window.open(`/docs/${docName}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#f8f8f8', padding: '1rem', borderRadius: '10px', marginTop: '10px', marginBottom: '10px' }}>
      <div className={styles.gallery} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        {docs.map((doc) => (
          <div
            key={doc.name}
            className={styles['link-card']}
            onClick={() => handleCardClick(doc.name)}
          >
            <div className={styles['image-container']}>
              {doc.metadata.image && (
                <img src={doc.metadata.image} alt={doc.metadata.title} style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }} />
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
  );
};

export default FilteredDocsDisplay;
