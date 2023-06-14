import React, { useEffect, useState } from 'react';
import SearchBar from '../nav/SearchBar';
import JsonCard from './JsonCard';
import JsonDialog from './JsonDialog';
import styles from '../../styles/JsonGallery.module.css';
import Layout from '../Layout';

const JsonGallery = ({ filename }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/data/${filename}`);
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, [filename]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
  };

  const handleClose = () => {
    setSelectedCard(null);
  };

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const filteredData = Array.isArray(data)
    ? data.filter((item) => {
        const values = Object.values(item).join('').toLowerCase();
        return values.includes(searchTerm.toLowerCase());
      })
    : [];

  return (
    <Layout>
     <div className={`${styles.gallery} ${styles.container}`}>
      <div className={styles.header}>
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        </div>
        <div className={styles.galleryContainer}>
          {filteredData.slice(0, 1000).map((item, index) => (
            <JsonCard
              key={index}
              item={item}
              index={index}
              hoveredCard={hoveredCard}
              handleCardClick={handleCardClick}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
        {selectedCard && <JsonDialog selectedCard={selectedCard} handleClose={handleClose} />}
      </div>
    </Layout>
  );
};

export default JsonGallery;
