import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import DocsCatalog from '../components/docs/DocsCatalog';

const DocsIndex = () => {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <Layout>
      <DocsCatalog topicFilter={topic} />
    </Layout>
  );
};

export default DocsIndex;
