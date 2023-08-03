// DataMapSearch.js
import React, { useState } from 'react';
import DataMapTable from './DataMapTable';
import styles from '../../styles/DataMapTable.module.css';

const DataMapSearch = () => {
    const [search, setSearch] = useState('');
  
    const handleInputChange = (event) => {
      setSearch(event.target.value);
    };
  
    const handleSearch = (event) => {
      event.preventDefault();
    };
  
    return (
      <div className={styles.container}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            placeholder="Recherchez une donnée, un producteur, un mot clé..."
          />
          <button type="submit">🔎 Rechercher</button>
        </form>
        <DataMapTable search={search} />
      </div>
    );
  };
  
  export default DataMapSearch;