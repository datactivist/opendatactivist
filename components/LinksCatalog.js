import React, { useState } from 'react';
import { useRouter } from 'next/router';
import linksMetadata from '../public/sitedata/links-catalog.json';
import styles from '../styles/Links.catalog.module.css';

const LinksCatalog = ({ topicFilter = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLinks = linksMetadata.filter((link) => {
    const searchValue = searchTerm.toLowerCase();
    const topicMatch = topicFilter
      ? link.topics.some((topic) => topic.toLowerCase() === topicFilter.toLowerCase())
      : true;

    return (
      topicMatch &&
      (link.title.toLowerCase().includes(searchValue) ||
        link.description.toLowerCase().includes(searchValue) ||
        link.topics.some((topic) => topic.toLowerCase().includes(searchValue)))
    );
  });

  const handleCardClick = (linkId) => {
    window.open(filteredLinks.find((link) => link.id === linkId).url, '_blank');
  };

  return (
    <div className={styles.container}>
      <h1>Catalogue des Liens</h1>
      <br />
      <input
        className={styles.search}
        type="search"
        placeholder="Recherche"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className={styles.gallery}>
        {filteredLinks.map((link) => (
          <div
            key={link.id}
            className={styles['link-card']}
            onClick={() => handleCardClick(link.id)}
          >
            <h2>{link.title}</h2>
            <p>{link.description}</p>
            <br />
            <div>
              {link.topics.map((topic, index) => (
                <span key={index} className={styles.topic}>
                  {topic}
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
