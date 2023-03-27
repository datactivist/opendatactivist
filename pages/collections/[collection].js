// pages/tags/[tag].js

import Layout from '../../components/Layout';
import MethodCard from '../../components/MethodCard';
import { getMethodsByCollection, getAllCollections } from '../../lib/markdown';
import { Grid } from '@mui/material';

export default function CollectionPage({ collection, methods }) {
  return (
    <Layout>
      <div className="page-content">
        <h1>Patchwork {collection}</h1>
        <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '1rem' }}>
          {methods.map((method) => (
            <Grid item key={method.slug} xs={12} sm={6} md={4} lg={5}>
              <MethodCard method={method} />
            </Grid>
          ))}
        </Grid>
      </div>
      <style jsx>{`
        .page-content {
          margin-top: 4rem;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
}


export async function getStaticPaths() {
  const collections = getAllCollections();
  const paths = collections.map((collection) => ({ params: { collection } })); // Modifiez ici
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const collection = params.collection; // Modifiez ici
  const methods = getMethodsByCollection(collection);
  return {
    props: {
      collection,
      methods,
    },
  };
}
