import React from 'react';
import styles from '../../styles/Cards.module.css';
import { useRouter } from 'next/router';
import tagStyles from '../../styles/Tags.module.css';
import Authors from './Authors';

const RenderTagButtons = (tags, tagRoute) => {
  const router = useRouter();
  return tags ? tags.map((tag) => (
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
  showAuthors = true,
  renderItem = (item, onAuthorClick) => (
    <>
      {item.type === 'tod' ? (
        <div className={styles['title-container']}>
          <h3>💬 {item.title}</h3>
          <button
            onClick={() => window.open(item.url, '_blank')}
            className={styles['forum-button']}
          >
            Rejoindre la discussion
          </button>
        </div>
      ) : (
        <>
          {item.type !== 'livre' && item.metadata?.image && (
            <img
              src={item.metadata.image}
              alt={item.metadata.title}
              className={styles['card-image']}
            />
          )}
          <h3>{item.metadata?.title || item.title}</h3>
          {item.type === 'livre' ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles['card-image-link']}
                />
              )}
              <div style={{ flex: 1 }}>
                <p>{item.metadata?.description || item.description}</p>
              </div>
            </div>
          ) : (
            <p>{item.metadata?.description || item.description}</p>
          )}
          {showTags && RenderTagButtons(item.metadata?.tags || item.tags, tagRoute)}
          {showAuthors && item.metadata?.authors && (
            <Authors
              authorIds={item.metadata.authors}
              onAuthorClick={onAuthorClick}
              onlyDatactivist={true}
            />
          )}
          {showDate && item.metadata?.date && (
            <div className={styles.date}>
              <strong>⏱</strong> {formatDateToNow(item.metadata.date)}
            </div>
          )}
        </>
      )}
    </>
  ),
}) => {
  const router = useRouter();

  const handleCardClick = (item) => {
    if (item.url) {
      window.open(item.url, '_blank');
    } else {
      onClick(item.name);
    }
  };

  const handleAuthorClick = (authorId) => {
    router.push(`/docs?author=${encodeURIComponent(authorId)}`);
  };

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className={styles.card}
          onClick={() => handleCardClick(item)}
        >
          {renderItem(item, handleAuthorClick)}
        </div>
      ))}
    </>
  );
};

export default Cards;
