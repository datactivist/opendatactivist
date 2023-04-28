// components/nav/SearchBar.js
import React from 'react';
import styles from '../../styles/stories-catalog.module.css';

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <input
      className={styles.search}
      type="search"
      placeholder="Recherche"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
