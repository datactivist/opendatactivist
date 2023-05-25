import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cards from '../nav/Cards';
import Gallery from '../nav/Gallery';
import SearchBar from '../nav/SearchBar';
import TypeFilter from '../nav/TypeFilter';
import styles from '../../styles/Tags.module.css';
import ListView from '../nav/ListView';
import Image from 'next/image';

const DocsGallery = () => {
  const router = useRouter();
  const { query } = router;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [docsMetadata, setDocsMetadata] = useState([]);
  const [viewMode, setViewMode] = useState('gallery');

  useEffect(() => {
    const fetchDocsMetadata = async () => {
      try {
        const response = await fetch('/api/docs?action=list');
        const data = await response.json();
        setDocsMetadata(data.filter((doc) => doc.metadata.index !== 0)); // filtrer les éléments dont l'index est égal à 0
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des métadonnées des documents',
          error,
        );
      }
    };

    fetchDocsMetadata();

    if (query.tag) {
      setSelectedTag(decodeURIComponent(query.tag));
    } else {
      setSelectedTag('');
    }
  }, [query]);

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
    const tagUrl = query.tag ? doc.metadata.tags.includes(query.tag) : true;
    const typeUrl = query.type ? doc.metadata.type.includes(query.type) : true;

    return (
      typeMatch &&
      typeUrl &&
      tagUrl &&
      (doc.metadata.title.toLowerCase().includes(searchValue) ||
        doc.metadata.description.toLowerCase().includes(searchValue))
    );
  });

  const sortedDocs = filteredDocs.sort((docA, docB) => {
    const dateA = new Date(docA.metadata.date);
    const dateB = new Date(docB.metadata.date);
    return dateB - dateA;
  });

  const toggleViewMode = () => {
    const newViewMode = viewMode === 'list' ? 'gallery' : 'list';
    setViewMode(newViewMode);
    localStorage.setItem('viewMode', newViewMode);
  };

  useEffect(() => {
    const localViewMode = localStorage.getItem('viewMode');
    if (localViewMode) {
      setViewMode(localViewMode);
    }
  }, []);

  const handleCardClick = (docName) => {
    router.push(`/docs/${docName}`);
  };

  return (
    <div>
      <br />
      <h1>Catalogue des contenus</h1>
      <br />
      <br />
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <TypeFilter
        selectedType={selectedType}
        handleTypeFilter={handleTypeFilter}
        uniqueTypes={getUniqueTypes()}
              />
              <button onClick={toggleViewMode} className={styles.toggleViewButton}>
            {viewMode === 'list' ? (
              <Image
                src="/icons/gallery.svg" 
                alt="Gallery View"
                width={34}
                height={34}
                className={styles.icon}
              />
            ) : (
              <Image
                src="/icons/list.svg" 
                alt="List View"
                width={34}
                height={34}
                className={styles.icon}
              />
            )}
          </button>
      {selectedTag && (
        <div>
          <a className={styles.tag} onClick={() => router.push('/docs')}>
            {selectedTag}
          </a>
          <br></br>
          <br></br>
        </div>
      )}
      {viewMode === 'list' ? (
      <ListView
        items={sortedDocs}
        onClick={(linkId, tag) => handleCardClick(linkId, tag)}
        tagRoute="docs"
      />
    ) : (
      <Gallery>
        <Cards
          items={sortedDocs}
          onClick={(linkId, tag) => handleCardClick(linkId, tag)}
          tagRoute="docs"
        />
      </Gallery>
    )}
  </div>
  );
};

export default DocsGallery;