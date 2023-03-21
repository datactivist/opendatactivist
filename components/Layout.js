// components/Layout.js

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Datactivist Open</title>
        <meta
          name="description"
          content="Un catalogue de méthodes avec recherche et filtrage"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Datactivist Open
          </Typography>
          <nav>
            <Link href="/" passHref>
              <Button color="inherit">Accueil</Button>
            </Link>
            <Link href="/home" passHref>
              <Button color="inherit">Méthodes</Button>
            </Link>
            <Link href="/usages" passHref>
              <Button color="inherit">Cas d'utilisation</Button>
            </Link>
          </nav>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
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
