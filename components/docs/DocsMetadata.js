import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import styles from '../../styles/DocsMetadata.module.css';
import Authors from '../nav/Authors';
import { useRouter } from 'next/router';

const DocsMetadata = ({ metadata }) => {
  const { type, tags, date, authors, license } = metadata;
  const router = useRouter();

  const sanitizeType = (type) => {
    let sanitized = decodeURIComponent(type)
      .replace(/[\u200D]/gu, '') 
      .replace(/[\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/[^a-z0-9-]/gi, '-') 
      .replace(/-+/g, '-') 
      .toLowerCase()
      .trim();
  
    if (sanitized.startsWith('-')) {
      sanitized = sanitized.substring(1);
    }
  
    return sanitized;
  };
  
  const handleAuthorClick = (authorId) => {
    router.push(`/authors/${authorId}`);
  };

  const handleTagClick = (tag) => {
    const url = `/docs?tag=${encodeURIComponent(tag)}`;
    window.open(url, '_blank');
  };

  const handleTypeClick = (type) => {
    const cleanType = sanitizeType(type);
    const url = `/docs?type=${encodeURIComponent(cleanType)}`;
    router.push(url);
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
        {type && (
          <p>
            <button
              className={styles.typeButton}
              onClick={() => handleTypeClick(type)}
            >
              {type}
            </button>
          </p>
        )}
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
      {authors && (
        <div className={styles.metadataRow}>
          <Authors
            authorIds={authors}
            largeText={true}
            onAuthorClick={handleAuthorClick}
            onlyDatactivist={false}
          />
        </div>
      )}
      {license === 'ccbysa' && (
        <div className={styles.metadataRow}>
          <div className={styles.ccBySaWrapper}>
            <img
              src="/images/icons/cc-by-sa.png"
              alt="cc-by-sa"
              className={styles.ccBySaImage}
            />
            <div className={styles.ccBySaLightbox}>
              🔄 Vous pouvez partager et adapter ce contenu librement, à
              condition de le créditer et de le partager sous une licence
              compatible.
            </div>
          </div>
        </div>
      )}
      <hr className={styles.separator} />
    </div>
  );
};

export default DocsMetadata;
