import React from 'react';
import Layout from '../components/Layout';
import PartnerGallery from '../components/nav/PartnersGallery'; 
import styles from '../styles/Authors.module.css';

const PartnersPage = () => {
  return (
    <Layout>
        <h1 className={styles.partnerpageTitle}>Nos partenaires</h1>
      <PartnerGallery />
    </Layout>
  );
};

export default PartnersPage;
