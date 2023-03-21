// pages/usages/[usageSlug].js

import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import { getUsageBySlug, getAllUsageSlugs } from '../../lib/markdown';
import { Container, Typography } from '@mui/material';
import MethodsGallery from '../../components/MethodsGallery';

export default function UsagePage({ usage }) {
  const { title, image, content, relatedMethods } = usage;

  return (
    <Layout>
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <Typography variant="h3" align="center" gutterBottom>
          {title}
        </Typography>
        {image && (
          <img src={image} alt={title} style={{ width: '100%', marginBottom: '2rem' }} />
        )}
        <ReactMarkdown>{content}</ReactMarkdown>
        {relatedMethods && (
          <MethodsGallery methods={relatedMethods} />
        )}
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
