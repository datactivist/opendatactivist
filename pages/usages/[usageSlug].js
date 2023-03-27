// pages/usages/[usageSlug].js

import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import { getUsageBySlug, getAllUsageSlugs } from '../../lib/markdown';
import { Container, Typography } from '@mui/material';
import MethodsGallery from '../../components/MethodsGallery';
import styles from '../methodes/MethodPage.module.css';

export default function UsagePage({ usage }) {
  const { title, image, content, relatedMethods } = usage;

  return (
    <Layout>
      <Container maxWidth="md" sx={{ marginTop: '4rem', marginLeft: '10rem' }}>
      <Typography className={styles.h1} variant="h1" align="left" gutterBottom style={{ fontSize: '3rem' }}>
          {title}
        </Typography>
        {image && (
  <img
    src={usage.image}
    alt={usage.title}
    style={{
      height: '250px', // ajustez la hauteur selon vos besoins
      width: '600px',
      objectFit: 'cover',
      objectPosition: 'center'
    }}
  />
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
