import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import { getCellBySlug, getAllCellsSlugs } from '../../lib/markdown';
import { Container, Typography } from '@mui/material';
import styles from '../methodes/MethodPage.module.css';

export default function CellPage({ cell }) {
  const { title, image, content } = cell;

  return (
    <Layout>
      <Container maxWidth="md" sx={{ marginTop: '4rem', marginLeft: '10rem' }}>
        <Typography variant="h1" className={styles.h1} align="left" gutterBottom>
          {title}
        </Typography>
        {image && (
          <img
            src={image}
            alt={title}
            style={{
              height: '250px',
              width: '600px',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        )}
        <ReactMarkdown>{content}</ReactMarkdown>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = getAllCellsSlugs();
  const paths = slugs.map((cellSlug) => ({ params: { cellSlug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const cell = getCellBySlug(params.cellSlug);
  return {
    props: {
      cell,
    },
  };
}
