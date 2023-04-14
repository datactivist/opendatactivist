import React, { useState } from 'react';
import { useRouter } from 'next/router';
import productsMetadata from '../public/sitedata/products-catalog.json';
import styles from '../styles/stories-catalog.module.css';

const ProductsCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = productsMetadata.filter((product) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      product.title.toLowerCase().includes(searchValue) ||
      product.description.toLowerCase().includes(searchValue) ||
      product.topics.some((topic) => topic.toLowerCase().includes(searchValue))
    );
  });

  const currentDate = new Date();
  const publishedProducts = filteredProducts.filter((product) => new Date(product.public_date) <= currentDate);
  const upcomingProducts = filteredProducts.filter((product) => new Date(product.public_date) > currentDate);

  const handleCardClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  function formatDate(dateString) {
    const options = { month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }


  return (
    <div className={styles.container}>
      <h1>Catalogue des Produits</h1>
      <br></br>
      <input
        className={styles.search}
        type="search"
        placeholder="Recherche"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className={styles.gallery}>
        {publishedProducts.map((product) => (
          <div
            key={product.id}
            className={styles['story-card']}
            onClick={() => handleCardClick(product.id)}
          >
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <br></br>
            <p>🗓 {formatDate(product.public_date)}</p>
            <div>
        {product.topics.map((topic, index) => (
          <span key={index} className={styles.topic}>
            {topic}
          </span>
        ))}
      </div>
          </div>
        ))}
      </div>
      <br></br>
      <h2>Prochainement accessibles</h2>
<div className={styles.roadmap}>
  {upcomingProducts.map((product) => (
    <div key={product.id} className={styles['roadmap-item']}>
      <div className={styles['timeline-marker']}></div>
      <div className={styles['roadmap-content']}>
        <h3>{product.title}</h3>
        <p>{formatDate(product.public_date)}</p>
      </div>
    </div>
  ))}
</div>


    </div>
  );
};

export default ProductsCatalog;
