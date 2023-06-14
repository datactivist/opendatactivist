import React from 'react';
import DocsDate from '../components/stats/DocsDate';
import DocsType from '../components/stats/DocsType'
import Layout from '../components/Layout';
import DocsTags from '../components/stats/DocsTags'

const Stats = () => {
    return (
        <Layout>
        <div>
            <h1>Nombre de docs publiés</h1>
            <DocsDate />
        </div>
        <div>
            <h1>Types de docs</h1>
            <DocsType />
        </div>
        <div>
            <h1>Tags existants</h1>
            <DocsTags size={[500, 500]} />
        </div>
        </Layout>
    );
};

export default Stats;
