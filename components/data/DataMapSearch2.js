import React, { useState } from 'react';
import styles from '../../styles/DataMapTable2.module.css';

const DataMapSearch2 = ({ data, setData }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
  
      if (event.target.value !== '') {
        const filteredData = data.filter((row) =>
          ['data-label', 'data-description', 'data-tags', 'data-producer'].some((key) =>
            row[key].toLowerCase().includes(event.target.value.toLowerCase())
          )
        );
        setData(filteredData);
      } else {
        setData(data);
      }
    };
  
    return (
      <div className={styles.searchForm}>
        <input
          type="text"
          placeholder="Recherchez une donnée, un producteur, un mot clé..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchFormInput}
        />
        <button onClick={handleSearch} className={styles.searchFormButton}>Rechercher</button>
      </div>
    );
  };
  
  export default DataMapSearch2;