import React, { useEffect, useState } from 'react';
import styles from '../../styles/BAuthors.module.css';

const Authors = ({ authorIds, largeText = false, onlyDatactivist = false, onAuthorClick = () => {} }) => {
  const [authorsData, setAuthorsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Process authorIds into an array
  const authorArray = typeof authorIds === 'string' ? authorIds.split(',').map(id => id.trim()) : authorIds;

  useEffect(() => {
    fetch('/sitedata/authors.json')
      .then(response => response.json())
      .then(data => {
        setAuthorsData(data);
        setIsLoading(false);
      });
  }, []);

  const handleAuthorClick = (event, id) => {
    event.stopPropagation();
    onAuthorClick(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.authorsContainer}>
      {authorArray.map((id) => {
        const author = authorsData[id];
        if (author && (!onlyDatactivist || author.organisation === 'datactivist')) {
          return (
            <div key={id} className={styles.author}>
              <img
                src={author.image}
                alt={author.name}
                className={styles.authorImage}
              />
              <div
                key={id}
                className={`${styles.authorName} ${largeText ? styles.authorNameLarge : ''}`}
                onClick={(event) => handleAuthorClick(event, id)}
              >
                {author.name}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Authors;
