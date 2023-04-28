import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Gallery from '../nav/Gallery';
import SearchBar from '../nav/SearchBar';
import Cards from '../nav/Cards';
import productsMetadata from '../../public/sitedata/products-catalog.json';

const ProductsCatalog = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleCardClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div>
      <h1>Catalogue des produits et outils</h1>
      <br />
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <Gallery>
        <Cards items={filteredProducts} onClick={handleCardClick} />
      </Gallery>
    </div>
  );
};

export default ProductsCatalog;
