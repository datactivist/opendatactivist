// pages/methodes/[slug].js

import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import { getMethodBySlug, getAllMethodSlugs, getUsagesBySlugs } from '../../lib/markdown';
import { Container, Grid, Typography } from '@mui/material';
import UsageGallery from '../../components/UsageGallery';

export default function MethodPage({ method, usages}) {
  return (
    <Layout>
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <Typography variant="h3" align="center" gutterBottom>
          {method.title}
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {method.image && (
            <Grid item xs={12}>
              <img src={method.image} alt={method.title} style={{ width: '100%' }} />
            </Grid>
          )}
          {method.datasets && (
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Données
              </Typography>
              <ReactMarkdown>{method.datasets}</ReactMarkdown>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Description
            </Typography>
            <ReactMarkdown>{method.description}</ReactMarkdown>
          </Grid>
          {method.usages && (
        <Grid item xs={12}>
          <UsageGallery usages={usages} />
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Méthode
        </Typography>
        <ReactMarkdown>{method.content}</ReactMarkdown>
      </Grid>
    </Grid>
  </Container>
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
  const usages = getUsagesBySlugs(method.usages); // utiliser getUsageBySlugs à la place de getUsagesBySlugs
  return {
    props: {
      method,
      usages,
    },
  };
}