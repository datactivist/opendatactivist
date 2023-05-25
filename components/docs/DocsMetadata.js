import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import styles from '../../styles/DocsMetadata.module.css';

const DocsMetadata = ({ metadata }) => {
  const { type, tags, date } = metadata;

  const handleTagClick = (tag) => {
    const url = `/docs?tag=${encodeURIComponent(tag)}`;
    window.open(url, '_blank');
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return format(dateObj, 'd MMMM yyyy', { locale: fr });
  };

  return (
    <div className={styles.docsMetadata}>
      <div className={styles.metadataRow}>
        {date && (
          <p>
            <strong>🗓</strong>&nbsp;{formatDate(date)}
          </p>
        )}
        {date && type && <>&nbsp; &nbsp;|&nbsp; &nbsp;</>}
        <p>
          📕 {type}
        </p>
      </div>
      {tags && (
        <div className={styles.metadataRow}>
          {tags.map((tag) => (
            <button
              key={tag}
              className={styles.tagButton}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      <hr className={styles.separator} />
    </div>
  );
};

export default DocsMetadata;
