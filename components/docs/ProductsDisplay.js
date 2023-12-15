import React, { useState, useEffect } from 'react';
import Cards from '../nav/Cards';
import Gallery from '../nav/Gallery';

const ProductsDisplay = ({ ids = [] }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsMetadata = async () => {
      try {
        const response = await fetch('/sitedata/products-catalog.json');
        const data = await response.json();
        const filteredProducts = data.filter((product) => ids.includes(product.name));
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };

    fetchProductsMetadata();
  }, [ids]);

  const handleCardClick = (productId) => {
    const productUrl = `/products/${productId}`;
    window.open(productUrl, '_blank');
  };

  return (
    <div
      style={{
        backgroundColor: '#f8f8f8',
        padding: '1rem',
        borderRadius: '10px',
        marginTop: '10px',
        marginBottom: '10px',
      }}
    >
      <Gallery>
        <Cards
          items={products.map(product => ({ ...product, productId: product.name }))}
          onClick={handleCardClick}
          showTags={false}
          renderItem={(item) => (
            <div key={item.name} onClick={() => handleCardClick(item.name)}>
              {item.image && (
                <img
                  src={`/${item.image}`}
                  alt={item.title}
                  style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
                />
              )}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          )}
        />
      </Gallery>
    </div>
  );
};

export default ProductsDisplay;
