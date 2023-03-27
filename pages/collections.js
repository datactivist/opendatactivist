import Layout from '../components/Layout';
import { getAllCollections } from '../lib/markdown';
import { Grid, Link } from '@mui/material';

export default function CollectionsPage({ collections }) {
  return (
    <Layout>
      <div className="page-content">
        <h1 style={{ fontSize: '3.6rem' }}>Patchworks</h1>
        <h3>Des canevas pour construire des projets pas à pas</h3>
        <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '1rem' }}>
          {collections.map((collection, index) => (
            <Grid item key={collection}>
              <Link href={`/collections/${collection}`} color="inherit" underline="hover">
                <h1 style={{ fontSize: '2rem', color: index % 2 === 0 ? '#E95459' : '#173541' }}>#{collection}</h1>
              </Link>
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

export async function getStaticProps() {
  const collections = getAllCollections();
  return {
    props: {
      collections,
    },
  };
}
