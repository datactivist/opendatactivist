import React, { useEffect, useState } from 'react';
import styles from '../../styles/Authors.module.css';

const Authors = ({ authorIds, largeText = false, onAuthorClick = () => {} }) => {
  const [authorsData, setAuthorsData] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Ajouter ceci

  useEffect(() => {
    fetch('/sitedata/authors.json')
      .then(response => response.json())
      .then(data => {
        setAuthorsData(data);
        setIsLoading(false); 
      });
  }, []);

  const handleAuthorClick = (e, id) => {
    e.stopPropagation();
    onAuthorClick(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.authorsContainer}>
      {authorIds.map((id) => {
        const author = authorsData[id];
        if (author) {
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
                onClick={(e) => handleAuthorClick(e, id)}
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
