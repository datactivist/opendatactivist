// pages/methodes/[slug].js

import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { getMethodBySlug, getAllMethodSlugs, getUsagesBySlugs, getDatasetsBySlugs } from '../../lib/markdown';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import UsageGallery from '../../components/UsageGallery';
import styles from './MethodPage.module.css';
import Link from 'next/link';
import ApiOpenDataSources from '../../components/ApiOpenDataSources';
import DiscussionLinks from '../../components/DiscussionLinks';
import MethodNext from '../../components/MethodNext';

export default function MethodPage({ method, usages, datasets }) {

  useEffect(() => {

  }, [method]);
  const markdownComponents = {
    p: ({ children }) => <Typography className={styles.p} paragraph sx={{ fontFamily: 'Roboto, sans-serif' }}>{children}</Typography>,
    h1: ({ children }) => <Typography className={styles.h1} variant="h1" gutterBottom>{children}</Typography>,
    h2: ({ children }) => <Typography className={styles.h2} variant="h2" gutterBottom>{children}</Typography>,
    h3: ({ children }) => <Typography className={styles.h3} variant="h3" gutterBottom>{children}</Typography>,
    h4: ({ children }) => <Typography className={styles.h4} variant="h4" gutterBottom>{children}</Typography>,
    h5: ({ children }) => <Typography className={styles.h5} variant="h5" gutterBottom>{children}</Typography>,
    h6: ({ children }) => <Typography className={styles.h6} variant="h6" gutterBottom>{children}</Typography>,
    blockquote: ({ children }) => (
      <Typography
        component="blockquote"
        variant="subtitle1"
        className={styles.blockquote} // Appliquez la classe ici
      >
        {children}
      </Typography>
    ),
    // Autres éléments à personnaliser
  };


  return (
    <Layout>
      <Box sx={{ mt: '2rem', mb: '2rem' }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ bgcolor: '#FFF1EB', p: 2, position: 'fixed', top: 50, left: 0, height: '100vh', width: '25%' }}>
              {method.collection && (
                <Box sx={{
                  bgcolor: '#FFF1EB',
                  mb: '1rem',
                  mt: '3rem',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                  <Typography
                    className={styles.h5}
                    variant="h5"
                    align="center"
                    sx={{ marginLeft: '1rem' }}
                    gutterBottom
                  >
                    Patchwork&nbsp;
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                    <Button
                      variant="contained"
                      href={`/collections/${method.collection}`}
                      sx={{
                        backgroundColor: '#fff',
                        borderColor: '#000',
                        borderWidth: '0.3px',
                        borderStyle: 'solid',
                        borderRadius: '10px',
                        color: '#000',
                        fontWeight: 'regular',
                        fontSize: '0.9rem',
                        textAlign: 'left',
                        marginBottom: '-0.5rem',
                        marginLeft: '1rem', // ajoute 1rem d'espace à gauche du bouton
                        width: '100%', // étend le bouton sur toute la largeur de son parent
                        justifyContent: 'flex-start', // aligne le texte du bouton à gauche
                        '&:hover': {
                          backgroundColor: '#E95459',
                          color: '#fff',
                        },
                      }}
                    >
                      📂 Patchwork {method.collection}
                    </Button>
                    <Typography
                    className={styles.h6}
                    variant="h5"
                    align="left"
                    sx={{ marginLeft: '1rem' }}
                    gutterBottom
                  >
                    Méthode suivante&nbsp;
                  </Typography>
                    {method.next_method && (
                      <MethodNext
                        nextMethodSlug={method.next_method.slug}
                        nextMethodTitle={method.next_method.title}
                      />
                    )}
                  </Box>

                </Box>
              )}

              <DiscussionLinks discourseIds={method.discourse_id} />
              <Link href="/methodes">
                <Button
                  variant="contained"
                  sx={{
                    mt: '2rem',
                    ml: '1rem',
                    backgroundColor: '#173541',
                    borderRadius: '10px',
                    borderWidth: '3px',
                    borderColor: '#000000',
                    color: '#fff',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#E95459',
                      color: '#ffffff',
                    },
                  }}
                >
                  Toutes les méthodes
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
                <Link href="/methodes">
                  <Button variant="contained" sx={{ mt: '2rem', backgroundColor: '#173541', '&:hover': { backgroundColor: '#E95459' } }}>
                    Toutes les méthodes
                  </Button>
                </Link>
                <br></br>
                {method.collection && (
                  <Box sx={{
                    bgcolor: '#FFF',
                    mb: '1rem',
                    mt: '3rem',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                    <Typography
                      className={styles.h6}
                      variant="h5"
                      align="center"
                      sx={{ marginLeft: '1rem' }}
                      gutterBottom
                    >
                      Voir le patchwork complet&nbsp;
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Button
                        variant="contained"
                        href={`/collections/${method.collection}`}
                        sx={{
                          backgroundColor: '#fff',
                          borderColor: '#000',
                          borderWidth: '0.3px',
                          borderStyle: 'solid',
                          borderRadius: '10px',
                          color: '#000',
                          fontWeight: 'regular',
                          fontSize: '0.9rem',
                          textAlign: 'left',
                          marginBottom: '1rem',
                          marginLeft: '0rem', // ajoute 1rem d'espace à gauche du bouton
                          '&:hover': {
                            backgroundColor: '#E95459',
                            color: '#fff',
                          },
                        }}
                      >
                        📂 Patchwork {method.collection}
                      </Button>

                    </Box>
                  </Box>
                )}

                <DiscussionLinks discourseIds={method.discourse_id} />
              </Box>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                  {method.image && (
                    <img src={method.image} alt={method.title} style={{
                      height: '250px', // ajustez la hauteur selon vos besoins
                      width: '600px',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }} />
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
  const { slug } = params;
  const method = getMethodBySlug(slug);
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

