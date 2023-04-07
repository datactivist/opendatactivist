// pages/canvas/demo-canva.js
import React from 'react';
import Layout from '../../components/Layout';
import MarkdownContent from '../../components/canvas/MarkdownContent';
import StepNavigation from '../../components/canvas/StepNavigation';
import CsvReader from '../../components/canvas/CsvReader';
import DatagouvId from '../../components/canvas/DatagouvId';


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
      <div id="step-2" className="page-break">
        <CsvReader filename="deniro" />
        <StepNavigation stepIndex={2} />
      </div>
      <div id="step-3" className="page-break">
      <DatagouvId ids={["5b7ffc618b4c4169d30727e0", "53699d0ea3a729239d205b2e"]} />
      <StepNavigation stepIndex={3} />
      </div>
    </Layout>
  );
};

export default DemoCanvas;
