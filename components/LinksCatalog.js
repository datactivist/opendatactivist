import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import linksMetadata from '../public/sitedata/links-catalog.json';
import styles from '../styles/Links.catalog.module.css';
import Cards from './nav/Cards';
import Gallery from './nav/Gallery';
import tagStyles from '../styles/Tags.module.css';
import SearchBar from './nav/SearchBar';

const LinksCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query.tag) {
      setTagFilter(decodeURIComponent(query.tag));
    } else {
      setTagFilter('');
    }
  }, [query]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLinks = linksMetadata.filter((link) => {
    const searchValue = searchTerm.toLowerCase();
    const tagMatch = tagFilter
      ? link.tags.some((tag) => tag.toLowerCase() === tagFilter.toLowerCase())
      : true;

    return (
      tagMatch &&
      (link.title.toLowerCase().includes(searchValue) ||
        link.description.toLowerCase().includes(searchValue) ||
        link.tags.some((tag) => tag.toLowerCase().includes(searchValue)))
    );
  });

  const handleCardClick = (linkId, tag) => {
    const link = filteredLinks.find((link) => link.id === linkId);
    console.log('link:', link);
    if (tag) {
      router.push(`/links?tag=${encodeURIComponent(tag)}`);
    } else if (link && link.url) {
      window.location.href = link.url;
    }
  };

  return (
    <div className={styles.container}>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      {tagFilter && (
        <div>
          <a className={tagStyles.tag} onClick={() => router.push('/links')}>
            {tagFilter}
          </a>
          <br />
          <br />
        </div>
      )}
      <Gallery>
        <Cards
          items={filteredLinks}
          onClick={(linkId, tag) => handleCardClick(linkId, tag)}
          tagRoute="links"
        />
      </Gallery>
    </div>
  );
};

export default LinksCatalog;
