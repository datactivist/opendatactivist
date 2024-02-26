import React from 'react';
import styles from '../../styles/Cards.module.css';
import { useRouter } from 'next/router';
import tagStyles from '../../styles/Tags.module.css';
import Authors from './Authors';

const RenderTagButtons = (tags, tagRoute) => {
  const router = useRouter();

  // Split string into array if necessary
  const tagsArray = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags;

  return tagsArray && tagsArray.length > 0 ? tagsArray.map((tag) => (
    <button
      key={tag}
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/${tagRoute}?tag=${encodeURIComponent(tag)}`);
      }}
      className={tagStyles.tag}
    >
      {tag}
    </button>
  )) : null;
};

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

const Cards = ({
  items,
  onClick,
  tagRoute,
  showTags = true,
  showDate = true,
  showAuthors = true
}) => {
  console.log(onClick);
  const router = useRouter();

  const getImagePath = (item) => {
    if (item.image.startsWith('images/')) {
      return `/${item.image}`;
    } else if (item.productId) {
      return `/products/${item.image}`;
    } else if (item.url) {
      // Assuming images for links are located in the '/links' directory
      return `${item.image}`;
    } else {
      return item.image;
    }
  };

  const handleCardClick = (item) => {
    if (item.productId) {
      console.log(item.productId); // Log the productId for debugging
      router.push(`/products/${item.productId}`); // Navigate to the product page
    } else if (item.url) {
      // If it's a URL, open it in a new tab
      window.open(item.url, '_blank');
    } else {
      const docName = item['name'];
      if (docName) {
        router.push(`/docs/${docName}`);
      } else {
        console.error('Document name is undefined');
      }
    }
  };
  

  const handleAuthorClick = (authorId) => {
    router.push(`/docs?author=${encodeURIComponent(authorId)}`);
  };

  return (
    <>
       {items.map((item) => (
        <div
          key={item['name'] || item.productId || item.id}
          className={item.url ? `${styles.card} ${styles['card-link']}` : styles.card}
          onClick={() => handleCardClick(item)}
          style={{ position: 'relative' }}
        >
          {item.pin && (
            <img
              src="/icons/pin.png"
              alt="Pin"
              style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, height: '30px', width: 'auto' }}
            />
          )}
  
  {item.url ? (
            <div className={styles['card-link']}>
              {/* Image */}
              {item.image && (
                <img
                  src={getImagePath(item)}
                  alt={item.title}
                  className={styles['card-link-image']}
                />
              )}

              {/* Content */}
              <div className={styles['card-link-content']} style={item.type === 'tod' ? { flexGrow: 1 } : null}>
                <h3 style={item.type === 'tod' ? { flexGrow: 1 } : null}>{item.title}</h3>
                {/* "Rejoindre la discussion" button for items with type="tod" */}
                {item.type === 'tod' && (
                  <button
                    onClick={() => {/* Logic to handle button click */}}
                    className={styles['discussion-button']}
                  >
                    Rejoindre la discussion
                  </button>
                )}
                {item.type !== 'tod' && <p>{item.description}</p>}
                {item.type !== 'tod' && showTags && RenderTagButtons(item.tags, tagRoute)}
                {/* Tags, Authors, and Date */}
                {showTags && RenderTagButtons(item.tags, tagRoute)}
                {showAuthors && item.authors && (
                  <Authors
                    authorIds={item.authors}
                    onAuthorClick={handleAuthorClick}
                    onlyDatactivist={true}
                  />
                )}
                {showDate && item.date && (
                  <div className={styles.date}>
                    <strong>⏱</strong> {formatDateToNow(item.date)}
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Layout for non-link cards
            <>
              {item.image && (
                <img
                  src={getImagePath(item)}
                  alt={item.title}
                  className={styles['card-image']}
                />
              )}
  
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {/* Tags, Authors, and Date */}
              {showTags && RenderTagButtons(item.tags, tagRoute)}
              {showAuthors && item.authors && (
                <Authors
                  authorIds={item.authors}
                  onAuthorClick={handleAuthorClick}
                  onlyDatactivist={true}
                />
              )}
              {showDate && item.date && (
                <div className={styles.date}>
                  <strong>⏱</strong> {formatDateToNow(item.date)}
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </>
  );
  
};

export default Cards;

