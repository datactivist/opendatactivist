import React from 'react';
import Link from 'next/link';
import styles from '../../styles/ReferenceCard.module.css';

const ReferenceCard = ({ id, title, partnerName, partnerImage }) => {
  return (
    <Link href={`/references/${id}`} passHref>
      <div className={styles.cardLink}> {/* Apply styles directly to this div */}
        <div className={styles.card}>
          <div className={styles.cardImageContainer}>
            <img src={partnerImage} alt={partnerName} className={styles.cardImage} />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardPartnerName}>{partnerName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReferenceCard;
