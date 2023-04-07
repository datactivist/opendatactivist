// pages/canvas/demo-canva.js
import React from 'react';
import Layout from '../../components/Layout';
import MarkdownContent from '../../components/canvas/MarkdownContent';
import StepNavigation from '../../components/canvas/StepNavigation';

const DemoCanvas = () => {
  return (
    <Layout>
      <div id="step-0" className="page-break">
        <MarkdownContent filename="rawmd-demo" />
        <StepNavigation stepIndex={0} />
      </div>
      <div id="step-1" className="page-break">
        <MarkdownContent filename="autre-contenu" />
        <StepNavigation stepIndex={1} />
      </div>
    </Layout>
  );
};

export default DemoCanvas;
