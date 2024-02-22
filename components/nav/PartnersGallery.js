import React, { useState, useEffect } from 'react';
import Gallery from '../nav/Gallery';
import styles from '../../styles/Cards.module.css';
import { useRouter } from 'next/router'; 

const PartnerGallery = () => {
  const [partnersData, setPartnersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // Mettez à jour l'URL pour pointer vers votre API /api/partners
    fetch('/api/partners')
      .then(response => response.json())
      .then(data => {
        // Comme l'API renvoie déjà un tableau, vous pouvez directement le stocker
        setPartnersData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch partners data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Étant donné que l'API renvoie déjà un tableau, vous n'avez plus besoin de convertir les données
  return (
    <div>
      <Gallery>
        {partnersData.map((partner) => (
          <div key={partner.id} className={`${styles.cardpartner} ${styles.centerContent}`} onClick={() => router.push(`/partners/${partner.id}`)}>
            <img src={partner.image} alt={partner.name} className={styles['card-image-partners']} />
          </div>
        ))}
      </Gallery>
    </div>
  );
};

export default PartnerGallery;
