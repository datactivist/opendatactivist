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
            title: 'Conversation',
            section: 'Partie 1',
            component: DiscourseFrame,
            props: { talkid: '1592' },
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
