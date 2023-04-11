import React from 'react';
import Layout from '../../components/Layout';
import CsvReader from '../../components/stories/CsvReader';
import MarkdownContent from '../../components/stories/MarkdownContent';
import TableAnalysis from '../../components/stories/TableAnalysis';
import Tabs from '../../components/stories/Tabs';
import Sidebar from '../../components/stories/Sidebar'; 

const StoryDemo = () => {

  const tabs = [
    {
      title: 'Bienvenue',
      section: 'Intro',
      component: MarkdownContent,
      props: { filename: '/algo/intro' },
    },
    {
      title: 'Exemple de jeu de données',
      section: 'Partie 1',
      component: CsvReader,
      props: { filename: 'deniro' },
    },
    {
      title: 'Exemple analyse',
      section: 'Partie 1',
      component: TableAnalysis,
      props: { filename: 'deniro' },
    },
    {
      title: 'Un 4ème contenu',
      section: 'Partie deux',
      component: MarkdownContent,
      props: { filename: 'test2' },
    },
    {
      title: 'Tableau 5',
      section: 'Déchiffrer les données',
      component: CsvReader,
      props: { filename: 'deniro' },
    },
    {
      title: 'Contenu 6',
      section: 'Déchiffrer les données',
      component: MarkdownContent,
      props: { filename: 'test3' },
    },
  ];

  const sidebarData = {
    title: "Une démo de story",
    topics: [
      "Algorithmes",
      "Commande publique",
      // Ajoutez d'autres topics ici
    ],
  };


  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <Sidebar sidebarData={sidebarData} />
        </div>
        <div className="col-md-9">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </Layout>
  );
};

export default StoryDemo;
