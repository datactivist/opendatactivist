import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Gallery from '../nav/Gallery';
import SearchBar from '../nav/SearchBar';
import styles from '../../styles/Cards.module.css';
import productsMetadata from '../../public/sitedata/products-catalog.json';

const ProductsCatalog = () => {
  const router = useRouter();
  const { query } = router;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (query.topic) {
      router.push('/products'); 
    }
  }, [query.topic, router]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = productsMetadata.filter((product) => {
    const searchValue = searchTerm.toLowerCase();

    return (
      product.title.toLowerCase().includes(searchValue) ||
      product.description.toLowerCase().includes(searchValue)
    );
  });

  const handleCardClick = (product) => {
    const productUrl = `/products/${product.name}`; 
    window.open(productUrl, '_blank'); 
  };

  return (
    <div>
      <br/>
      <h1>Nos outils et produits</h1>
      <br />
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <Gallery>
        {filteredProducts.map((item) => (
          <div key={item.name} className={styles.card} onClick={() => handleCardClick(item)}>
            {item.image && <img src={item.image} alt={item.title} className={styles['card-image']} />}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </Gallery>
    </div>
  );
};

export default ProductsCatalog;
