import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Authors.module.css';

const Partners = ({ partnersIds, largeText = false }) => {
  const [partnersData, setPartnersData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Ajouter le hook useRouter
  const router = useRouter();

  useEffect(() => {
    fetch('/sitedata/partners.json')
      .then(response => response.json())
      .then(data => {
        setPartnersData(data);
        setIsLoading(false);
      });
  }, []);

  // Définir une fonction pour gérer le clic sur un partenaire
  const handlePartnerClick = (id) => {
    // Navigate to the partner page
    router.push(`/partners/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.authorsContainer}>
      {partnersIds.map((id) => {
        const partner = partnersData[id];
        if (partner) {
          return (
            <div key={id} className={`${styles.author} ${styles.partnerBox}`}>
              <img
                src={partner.image}
                alt={partner.name}
                className={styles.partnerImage}
              />
              <div
                key={id}
                className={`${styles.partnerName} ${largeText ? styles.authorNameLarge : ''}`}
                onClick={() => handlePartnerClick(id)}
              >
                {partner.name}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );  
};

export default Partners;
