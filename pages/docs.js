import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import DocsGallery from '../components/docs/DocsGallery';
import styles from '../styles/stories-catalog.module.css';
const DocsIndex = () => {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <Layout>
      <div className={styles.docsPageContainer}>
      <h1 className={styles.docspageTitle}>Tous nos contenus ouverts</h1>
      <div className={styles.docsGallery}>
      <DocsGallery topicFilter={topic} />
      </div>
      </div>
    </Layout>
  );
};

export default DocsIndex;
