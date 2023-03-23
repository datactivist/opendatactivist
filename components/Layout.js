// components/Layout.js

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import styles from './Layout.module.css';

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

      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" component="div" className={styles.title}>
            Datactivist Open
          </Typography>
          <nav className={styles.navLinks}>
            <Link href="/" passHref>
              <Button className={styles.link} color="inherit">
                Accueil
              </Button>
            </Link>
            <Link href="/home" passHref>
              <Button className={styles.link} color="inherit">
                Méthodes
              </Button>
            </Link>
            <Link href="/usages" passHref>
              <Button className={styles.link} color="inherit">
                Cas d'utilisation
              </Button>
            </Link>
          </nav>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" className={styles.container}>
        <main>{children}</main>
      </Container>

      <footer className={styles.footer}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} - Mon Catalogue de Méthodes - Tous droits réservés
        </Typography>
      </footer>
    </div>
  );
}
