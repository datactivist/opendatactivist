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
      <h1 className={styles.docspageTitle}>Tous nos contenus ouverts</h1>
      <DocsGallery topicFilter={topic} />
    </Layout>
  );
};

export default DocsIndex;
