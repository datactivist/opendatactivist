import React, { useState, useEffect } from 'react';
import Cards from '../nav/Cards';
import Gallery from '../nav/Gallery';

const FilteredLinksDisplay = ({ ids = [] }) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinksMetadata = async () => {
      try {
        // Modifier l'URL pour pointer vers l'API au lieu du fichier JSON local
        const response = await fetch('/api/links?action=list');
        const data = await response.json();
        // Filtrer les liens basés sur les ids reçus en props
        const filteredLinks = data.filter((link) => ids.includes(link.id));
        setLinks(filteredLinks);
      } catch (error) {
        console.error('Erreur lors de la récupération des liens:', error);
      }
    };

    fetchLinksMetadata();
  }, [ids]);

  const handleCardClick = (linkId) => {
    const link = links.find((l) => l.id === linkId);
    if (link && link.url) {
      window.open(link.url, '_blank');
    } else {
      console.error('URL not found for link:', linkId);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#f8f8f8',
        padding: '1rem',
        borderRadius: '6px',
        marginTop: '10px',
        marginBottom: '10px',
      }}
    >
      <Gallery>
        <Cards items={links} onClick={handleCardClick} showTags={false} />
      </Gallery>
    </div>
  );
};

export default FilteredLinksDisplay;
