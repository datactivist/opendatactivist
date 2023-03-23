// pages/methodes/[slug].js

import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import { getMethodBySlug, getAllMethodSlugs, getUsagesBySlugs, getDatasetsBySlugs } from '../../lib/markdown';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import UsageGallery from '../../components/UsageGallery';
import styles from './MethodPage.module.css';
import Link from 'next/link';
import ApiOpenDataSources from '../../components/ApiOpenDataSources';

export default function MethodPage({ method, usages, datasets }) {
  const markdownComponents = {
    p: ({ children }) => <Typography className={styles.p} paragraph>{children}</Typography>,
    h1: ({ children }) => <Typography className={styles.h1} variant="h1" gutterBottom>{children}</Typography>,
    h2: ({ children }) => <Typography className={styles.h2} variant="h2" gutterBottom>{children}</Typography>,
    h3: ({ children }) => <Typography className={styles.h3} variant="h3" gutterBottom>{children}</Typography>,
    h4: ({ children }) => <Typography className={styles.h4} variant="h4" gutterBottom>{children}</Typography>,
    h5: ({ children }) => <Typography className={styles.h5} variant="h5" gutterBottom>{children}</Typography>,
    h6: ({ children }) => <Typography className={styles.h6} variant="h6" gutterBottom>{children}</Typography>,
    // Autres éléments à personnaliser
  };

  return (
  <Layout>
  <Box sx={{ mt: '2rem', mb: '2rem' }}>
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
      <Box sx={{ bgcolor: '#FFF1EB', p: 2, position: 'fixed', top: 50, left: 0, height: '100vh', width: '25%' }}>
          <Link href="/home">
          <Button variant="contained" sx={{ mt: '2rem', backgroundColor: '#E95459', '&:hover': { backgroundColor: '#173541' } }}>
              Retour
            </Button>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={9}>
      <Container maxWidth="lg" sx={{ ml: '0rem' }}>
          <Typography className={styles.h1} variant="h1" align="left" gutterBottom style={{ fontSize: '3rem' }}>
            {method.title}
          </Typography>
          <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'left', mb: '2rem' }}>
            <Link href="/home">
              <Button variant="contained" sx={{ mt: '2rem', backgroundColor: '#E95459', '&:hover': { backgroundColor: '#173541' } }}>
                Retour
              </Button>
            </Link>
          </Box>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              {method.image && (
                <img src={method.image} alt={method.title} style={{ maxWidth: '100%' }} />
              )}
              <ReactMarkdown components={markdownComponents} style={{ fontSize: '1.5rem' }}>
                {method.content}
              </ReactMarkdown>
              {method.usages && <UsageGallery usages={usages} />}
                <>
                <br></br>
                <br></br>
                  {method.datasets && <ApiOpenDataSources datasetsList={datasets} />}
                </>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  </Box>
</Layout>
  );
}

export async function getStaticPaths() {
  const slugs = getAllMethodSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const method = getMethodBySlug(params.slug);
  const usages = getUsagesBySlugs(method.usages);
  const datasets = getDatasetsBySlugs(method.datasets);
  return {
    props: {
      method,
      usages,
      datasets,
    },
  };
}
