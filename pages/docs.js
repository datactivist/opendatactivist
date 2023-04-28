import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import DocsGallery from '../components/docs/DocsGallery';
const DocsIndex = () => {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <Layout>
      <DocsGallery topicFilter={topic} />
    </Layout>
  );
};

export default DocsIndex;
