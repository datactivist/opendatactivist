// components/nav/TypeFilter.js
import React from 'react';
import styles from '../../styles/stories-catalog.module.css';

const TypeFilter = ({ selectedType, handleTypeFilter, uniqueTypes }) => {
  return (
    <select value={selectedType} onChange={handleTypeFilter} className={styles['type-filter']}>
      <option value="">Tous les types</option>
      {uniqueTypes.map((type, index) => (
        <option key={index} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default TypeFilter;
