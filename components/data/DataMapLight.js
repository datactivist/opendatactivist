import React from 'react';
import DataMapCard from './DataMapCard';
import styles from '../../styles/DataMapGallery.module.css';

const DataMapLight = ({ data }) => {

  return (
        <div className={styles.galleryContainer}>
      {Array.isArray(data) && data.map((row, index) => (
        <DataMapCard key={index} data={row} />
      ))}
    </div> 
  );
};

export default DataMapLight;
