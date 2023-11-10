import React from 'react';
import Layout from '../components/Layout';
import ProductsCatalog from '../components/products/ProductsCatalog';
import styles from '../styles/stories-catalog.module.css';

const ProductIndex = () => {
  return (
    <Layout>
            <h1 className={styles.productspageTitle}>Nos produits & outils</h1>
      <ProductsCatalog />
    </Layout>
  );
};

export default ProductIndex;
