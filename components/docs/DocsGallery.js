import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cards from '../nav/Cards';
import Gallery from '../nav/Gallery';
import SearchBar from '../nav/SearchBar';
import TypeFilter from '../nav/TypeFilter';
import styles from '../../styles/Tags.module.css';
import ListView from '../nav/ListView';
import Image from 'next/image';
import authorsData from '../../public/sitedata/authors.json';

const DocsGallery = () => {
  const router = useRouter();
  const { query } = router;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [docsMetadata, setDocsMetadata] = useState([]);
  const [viewMode, setViewMode] = useState('gallery');

  const sanitizeType = (type) => {
    let sanitized = decodeURIComponent(type)
      .replace(/[\u200D]/gu, '') 
      .replace(/[\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/[^a-z0-9-]/gi, '-') 
      .replace(/-+/g, '-') 
      .toLowerCase()
      .trim();
  
    if (sanitized.startsWith('-')) {
      sanitized = sanitized.substring(1);
    }
  
    return sanitized;
  };
  
  

  useEffect(() => {
    const fetchDocsMetadata = async () => {
      try {
        const response = await fetch('/api/docs?action=list');
        const data = await response.json();
        setDocsMetadata(data.filter((doc) => doc.metadata.index !== 0));
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des métadonnées des documents',
          error,
        );
      }
    };
    fetchDocsMetadata();
  }, []);

  useEffect(() => {
    if (query.tag) {
      setSelectedTag(decodeURIComponent(query.tag));
    } else {
      setSelectedTag('');
    }

    if (query.type) {
      setSelectedType(decodeURIComponent(query.type));
    } else {
      setSelectedType('');
    }

    if (query.author) {
      setSelectedAuthor(decodeURIComponent(query.author));
    } else {
      setSelectedAuthor('');
    }
  }, [query]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeFilter = (event) => {
    const cleanType = sanitizeType(event.target.value);
    setSelectedType(cleanType);
    let newUrl = `/docs?type=${encodeURIComponent(cleanType)}`;
    if (query.tag) {
      newUrl += `&tag=${encodeURIComponent(query.tag)}`;
    }
    router.push(newUrl, undefined, { shallow: true });
  };
  

  const navigateToRoadmap = () => {
    router.push('/roadmap'); // Assuming you have a /roadmap route.
  };

  const navigateToTags = () => {
    router.push('/tags'); // Assuming you have a /roadmap route.
  };

  const getUniqueTypes = () => {
    const allTypes = docsMetadata.map((doc) => doc.metadata.type);
    return Array.from(new Set(allTypes));
  };

  const filteredDocs = docsMetadata.filter((doc) => {
    const searchValue = searchTerm.toLowerCase();
    const typeMatch = selectedType ? sanitizeType(doc.metadata.type) === selectedType : true;
    const tagUrl = query.tag ? doc.metadata.tags.includes(query.tag) : true;
    const typeUrl = query.type ? sanitizeType(doc.metadata.type).includes(sanitizeType(query.type)) : true;
    const authorMatch = selectedAuthor
      ? doc.metadata.authors.includes(selectedAuthor)
      : true;

    return (
      typeMatch &&
      typeUrl &&
      tagUrl &&
      authorMatch &&
      (doc.metadata.title.toLowerCase().includes(searchValue) ||
        doc.metadata.description.toLowerCase().includes(searchValue))
    );
  });

  const sortedDocs = filteredDocs.sort((docA, docB) => {
    const dateA = new Date(docA.metadata.date);
    const dateB = new Date(docB.metadata.date);
    return dateB - dateA;
  });

  const [selectedAuthorName, setSelectedAuthorName] = useState('');

  useEffect(() => {
    if (query.author) {
      setSelectedAuthor(decodeURIComponent(query.author));
      const authorId = decodeURIComponent(query.author);
      const authorName = authorsData[authorId].name; // Récupérer le nom de l'auteur à partir de l'ID
      setSelectedAuthorName(authorName);
    } else {
      setSelectedAuthor('');
      setSelectedAuthorName('');
    }
  }, [query]);

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
    router.push(`/docs/${docName}`, undefined, { shallow: true });
  };

  const handleTagDeselection = () => {
    router.push('/docs');
  };

  const handleAuthorDeselection = () => {
    router.push('/docs');
  };

  const handleAuthorClick = (authorId) => {
    router.replace(`/authors/${authorId}`);
  };

  return (
    <div>
      <h1>Tous nos contenus ouverts</h1>
      <div className="control-panel">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '20px',
          }}
        >
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
          <TypeFilter
            selectedType={selectedType}
            handleTypeFilter={handleTypeFilter}
            uniqueTypes={getUniqueTypes()}
          />
          <button onClick={navigateToTags} className={styles.customButton}>
            Tags
          </button>
          <button onClick={navigateToRoadmap} className={styles.customButton}>
            Roadmap
          </button>
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
        </div>
      </div>
      {selectedTag && (
        <div>
          <div className={styles.tagContainer}>
            <span className={styles.tag}>{selectedTag}</span>
            <button
              className={styles.closeButton}
              onClick={handleTagDeselection}
            >
              <Image
                src="/images/icons/close.svg"
                alt="Close"
                width={30}
                height={30}
                className={styles.closeIcon}
              />
            </button>
          </div>
          <br />
          <br />
        </div>
      )}
      {selectedAuthor && (
        <div>
          <div className={styles.tagContainer}>
            <span
              className={styles.tag}
              onClick={() => handleAuthorClick(selectedAuthor)}
            >
              {selectedAuthorName}
            </span>
            <button
              className={styles.closeButton}
              onClick={handleAuthorDeselection}
            >
              <Image
                src="/images/icons/close.svg"
                alt="Close"
                width={30}
                height={30}
                className={styles.closeIcon}
              />
            </button>
          </div>
          <br />
          <br />
        </div>
      )}
      {viewMode === 'list' ? (
        <ListView
          items={sortedDocs}
          onClick={(linkId, tag) => handleCardClick(linkId, tag)}
          tagRoute="docs"
        />
      ) : (
        <div style={{ width: '90%', margin: '0 auto' }}>
          <Gallery>
            <Cards
              items={sortedDocs}
              onClick={(linkId, tag) => handleCardClick(linkId, tag)}
              onAuthorClick={(authorId) => handleAuthorClick(authorId)}
              tagRoute="docs"
            />
          </Gallery>
        </div>
      )}
    </div>
  );
};

export default DocsGallery;
