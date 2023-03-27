// components/Layout.js

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import styles from './Layout.module.css';
import { useEffect } from "react";


export default function Layout({ children }) {
  useEffect(() => {
    const footer = document.querySelector('footer');
    const footerHeight = footer.offsetHeight;
    const screenHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    if (screenHeight > bodyHeight) {
      footer.style.position = 'fixed';
      footer.style.bottom = '0';
      footer.style.width = '100%';
    } else {
      footer.style.position = 'static';
    }

    window.addEventListener('resize', () => {
      const bodyHeight = document.body.offsetHeight;
      if (screenHeight > bodyHeight) {
        footer.style.position = 'fixed';
        footer.style.bottom = '0';
        footer.style.width = '100%';
      } else {
        footer.style.position = 'static';
      }
    });
  }, []);

  return (

    <div>
      <Head>
        <title>Open Datactivist</title>
        <meta
          name="description"
          content="Un catalogue de méthodes avec recherche et filtrage"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Typography variant="h5" component="div" className={styles.title}>
            Open <a href='https://datactivist.coop/'>Datactivist</a>
          </Typography>
          <nav className={styles.navLinks}>
            <Link href="/" passHref>
              <Button className={styles.link} color="inherit">
                Accueil
              </Button>
            </Link>
            <Link href="/methodes" passHref>
              <Button className={styles.link} color="inherit">
                Méthodes
              </Button>
            </Link>
            <Link href="/usages" passHref>
              <Button className={styles.link} color="inherit">
                Cas d'utilisation
              </Button>
            </Link>
            <Link href="/collections" passHref>
              <Button className={styles.link} color="inherit">
                Patchworks
              </Button>
            </Link>
          </nav>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" className={styles.container}>
        <main>{children}</main>
      </Container>

      <footer style={{ position: "fixed", bottom: 0, width: "100%", height: "60px", background: "#fff", zIndex: 2 }}>
  <div className="container">
    <div className="social">
      <a href="https://twitter.com/datactivi_st" target="_blank" rel="noopener noreferrer" style={{ marginRight: "40px" }}>
        <Image src="/images/footer/twitter.svg" alt="Twitter" width={30} height={30} />
      </a>
      <a href="https://www.linkedin.com/company/datactivist" target="_blank" rel="noopener noreferrer" style={{ marginRight: "40px" }}>
        <Image src="/images/footer/linkedin.svg" alt="LinkedIn" width={30} height={30} />
      </a>
      <a href="https://medium.com/datactivist" target="_blank" rel="noopener noreferrer" style={{ marginRight: "40px" }}>
        <Image src="/images/footer/medium.svg" alt="Medium" width={30} height={30} />
      </a>
      <a href="mailto:hello@datactivist.coop" target="_blank" rel="noopener noreferrer" style={{ marginRight: "40px" }}>
        <Image src="/images/footer/mail.svg" alt="Email" width={30} height={30} />
      </a>
    </div>
  </div>
</footer>
    </div>
  );
}
