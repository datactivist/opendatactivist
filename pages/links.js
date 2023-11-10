import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import LinksCatalog from '../components/LinksCatalog';
import styles from '../styles/stories-catalog.module.css';

const LinksIndex = () => {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <Layout>
            <h1 className={styles.docspageTitle}>Ressources externes</h1>
      <LinksCatalog topicFilter={topic} />
    </Layout>
  );
};

export default LinksIndex;
