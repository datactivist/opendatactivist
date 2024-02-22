import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Authors.module.css';

const Partners = ({ partnersIds, largeText = false }) => {
  const [partnersData, setPartnersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validPartnersIds = Array.isArray(partnersIds) 
                            ? partnersIds 
                            : typeof partnersIds === 'string' 
                              ? partnersIds.split(',').map(id => id.trim()) 
                              : [];

  useEffect(() => {
    if (validPartnersIds.length > 0) {
      setIsLoading(true);
      Promise.all(
        validPartnersIds.map(id =>
          fetch(`/api/partners?id=${id}`)
            .then(response => response.json())
            .catch(error => console.error(`Error fetching partner ${id}:`, error))
        )
      ).then(partners => {
        setPartnersData(partners.filter(Boolean)); // Filtrez les réponses non valides ou les erreurs
        setIsLoading(false);
      });
    }
  }, [validPartnersIds]);

  const handlePartnerClick = (id) => {
    router.push(`/partners/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.authorsContainer}>
      {partnersData.map((partner) => (
        <div key={partner.id} className={`${styles.author} ${styles.partnerBox}`} onClick={() => handlePartnerClick(partner.id)}>
          <img
            src={partner.image}
            alt={partner.name}
            className={styles.partnerImage}
          />
          <div className={`${styles.partnerName} ${largeText ? styles.authorNameLarge : ''}`}>
            {partner.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Partners;
