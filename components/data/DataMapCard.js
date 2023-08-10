import React from 'react';
import styles from '../../styles/DataMapCard.module.css';

const DataMapCard = ({ data }) => {
  const producers = data['data-producer'].split(',');

  const getColorByLength = (length) => {
    if (length < 3) return '#eae4e9';
    if (length === 3) return '#fff1e6';
    if (length === 4) return '#fde2e4';
    if (length === 5) return '#fad2e1';
    if (length === 6) return '#e2ece9';
    if (length === 7) return '#bee1e6';
    if (length === 8) return '#f0efeb';
    if (length === 9) return '#caffbf';
    if (length === 10) return '#dfe7fd';
    if (length === 11) return '#cddafd';
    if (length === 12) return '#d7e1fd';
    if (length === 13) return '#f9c6c9';
    if (length === 14) return '#dbcdf0';
    if (length === 15) return '#c6def1';
    if (length === 16) return '#c9e4de';
    if (length === 17) return '#faedcb';
    return '#f5efe8'; 
  }; 

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{data['data-label']}</h3>
      <p className={styles.cardDescription}>{data['data-description']}</p>
      {data['data-url'] ? <a href={data['data-url']} className={styles.cardLink}>🔗 Voir les données</a> : null}
      <div>
        {producers.map((producer, index) => (
          <span key={index} className={styles.cardProducer}>{producer}</span>
        ))}
      </div>
      <div>
        {data['data-tags'].split(',').map((tag, index) => (
          <span 
            key={index} 
            className={styles.tag}
            style={{ backgroundColor: getColorByLength(tag.trim().length) }}>
            {tag.trim()}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DataMapCard;
