import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/stories-catalog.module.css';

const DocsCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [docsMetadata, setDocsMetadata] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDocsMetadata = async () => {
      try {
        const response = await fetch('/api/docs?action=list');
        const data = await response.json();
        setDocsMetadata(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des métadonnées des documents', error);
      }
    };

    fetchDocsMetadata();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeFilter = (event) => {
    setSelectedType(event.target.value);
  };

  const getUniqueTypes = () => {
    const allTypes = docsMetadata.map((doc) => doc.metadata.type);
    return Array.from(new Set(allTypes));
  };

  const filteredDocs = docsMetadata.filter((doc) => {
    const searchValue = searchTerm.toLowerCase();
    const typeMatch = selectedType ? doc.metadata.type === selectedType : true;

    return (
      typeMatch &&
      (doc.metadata.title.toLowerCase().includes(searchValue) ||
        doc.metadata.description.toLowerCase().includes(searchValue))
    );
  });

  const handleCardClick = (docName) => {
    router.push(`/docs/${docName}`);
  };

  return (
    <div className={styles.container}>
      <h1>Catalogue des contenus</h1>
      <br></br>
      <br></br>
      <input
        className={styles.search}
        type="search"
        placeholder="Recherche"
        value={searchTerm}
        onChange={handleSearch}
      />
      <select value={selectedType} onChange={handleTypeFilter} className={styles['type-filter']}>
        <option value="">Tous les types</option>
        {getUniqueTypes().map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <div className={styles.gallery}>
        {filteredDocs.map((doc) => (
          doc.metadata.index !== 0 && (
            <div
              key={doc.name}
              className={styles['story-card']}
              onClick={() => handleCardClick(doc.name)}
            >
              {doc.metadata.image && (
                <img
                  src={doc.metadata.image}
                  alt={`Illustration pour ${doc.metadata.title}`}
                  className={styles['story-image']}
                />
              )}
              <h2>{doc.metadata.title}</h2>
              <p>{doc.metadata.description}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default DocsCatalog;
