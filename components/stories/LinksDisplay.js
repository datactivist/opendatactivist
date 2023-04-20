import React from 'react';
import linksMetadata from '../../public/sitedata/links-catalog.json';
import styles from '../../styles/links-catalog.module.css';

const LinksDisplay = ({ ids = [] }) => {
  const filteredLinks = linksMetadata.filter((link) => ids.includes(link.id));

  const handleCardClick = (linkId) => {
    window.open(filteredLinks.find((link) => link.id === linkId).url, '_blank');
  };

  return (
    <div className={styles.container}>
        <h2>Ressources utiles</h2>
        <br></br>
        <div className={styles.gallery} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {filteredLinks.map((link) => (
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

export default LinksDisplay;
