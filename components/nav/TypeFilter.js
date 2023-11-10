// components/nav/TypeFilter.js
import React from 'react';
import styles from '../../styles/stories-catalog.module.css';

const TypeFilter = ({ selectedType, handleTypeFilter, uniqueTypes }) => {
  return (
    <select
      value={selectedType}
      onChange={handleTypeFilter}
      className={styles['type-filter']}
    >
      <option value="">Toutes les catégories</option>
      {uniqueTypes.map((type, index) => (
        <option key={index} value={type}>
          {type === 'Formation' ? '🧑🏽‍🏫 ' : ''}
          {type === 'Atelier' ? '🎯 ' : ''}
          {type === 'Bibliographie' ? '📚 ' : ''}
          {type === 'Liste de ressources' ? '📋 ' : ''}
          {type === 'Guide' ? '📘 ' : ''}
          {type === 'Infographie' ? '📊 ' : ''}
          {type === 'Galerie d‘images' ? '📷 ' : ''}
          {type === 'Cas pratique' ? '🔎 ' : ''}
          {type}
        </option>
      ))}
    </select>
  );
};

export default TypeFilter;
