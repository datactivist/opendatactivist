import React, { useState, useEffect } from 'react';
import Gallery from '../nav/Gallery';
import styles from '../../styles/Cards.module.css';
import { useRouter } from 'next/router'; 

const PartnerGallery = () => {
  const [partnersData, setPartnersData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/sitedata/partners.json')
      .then(response => response.json())
      .then(data => {
        setPartnersData(data);
        setIsLoading(false);
      });
  }, []);

  const router = useRouter();

  useEffect(() => {
    fetch('/sitedata/partners.json')
      .then(response => response.json())
      .then(data => {
        setPartnersData(data);
        setIsLoading(false);
      });
  }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  const partnersArray = Object.entries(partnersData).map(([id, partner]) => ({id, ...partner}));

  return (
    <div>
      <Gallery>
        {partnersArray.map((partner) => (
        <div key={partner.id} className={`${styles.cardpartner} ${styles.centerContent}`} onClick={() => router.push(`/partners/${partner.id}`)}>
        <img src={partner.image} alt={partner.name} className={styles['card-image-partners']} />
        </div>
        ))}
      </Gallery>
    </div>
  );
};

export default PartnerGallery;
