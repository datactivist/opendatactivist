import React from 'react';
import Link from 'next/link';
import styles from '../../styles/ReferenceCard.module.css'; // Utilisez le même fichier CSS si les styles sont identiques

const ResearchCard = ({ id, title, partnerNames }) => {
  const imagePath = `/images/research/${id}.png`;

  return (
    <Link href={`/recherche/${id}`} passHref>
      <div className={styles.cardLink}> {/* Utilisez les mêmes classes que ReferenceCard */}
        <div className={styles.card}>
          <div className={styles.cardImageContainer}>
            <img src={imagePath} alt={`Image of ${title}`} className={styles.cardImage} />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{title}</h3>
            {partnerNames && <p className={styles.cardPartnerName}>{partnerNames.join(', ')}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResearchCard;
