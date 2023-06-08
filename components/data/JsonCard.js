import React from 'react';
import { Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import styles from '../../styles/JsonGallery.module.css';

const JsonCard = ({ item, index, hoveredCard, handleCardClick, handleMouseEnter, handleMouseLeave }) => {
  const isUrl = (value) => typeof value === 'string' && value.startsWith('http');

  return (
    <div className={styles.galleryItemWrapper}>
      <div
        className={`${styles.card} ${index === hoveredCard ? styles.cardHovered : ''}`}
        onClick={() => handleCardClick(item)}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.cardContent}>
          {Object.entries(item).slice(0, 3).map(([key, content], i) => (
            <div key={i} className={`${i === 0 ? styles.firstTitle : styles.content}`}>
              {i === 0 ? (
                <Typography className={styles.title} variant="h5" component="div">
                  <strong>{content}</strong>
                </Typography>
              ) : (
                <>
                <br></br>
                  <Typography variant="h7" component="div">
                    <strong>{key}</strong>
                  </Typography>
                  {isUrl(content) ? (
                    <Typography variant="body1" component="div">
                      <a href={content} target="_blank" rel="noopener noreferrer" className={styles.link}>
                        <LinkIcon style={{ verticalAlign: 'middle' }} /> Accéder au site
                      </a>
                    </Typography>
                  ) : (
                    <Typography variant="body1" component="div">
                      {content}
                    </Typography>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JsonCard;
