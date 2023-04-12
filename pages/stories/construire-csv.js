import React from 'react';
import Layout from '../../components/Layout';
import CsvReader from '../../components/stories/CsvReader';
import MarkdownContent from '../../components/stories/MarkdownContent';
import TableAnalysis from '../../components/stories/TableAnalysis';
import Tabs from '../../components/stories/Tabs';
import Sidebar from '../../components/stories/Sidebar';
import DatagouvId from '../../components/stories/DatagouvId';
import DiscourseFrame from '../../components/stories/DiscourseFrame';

const StoryDemo = () => {

    const tabs = [
        {
            title: 'Intro',
            section: 'Introduction',
            component: MarkdownContent,
            props: { filename: '/construirecsv/intro' },
        },
        {
            title: 'Pourquoi construire un CSV de qualité ?',
            section: 'Introduction',
            component: MarkdownContent,
            props: { filename: '/construirecsv/contexte' },
        },
        {
            title: 'Point de départ',
            section: 'Introduction',
            component: MarkdownContent,
            props: { filename: '/construirecsv/depart' },
        },
        {
            title: 'À ne pas faire n°1',
            section: '7 pratiques à éviter',
            component: MarkdownContent,
            props: { filename: '/construirecsv/1' },
        },
        {
            title: 'À ne pas faire n°2',
            section: '7 pratiques à éviter',
            component: MarkdownContent,
            props: { filename: '/construirecsv/2' },
        },
        {
            title: 'À ne pas faire n°3',
            section: '7 pratiques à éviter',
            component: MarkdownContent,
            props: { filename: '/construirecsv/3' },
        },
        {
            title: 'À ne pas faire n°4',
            section: '7 pratiques à éviter',
            component: MarkdownContent,
            props: { filename: '/construirecsv/4' },
        },
        {
            title: 'À ne pas faire n°5',
            section: '7 pratiques à éviter',
            component: MarkdownContent,
            props: { filename: '/construirecsv/5' },
        },
        {
            title: 'À ne pas faire n°6',
            section: '7 pratiques à éviter',
            component: MarkdownContent,
            props: { filename: '/construirecsv/6' },
        },
        {
            title: 'Transformer la structure',
            section: 'Résultat à obtenir',
            component: MarkdownContent,
            props: { filename: '/construirecsv/transformation' },
        },
        {
            title: 'Résumé des transformations',
            section: 'Résultat à obtenir',
            component: MarkdownContent,
            props: { filename: '/construirecsv/resume' },
        },
        {
            title: 'Exemple de CSV exploitable',
            section: 'Démo',
            component: TableAnalysis,
            props: { filename: 'deniro' },
        },
    ];

    const sidebarData = {
        title: "Construire un CSV de qualité",
        description: "Une méthode simple pour transformer un tableau excel en un CSV exploitable",
        public_date: "2023-04-12",
        topics: [
            "CSV",
            "Qualité",
            // Ajoutez d'autres topics ici
        ],
    };

    const sectionsData = Array.from(
        new Set(tabs.map((tab) => tab.section))
      ).map((section) => {
        const firstTabIndexInSection = tabs.findIndex((tab) => tab.section === section);
        return {
          section: section,
          anchor: tabs[firstTabIndexInSection].title.replace(/\s+/g, '-').toLowerCase(),
        };
      });      

      return (
        <Layout>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar sidebarData={sidebarData} sectionsData={sectionsData} tabs={tabs} />
                </div>
                <div className="col-md-9">
                    <div style={{ marginLeft: "8rem" }}>
                        <Tabs tabs={tabs} />
                    </div>
                </div>
            </div>
        </Layout>



    );
    
};

export default StoryDemo;
