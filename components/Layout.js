// components/Layout.js
import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
} from '@mui/material';

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

      <AppBar position="fixed" sx={{ backgroundColor: 'white' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h3" component="div">
            <a href="/">Open Datactivist</a>
          </Typography>
          <nav>
            <Link href="/" passHref>
              <Button
                sx={{ color: 'black', fontWeight: '500', fontSize: '16px' }}
              >
                Accueil
              </Button>
            </Link>
            <Link href="/products" passHref>
              <Button
                sx={{ color: 'black', fontWeight: '500', fontSize: '16px' }}
              >
                Data products
              </Button>
            </Link>
            <Link href="/docs" passHref>
              <Button
                sx={{ color: 'black', fontWeight: '500', fontSize: '16px' }}
              >
                Docs
              </Button>
            </Link>
          </nav>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ paddingTop: '64px', paddingBottom: '60px' }}>
          <main>{children}</main>
        </Box>
      </Container>

      <footer>
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            height: 60,
            background: '#fff',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <a
            href="https://twitter.com/datactivi_st"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '40px' }}
          >
            <Image
              src="/images/footer/twitter.svg"
              alt="Twitter"
              width={30}
              height={30}
            />
          </a>
          <a
            href="https://www.linkedin.com/company/datactivist"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '40px' }}
          >
            <Image
              src="/images/footer/linkedin.svg"
              alt="LinkedIn"
              width={30}
              height={30}
            />
          </a>
          <a
            href="https://medium.com/datactivist"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '40px' }}
          >
            <Image
              src="/images/footer/medium.svg"
              alt="Medium"
              width={30}
              height={30}
            />
          </a>
          <a
            href="mailto:hello@datactivist.coop"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '40px' }}
          >
            <Image
              src="/images/footer/mail.svg"
              alt="Email"
              width={30}
              height={30}
            />
          </a>
        </Box>
      </footer>
    </div>
  );
}
