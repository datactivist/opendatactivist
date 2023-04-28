import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cards from '../nav/Cards';
import Gallery from '../nav/Gallery';
import SearchBar from '../nav/SearchBar';
import TypeFilter from '../nav/TypeFilter';
import styles from '../../styles/Tags.module.css';

const DocsGallery = () => {
  const router = useRouter();
  const { query } = router;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [docsMetadata, setDocsMetadata] = useState([]);

  useEffect(() => {
    const fetchDocsMetadata = async () => {
      try {
        const response = await fetch('/api/docs?action=list');
        const data = await response.json();
        setDocsMetadata(data.filter((doc) => doc.metadata.index !== 0)); // filtrer les éléments dont l'index est égal à 0
      } catch (error) {
        console.error('Erreur lors de la récupération des métadonnées des documents', error);
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
      <TypeFilter selectedType={selectedType} handleTypeFilter={handleTypeFilter} uniqueTypes={getUniqueTypes()} />
      {selectedTag && (
  <div>
    <a className={styles.tag} onClick={() => router.push('/docs')}>
      {selectedTag}
    </a>
    <br></br>
    <br></br>
  </div>
)}
      <Gallery>
      <Cards items={filteredDocs} onClick={(linkId, tag) => handleCardClick(linkId, tag)} tagRoute="docs" />
      </Gallery>
    </div>
  );
};

export default DocsGallery;
