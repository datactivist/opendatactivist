import React, { useState, useEffect } from 'react';
import styles from '../../styles/Links.catalog.module.css';
import Gallery from '../nav/Gallery';
import Cards from '../nav/Cards';


const FilteredDocsDisplay = ({ docsList }) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchFilteredDocs = async () => {
      try {
        const response = await fetch(`/api/docs?action=list`);
        const data = await response.json();
        const filteredDocs = data.filter((doc) => docsList.includes(doc.name));
        setDocs(filteredDocs);
      } catch (error) {
        console.error('Erreur lors de la récupération des documents filtrés:', error);
      }
    };

    fetchFilteredDocs();
  }, [docsList]);

  const handleCardClick = (docName) => {
    window.open(`/docs/${docName}`, '_blank');
  };

  return (
    <div
      style={{
        backgroundColor: '#f8f8f8',
        padding: '1rem',
        borderRadius: '10px',
        marginTop: '10px',
        marginBottom: '10px',
      }}
    >
      <Gallery>
      <Cards items={docs} onClick={handleCardClick} showTags={false} />
      </Gallery>
    </div>
  );
};

export default FilteredDocsDisplay;
