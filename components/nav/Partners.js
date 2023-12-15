import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Authors.module.css';

const Partners = ({ partnersIds, largeText = false }) => {
  const [partnersData, setPartnersData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Ensure partnersIds are in array format
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
    <div className={styles.authorsContainer}>
      {validPartnersIds.map((id) => {
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
