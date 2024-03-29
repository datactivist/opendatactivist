import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/LinksCatalog.module.css';

const LinksCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [linksMetadata, setLinksMetadata] = useState([]);
  const [uniqueVerticales, setUniqueVerticales] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagsSearchTerm, setTagsSearchTerm] = useState(''); // Ajout d'un état pour la recherche dans les tags
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    fetch('/api/links?action=list')
      .then(response => response.json())
      .then(data => {
        setLinksMetadata(data);

        const verticalesSet = new Set(data.map(link => link.verticale).filter(verticale => verticale));
        setUniqueVerticales([...verticalesSet]);

        const tagsSet = new Set(data.flatMap(link => link.tags.split(',').map(tag => tag.trim())));
        setUniqueTags([...tagsSet]);
      });

    if (query.tag) {
      setSearchTerm(decodeURIComponent(query.tag));
    }
  }, [query]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (!event.target.value) {
      router.push('/links');
    }
  };

  const handleVerticaleClick = (verticale) => {
    if (query.verticale === verticale) {
      router.push('/links');
    } else {
      router.push(`/links?verticale=${encodeURIComponent(verticale)}`);
    }
  };

  const toggleTagSelection = (tag) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag) // Remove the tag from the selection
        : [...prevTags, tag] // Add the tag to the selection
    );
  };

  // Adjusted filter logic to be exclusive
  const filteredLinks = linksMetadata.filter((link) => {
    const searchValue = searchTerm.toLowerCase();
    const tagsArray = link.tags.split(',').map(tag => tag.trim());
    const matchesSearchTerm =
      link.title.toLowerCase().includes(searchValue) ||
      link.description.toLowerCase().includes(searchValue) ||
      tagsArray.some(tag => tag.toLowerCase().includes(searchValue));
    const matchesVerticale = query.verticale ? link.verticale === query.verticale : true;
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => tagsArray.includes(tag)); // Change to 'every' for exclusivity
    return matchesSearchTerm && matchesVerticale && matchesTags;
  });

  const filteredTags = uniqueTags.filter(tag => tag.toLowerCase().includes(tagsSearchTerm.toLowerCase()));


  return (
    <div className={styles.container}>
      {/* Conteneur pour la recherche et les tags, affichés côte à côte */}
      <div className={styles.searchAndTags}>
        {/* Conteneur de la barre de recherche */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className={styles.clearSearchButton}
            >
              &#x2715; {/* Symbole pour effacer la recherche */}
            </button>
          )}
        </div>
  
        <div className={styles.tagsDropdown}>
          <div className={styles.dropdownHeader}>☑︎ Filtrer les sujets</div>
          <div className={styles.dropdownContent}>
            <input
              type="text"
              placeholder="Rechercher un sujet..."
              value={tagsSearchTerm}
              onChange={(e) => setTagsSearchTerm(e.target.value)}
              className={styles.tagsSearchInput}
            />
            {filteredTags.map((tag, index) => (
              <label key={index} className={styles.dropdownLabel}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleTagSelection(tag)}
                  className={styles.dropdownCheckbox}
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
  
      {/* Affichage des verticales et des cartes inchangé */}
      <div className={styles.verticales}>
        {uniqueVerticales.map((verticale, index) => (
          <button
            key={index}
            className={`${styles.verticaleButton} ${query.verticale === verticale ? styles.activeVerticaleButton : ''}`}
            onClick={() => handleVerticaleClick(verticale)}
          >
            {verticale}
          </button>
        ))}
      </div>
      <div className={styles.gallery}>
        {filteredLinks.map((link) => (
          <div
            key={link.id}
            className={styles.card}
            onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
          >
            <h3>{link.title}</h3>
            <p>{link.description}</p>
            <div className={styles.tags}>
              {link.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className={styles.tag}
                >
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
