import React from 'react';
import styles from '../../styles/Tags.module.css';

const Tags = ({ items = [], activeTags, setActiveTags }) => {
  const handleClick = (tag) => {
    setActiveTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const renderTagButtons = (tags) => {
    return tags.map((tag) => {
      const handleClick = () => {
        router.push(`/docs?tag=${encodeURIComponent(tag)}`);
      };
      return (
        <button key={tag} onClick={handleClick}>
          {tag}
        </button>
      );
    });
  };

  return (
    <div className={styles.tags}>
      {items &&
        items.map((tag) => (
          <button
            key={tag}
            className={`${styles.tag} ${
              activeTags.includes(tag) ? styles.active : ''
            }`}
            onClick={() => handleClick(tag)}
          >
            {tag}
          </button>
        ))}
    </div>
  );
};

export default Tags;
