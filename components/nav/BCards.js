import React from 'react';
import styles from '../../styles/BCards.module.css';
import { useRouter } from 'next/router';
import BAuthors from './BAuthors';


const formatDateToNow = (dateString) => {
  const now = new Date();
  const pastDate = new Date(dateString);
  const diffTime = Math.abs(now - pastDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return diffMonths <= 1 ? 'il y a 1 mois' : `il y a ${diffMonths} mois`;
  }
  const diffYears = Math.floor(diffDays / 365);
  return diffYears <= 1 ? 'il y a 1 an' : `il y a ${diffYears} ans`;
};

const BCards = ({
  items,
  showDate = true,
  showAuthors = true
}) => {
  const router = useRouter();

  const getImagePath = (item) => {
    if (item.image.startsWith('images/')) {
      return `/${item.image}`;
    } else if (item.productId) {
      return `/products/${item.image}`;
    } else if (item.url) {
      return `${item.image}`;
    } else {
      return item.image;
    }
  };

  const handleCardClick = (item) => {
    const docName = item['name'];
    if (docName) {
      router.push(`/docs/${docName}`);
    } else {
      console.error('Document name is undefined');
    }
  };

  const handleAuthorClick = (authorId) => {
    router.push(`/authors/${encodeURIComponent(authorId)}`);
  };

  return (
    <>
      {items.map((item) => (
        <div
          key={item['name'] || item.productId || item.id}
          className={styles.card}
          onClick={() => handleCardClick(item)}
        >
          <div className={styles.cardContentWrapper}>
            {item.image && (
              <img
                src={getImagePath(item)}
                alt={item.title}
                className={styles.cardImage}
              />
            )}
            <div className={styles.cardContent}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {showAuthors && item.authors && (
                <BAuthors
                  authorIds={item.authors}
                  onAuthorClick={handleAuthorClick}
                />
              )}
              {showDate && item.date && (
                <div className={styles.date}>
                  <strong>⏱</strong> {formatDateToNow(item.date)}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BCards;
