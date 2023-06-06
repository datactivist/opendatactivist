import React, { useEffect, useState } from 'react';
import styles from '../../styles/Authors.module.css';

const Authors = ({ authorIds, largeText = false }) => {
    const [authorsData, setAuthorsData] = useState({});

  useEffect(() => {
    fetch('/sitedata/authors.json')
      .then(response => response.json())
      .then(data => setAuthorsData(data));
  }, []);

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
              <div className={`${styles.authorName} ${largeText ? styles.authorNameLarge : ''}`}>
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
