import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import LinksCatalog from '../components/LinksCatalog';

const LinksIndex = () => {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <Layout>
      <LinksCatalog topicFilter={topic} />
    </Layout>
  );
};

export default LinksIndex;
