import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import StoriesCatalog from '../components/stories/StoriesCatalog';

const StoriesIndex = () => {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <Layout>
      <StoriesCatalog topicFilter={topic} />
    </Layout>
  );
};

export default StoriesIndex;
