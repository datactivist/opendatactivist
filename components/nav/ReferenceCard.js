import React from 'react';
import Link from 'next/link';
import styles from '../../styles/ReferenceCard.module.css';

const ReferenceCard = ({ id, title, partnerNames, partnerImages }) => {
  return (
    <Link href={`/references/${id}`} passHref>
      <div className={styles.cardLink}>
        <div className={styles.card}>
          {partnerImages.map((image, index) => (
            <div key={index} className={styles.cardImageContainer}>
              <img src={image} alt={partnerNames[index]} className={styles.cardImage} />
            </div>
          ))}
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardPartnerName}>{partnerNames.join(', ')}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReferenceCard;
