import React from 'react';
import styles from '../../styles/Cards.module.css';
import { useRouter } from 'next/router';
import tagStyles from '../../styles/Tags.module.css';
import Authors from './Authors';

const RenderTagButtons = (tags, tagRoute) => {
  const router = useRouter();
  if (tags) {
    return tags.map((tag) => {
      const handleClick = (e) => {
        e.stopPropagation();
        router.push(`/${tagRoute}?tag=${encodeURIComponent(tag)}`);
      };
      return (
        <button key={tag} onClick={handleClick} className={tagStyles.tag}>
          {tag}
        </button>
      );
    });
  }
  return null;
};

const formatDateToNow = (dateString) => {
  const dateObj = new Date(dateString);
  const diffTime = Math.abs(new Date() - dateObj);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return diffMonths <= 1 ? 'il y a 1 mois' : `il y a ${diffMonths} mois`;
  } else {
    const diffYears = Math.floor(diffDays / 365);
    return diffYears <= 1 ? 'il y a 1 an' : `il y a ${diffYears} ans`;
  }
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
      <div>
        <div className={styles['title-container']}>
          <h3>
            💬 {item.title}
          </h3>
          <button 
            onClick={() => window.open(item.url, '_blank')} 
            className={styles['forum-button']}
          >
            Rejoindre la discussion
          </button>
        </div>
      </div>
    ) : (
        <>
          <div>
            {item.metadata?.image && (
              <img
                src={item.metadata.image}
                alt={item.metadata.title}
                className={styles['card-image']}
              />
            )}
          </div>
          <h3>
            {item.metadata ? item.metadata.title : item.title}
          </h3>
          <p>{item.metadata ? item.metadata.description : item.description}</p>
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
              <strong>⏱</strong>&nbsp;{formatDateToNow(item.metadata.date)}
            </div>
          )}
        </>
      )}
    </>
  ),
}) => {
  const router = useRouter();

  const handleClick = (item) => {
    if (item.url) {
      window.open(item.url, '_blank');
    } else {
      onClick(item.name);
    }
  };

  const handleAuthorClickInCard = (authorId) => {
    router.push(`/docs?author=${encodeURIComponent(authorId)}`);
  };

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className={styles.card}
          onClick={() => handleClick(item)}
        >
          {renderItem(item, handleAuthorClickInCard)}
        </div>
      ))}
    </>
  );
};

export default Cards;
