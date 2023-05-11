import React from 'react';
import styles from '../../styles/Cards.module.css';
import { useRouter } from 'next/router';
import tagStyles from '../../styles/Tags.module.css';

const RenderTagButtons = (tags, tagRoute) => {
  const router = useRouter();
  if (tags) {
    return tags.map((tag) => {
      const handleClick = (e) => {
        e.stopPropagation(); // Ajouter ici
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

const Cards = ({
  items,
  onClick,
  tagRoute,
  showTags = true,
  renderItem = (item) => (
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
      <h3 href={`/docs/${item.name}`}>
        {item.metadata ? item.metadata.title : item.title}
      </h3>
      <p>{item.metadata ? item.metadata.description : item.description}</p>
      {showTags && RenderTagButtons(item.metadata?.tags || item.tags, tagRoute)}
    </>
  ),
}) => {
  const handleClick = (item) => {
    if (item.url) {
      window.open(item.url, '_blank');
    } else {
      onClick(item.name);
    }
  };

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className={styles.card}
          onClick={() => handleClick(item)}
        >
          {renderItem(item)}
        </div>
      ))}
    </>
  );
};

export default Cards;
