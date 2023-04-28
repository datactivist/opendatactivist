import React from 'react';
import styles from '../../styles/Cards.module.css';
import { useRouter } from 'next/router';
import tagStyles from '../../styles/Tags.module.css';

const renderTagButtons = (tags, tagRoute) => {
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
    noTags = false, // défaut à false
    renderItem = (item) => (
      <>
        <div>
          {item.metadata?.image && (
            <div href={`/docs/${item.name}`}>
              <img
                src={item.metadata.image}
                alt={item.metadata.title}
                className={styles['card-image']}
              />
            </div>
          )}
        </div>
        <h2 href={`/docs/${item.name}`}>{item.metadata ? item.metadata.title : item.title}</h2>
        <p>{item.metadata ? item.metadata.description : item.description}</p>
        {!noTags && renderTagButtons(item.metadata?.tags || item.tags, tagRoute)}
      </>
    ),
  }) => {
    const handleClick = (item) => {
      onClick(item.name);
    };
  
    return (
      <>
        {items.map((item) => (
          <div key={item.id} className={styles.card} onClick={() => handleClick(item)}>
            {renderItem(item)}
          </div>
        ))}
      </>
    );
  };
  
  

export default Cards;
