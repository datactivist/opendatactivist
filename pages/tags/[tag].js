import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import MethodCard from '../../components/MethodCard';
import { getMethodsByTag, getAllTags } from '../../lib/markdown';
import { Grid } from '@mui/material';

const TagPage = ({ tag, methods }) => {
  return (
    <Layout>
      <div className="page-content">
        <h1>Tag: {tag}</h1>
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
};

export async function getStaticPaths() {
  const tags = getAllTags();
  const paths = tags.map((tag) => ({ params: { tag } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const tag = params.tag;
  const methods = getMethodsByTag(tag);
  return {
    props: {
      tag,
      methods,
    },
  };
}

export default TagPage;
