import React, { useState, useEffect } from 'react';
import styles from '../styles/links-catalog.module.css';

const FilteredLinksDisplay = ({ ids = [] }) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinksMetadata = async () => {
      try {
        const response = await fetch('/sitedata/links-catalog.json');
        const data = await response.json();
        const filteredLinks = data.filter((link) => ids.includes(link.id));
        setLinks(filteredLinks);
      } catch (error) {
        console.error('Erreur lors de la récupération des liens:', error);
      }
    };

    fetchLinksMetadata();
  }, [ids]);

  const handleCardClick = (linkId) => {
    window.open(links.find((link) => link.id === linkId).url, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#f8f8f8', padding: '1rem', borderRadius: '10px', marginTop: '10px', marginBottom :'10px' }}>
      <div className={styles.gallery} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        {links.map((link) => (
          <div
            key={link.id}
            className={styles['link-card']}
            onClick={() => handleCardClick(link.id)}
          >
            <h2>{link.title}</h2>
            <p>{link.description}</p>
            <br />
            <div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilteredLinksDisplay;
