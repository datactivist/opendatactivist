import React from 'react';
import Layout from '../../components/Layout';
import CsvReader from '../../components/stories/CsvReader';
import MarkdownContent from '../../components/stories/MarkdownContent';
import TableAnalysis from '../../components/stories/TableAnalysis';
import Tabs from '../../components/stories/Tabs';
import '../../styles/Tabs.module.css';


const StoryDemo = () => {
  const tabs = [
    {
      title: 'Bienvenue',
      component: MarkdownContent,
      props: { filename: '/algo/intro' },
    },
    {
      title: 'Exemple de jeu de données',
      component: CsvReader,
      props: { filename: 'deniro' },
    },
    {
      title: 'Exemple analyse',
      component: TableAnalysis,
      props: { filename: 'deniro' },
    },
    {
        title: 'Un 4ème contenu',
        component: MarkdownContent,
        props: { filename: 'test2' },
    },
    {
        title: 'Tableau 5',
        component: CsvReader,
        props: { filename: 'deniro' },
    },
    {
        title: 'Contenu 6',
        component: MarkdownContent,
        props: { filename: 'test3' },
    },
  ];

  return (
    <Layout>
      <Tabs tabs={tabs} />
    </Layout>
  );
};

export default StoryDemo;
