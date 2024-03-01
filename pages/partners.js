import React, { useState } from 'react';
import Layout from '../components/Layout';
import PartnerGallery from '../components/nav/PartnersGallery';
import dynamic from 'next/dynamic';
import styles from '../styles/Authors.module.css'; // Assuming you want to reuse this or create a similar one for partners

const PartnersMapWithNoSSR = dynamic(
  () => import('../components/dataviz/PartnersMap'),
  {
    ssr: false,
  },
);

const PartnersPage = () => {
  const [viewMode, setViewMode] = useState('list');

  return (
    <Layout>
        <h1 className={styles.partnerpageTitle}>Nos partenaires</h1>

      <div className={styles.switcherContainer}>
        <button
          onClick={() => setViewMode('list')}
          className={`${styles.switchButton} ${
            viewMode === 'list' ? styles.active : ''
          }`}
        >
          Liste
        </button>
        <button
          onClick={() => setViewMode('map')}
          className={`${styles.switchButton} ${
            viewMode === 'map' ? styles.active : ''
          }`}
        >
          Cartographie
        </button>
      </div>

      {viewMode === 'list' ? (
        <div style={{ margin: '2rem' }}>
          <PartnerGallery />
        </div>
      ) : (
        <div className={styles.iframeContainer}> {/* You might need to adjust or add this CSS class for proper styling */}
          <PartnersMapWithNoSSR />
        </div>
      )}
    </Layout>
  );
};

export default PartnersPage
