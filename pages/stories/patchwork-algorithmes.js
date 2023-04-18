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


const PatchworkAlgorithmes = () => {

    const tabs = [
        {
            title: 'Bienvenue',
            section: 'Introduction',
            component: MarkdownContent,
            props: { filename: '/algo/intro' },
        },
        {
            title: 'Etape 1',
            section: 'Etape 1 - Cadrer le projet',
            component: MarkdownContent,
            props: { filename: 'algo/1-intro' },
        },
        {
            title: '1.1',
            section: 'Etape 1 - Cadrer le projet',
            component: MarkdownContent,
            props: { filename: 'algo/1-1-intro' },
        },
        {
            title: '1.1. Définir son projet',
            section: 'Etape 1 - Cadrer le projet',
            component: MarkdownContent,
            props: { filename: 'algo/1-1-definir-projet' },
        },
        {
            title: '1.2',
            section: 'Etape 1 - Cadrer le projet',
            component: MarkdownContent,
            props: { filename: 'algo/1-2-intro' },
        },
        {
            title: '1.2. Choisir son projet',
            section: 'Etape 1 - Cadrer le projet',
            component: MarkdownContent,
            props: { filename: 'algo/1-2-choisir-projet' },
        },
        {
            title: '1.3',
            section: 'Etape 1 - Cadrer le projet',
            component: MarkdownContent,
            props: { filename: 'algo/1-3-intro' },
        },
        {
            title: '1.3 - Valider le projet',
            section: 'Etape 1 - Cadrer le projet',
            component: MarkdownContent,
            props: { filename: 'algo/1-3-valider-projet' },
        },
        {
            title: 'Etape 2',
            section: 'Etape 2 - Rassembler une équipe',
            component: MarkdownContent,
            props: { filename: 'algo/2-intro' },
        },
        {
            title: '2.1',
            section: 'Etape 2 - Rassembler une équipe',
            component: MarkdownContent,
            props: { filename: 'algo/2-1-intro' },
        },
        {
            title: '2.1 - Constituer son équipe',
            section: 'Etape 2 - Rassembler une équipe',
            component: MarkdownContent,
            props: { filename: 'algo/2-1-constituer-equipe' },
        },
        {
            title: '2.2 - Choisir les services impliqués',
            section: 'Etape 2 - Rassembler une équipe',
            component: MarkdownContent,
            props: { filename: 'algo/2-2-choisir-services' },
        },
        {
            title: 'Etape 3',
            section: 'Etape 3 - Acculturer',
            component: MarkdownContent,
            props: { filename: 'algo/3-intro' },
        },
        {
            title: '3-1',
            section: 'Etape 3 - Acculturer',
            component: MarkdownContent,
            props: { filename: 'algo/3-1-intro' },
        },
        {
            title: '3-1 - Connaître votre équipe',
            section: 'Etape 3 - Acculturer',
            component: MarkdownContent,
            props: { filename: 'algo/3-1-connaitre-equipe' },
        },
        {
            title: '3-2',
            section: 'Etape 3 - Acculturer',
            component: MarkdownContent,
            props: { filename: 'algo/3-2-intro' },
        },
        {
            title: '3-2 - Parcours d‘acculturation',
            section: 'Etape 3 - Acculturer',
            component: MarkdownContent,
            props: { filename: 'algo/3-2-exemple-parcours' },
        },
        {
            title: 'Etape 4',
            section: 'Etape 4 - Identifier les algorithmes',
            component: MarkdownContent,
            props: { filename: 'algo/4-intro' },
        },
        {
            title: '4-1',
            section: 'Etape 4 - Identifier les algorithmes',
            component: MarkdownContent,
            props: { filename: 'algo/4-1-intro' },
        },
        {
            title: '4-1 - Créer l‘inventaire',
            section: 'Etape 4 - Identifier les algorithmes',
            component: MarkdownContent,
            props: { filename: 'algo/4-1-creer-inventaire' },
        },
        {
            title: '4-2',
            section: 'Etape 4 - Identifier les algorithmes',
            component: MarkdownContent,
            props: { filename: 'algo/4-2-intro' },
        },
        {
            title: '4-2 - Chercher les algorithmes',
            section: 'Etape 4 - Identifier les algorithmes',
            component: MarkdownContent,
            props: { filename: 'algo/4-2-chercher-algorithmes' },
        },
        {
            title: 'Etape 5',
            section: 'Etape 5 - Publier le registre',
            component: MarkdownContent,
            props: { filename: 'algo/5-intro' },
        },
        {
            title: '5-1',
            section: 'Etape 5 - Publier le registre',
            component: MarkdownContent,
            props: { filename: 'algo/5-1-intro' },
        },
        {
            title: '5-1 - Produire le registre',
            section: 'Etape 5 - Publier le registre',
            component: MarkdownContent,
            props: { filename: 'algo/5-1-produire-registre' },
        },
        {
            title: '5-2',
            section: 'Etape 5 - Publier le registre',
            component: MarkdownContent,
            props: { filename: 'algo/5-2-intro' },
        },
        {
            title: '5-2 - Remplir le registre',
            section: 'Etape 5 - Publier le registre',
            component: MarkdownContent,
            props: { filename: 'algo/5-2-remplir-registre' },
        },
        {
            title: '5-3',
            section: 'Etape 5 - Publier le registre',
            component: MarkdownContent,
            props: { filename: 'algo/5-3-intro' },
        },
        {
            title: '5-3 - Diffuser le registre',
            section: 'Etape 5 - Publier le registre',
            component: MarkdownContent,
            props: { filename: 'algo/5-3-diffuser-registre' },
        },
    ];

    const sidebarData = {
        title: "Comment ouvrir des algorithmes publics ?",
        description: "Un parcours d'accompagnement de bout-en-bout pour construire et publier votre registre des algorithmes publics",
        public_date: "2023-04-18",
        topics: [
            "Algorithmes",
            "Acteurs publics",
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

export default PatchworkAlgorithmes;
