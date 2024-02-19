import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Authors.module.css';

const Partners = ({ partnersIds, largeText = false }) => {
  const [partnersData, setPartnersData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const validPartnersIds = Array.isArray(partnersIds) 
                            ? partnersIds 
                            : typeof partnersIds === 'string' 
                              ? partnersIds.split(',').map(id => id.trim()) 
                              : [];

  useEffect(() => {
    fetch('/sitedata/partners.json')
      .then(response => response.json())
      .then(data => {
        setPartnersData(data);
        setIsLoading(false);
      });
  }, []);

  const handlePartnerClick = (id) => {
    router.push(`/partners/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className={styles.partnerTitle}>Partenaire(s)</h2>
      <div className={styles.partnerDocContainer}>
        <div className={styles.authorsContainer}>
          {validPartnersIds.map((id) => {
            const partner = partnersData[id];
            if (partner) {
              return (
                <div 
                  key={id} 
                  className={`${styles.author} ${styles.partnerBox}`} 
                  onClick={() => handlePartnerClick(id)} // Déplacez onClick ici pour englober tout le conteneur
                  style={{ cursor: 'pointer' }} // Optionnel, pour montrer visuellement que c'est cliquable
                >
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className={styles.partnerImage}
                  />
                  <div
                    className={`${styles.partnerName} ${largeText ? styles.authorNameLarge : ''}`}
                  >
                    <div className={styles.partnerName}>
                    {partner.name}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );  
};

export default Partners;
