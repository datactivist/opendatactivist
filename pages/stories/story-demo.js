import React from 'react';
import Layout from '../../components/Layout';
import CsvReader from '../../components/stories/CsvReader';
import MarkdownContent from '../../components/stories/MarkdownContent';
import TableAnalysis from '../../components/stories/TableAnalysis';
import Tabs from '../../components/stories/Tabs';
import Sidebar from '../../components/stories/Sidebar';
import DatagouvId from '../../components/stories/DatagouvId';
import DiscourseFrame from '../../components/stories/DiscourseFrame';
import LinksDisplay from '../../components/stories/LinksDisplay';
import JsonGallery from '../../components/stories/JsonGallery';


const StoryDemo = () => {

    const tabs = [
        {
            title: 'Bienvenue',
            section: 'Introduction',
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
            title: 'Datagouv',
            section: 'Déchiffrer les données',
            component: DatagouvId,
            props: { ids: ['5c4ae55a634f4117716d5656', '5b7ffc618b4c4169d30727e0', '5c34c4d1634f4173183a64f1', '5c34c4d1634f4173183a64f1'] },
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
        {
            title: 'Liens utiles',
            section: 'Autres ressources',
            component: LinksDisplay,
            props: { ids: ['dicosigles', 'referentiel-open-data'] },
        },
        {
            title: 'Un benchmark',
            section: 'Autres ressources',
            component: JsonGallery,
            props: { filename: 'benchmark-datalab' },
        },
        {
            title: 'Conversation',
            section: 'Conclusion',
            component: DiscourseFrame,
            props: { talkid: '1592' },
          },
    ];

    const sidebarData = {
        title: "Une démo de story",
        description: "Ceci est une description en une phrase de la story",
        public_date: "2023-03-30",
        topics: [
            "Algorithmes",
            "Commande publique",
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
                    <div style={{ marginLeft: "16rem" }}>
                        <Tabs tabs={tabs} />
                    </div>
                </div>
            </div>
        </Layout>



    );
    
};

export default StoryDemo;
