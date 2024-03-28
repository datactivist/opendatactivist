import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/LinksCatalog.module.css';
import SearchBar from './nav/SearchBar';

const LinksCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [linksMetadata, setLinksMetadata] = useState([]);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    fetch('/api/links?action=list')
      .then(response => response.json())
      .then(data => {
        setLinksMetadata(data);
      });

    if (query.tag) {
      setSearchTerm(decodeURIComponent(query.tag));
    }
  }, [query]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (!event.target.value) {
      router.push('/links'); // Reset to default view when search is cleared
    }
  };

  const filteredLinks = linksMetadata.filter((link) => {
    const searchValue = searchTerm.toLowerCase();
    const tagsArray = link.tags.split(',').map(tag => tag.trim());
    return (
      link.title.toLowerCase().includes(searchValue) ||
      link.description.toLowerCase().includes(searchValue) ||
      tagsArray.some((tag) => tag.toLowerCase().includes(searchValue))
    );
  });

  const handleCardClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer'); // Opens the link in a new tab or window
  };
  

  const handleTagClick = (e, tag) => {
    e.stopPropagation(); // Prevents the click from being propagated to the card
    setSearchTerm(tag); // Update the search term to filter by the clicked tag
    router.push(`/links?tag=${encodeURIComponent(tag)}`); // Update the URL to reflect the filter
  };

  return (
    <div className={styles.container}>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className={styles.gallery}>
        {filteredLinks.map((link) => (
          <div key={link.id} className={styles.card} onClick={() => handleCardClick(link.url)}>
            <h3>{link.title}</h3>
            <p>{link.description}</p>
            <div className={styles.tags}>
              {link.tags.split(',').map((tag, index) => (
                <span key={index} className={styles.tag} onClick={(e) => handleTagClick(e, tag.trim())}>
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinksCatalog;
