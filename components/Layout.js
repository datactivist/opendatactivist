// components/Layout.js
import React, { useEffect, useState } from 'react';
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
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {

  const [showLayout] = useState(true);
  const [appBarPosition, setAppBarPosition] = useState('fixed');
  const [lastScrollPos, setLastScrollPos] = useState(0); 

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos < lastScrollPos && appBarPosition !== 'sticky') {
        setAppBarPosition('fixed');
      } else if (currentScrollPos > lastScrollPos && appBarPosition !== 'sticky') {
        setAppBarPosition('relative');
      }

      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [appBarPosition, lastScrollPos]);

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
      {showLayout && (
        <AppBar
          position={appBarPosition}
          className={styles.appBar}
          sx={{
            backgroundColor: 'white',
            transition: 'transform 0.3s ease-in-out',
            transform: appBarPosition === 'fixed' ? 'translateY(0)' : 'translateY(-100%)',
          }}
        >
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
                  Nos outils
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
      )}
  
      <Container
        maxWidth="lg"
        sx={{ paddingTop: showLayout ? '64px' : '0' }}
      >
        <Box sx={{ paddingBottom: '60px' }}>
          <main>{children}</main>
        </Box>
      </Container>
  
      <footer>
        <Box
          sx={{
            position: showLayout ? 'fixed' : 'static',
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
