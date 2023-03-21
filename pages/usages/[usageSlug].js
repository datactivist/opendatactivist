// pages/usages/[usageSlug].js

import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import { getUsageBySlug, getAllUsageSlugs } from '../../lib/markdown';
import { Container, Typography } from '@mui/material';

export default function UsagePage({ usage }) {
  const { title, description, image, content } = usage;

  return (
    <Layout>
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <Typography variant="h3" align="center" gutterBottom>
          {title}
        </Typography>
        {image && (
          <img src={image} alt={title} style={{ width: '100%', marginBottom: '2rem' }} />
        )}
        <Typography variant="h5" gutterBottom>
          Description
        </Typography>
        <ReactMarkdown>{description}</ReactMarkdown>
        <Typography variant="h5" gutterBottom sx={{ marginTop: '2rem' }}>
          Contenu
        </Typography>
        <ReactMarkdown>{content}</ReactMarkdown>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = getAllUsageSlugs();
  const paths = slugs.map((usageSlug) => ({ params: { usageSlug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const usage = getUsageBySlug(params.usageSlug);
  return {
    props: {
      usage,
    },
  };
}
