import React from 'react';
import Layout from '../components/Layout';
import RoadmapComponent from '../components/docs/Roadmap';

const RoadmapPage = () => {
  // Rename the page function
  return (
    <Layout>
      <h1>Nos prochains contenus ouverts</h1>
      <RoadmapComponent />
    </Layout>
  );
};

export default RoadmapPage; // Rename the export
