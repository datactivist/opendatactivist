import React, { useState } from 'react';
import TeamGallery from '../components/nav/TeamGallery';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import styles from '../styles/TeamGallery.module.css';

const TeamMapWithNoSSR = dynamic(
  () => import('../components/dataviz/TeamMap'),
  {
    ssr: false,
  },
);

const TeamPage = () => {
  const [viewMode, setViewMode] = useState('list');

  return (
    <Layout>
      <div className={styles.teamPage}>
      <h1 className={styles.teamPageTitle}>Notre équipe</h1>

      <div className={styles.switcherContainer}>
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
      </div>

      {viewMode === 'list' ? (
        <TeamGallery />
      ) : (
        <div className={styles.iframeContainer}>
          <TeamMapWithNoSSR />
        </div>
      )}
          </div>
    </Layout>
  );
};

export default TeamPage;
