// components/Layout.js

import React from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Mon Catalogue de Méthodes</title>
        <meta
          name="description"
          content="Un catalogue de méthodes avec recherche et filtrage"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Mon Catalogue de Méthodes
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <main>{children}</main>
      </Container>

      <footer>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} - Mon Catalogue de Méthodes - Tous droits réservés
        </Typography>
      </footer>
    </div>
  );
}
