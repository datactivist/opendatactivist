// components/Layout.js
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {

  const [showLayout] = useState(true);
  const [appBarPosition, setAppBarPosition] = useState('fixed');
  const [lastScrollPos, setLastScrollPos] = useState(0); 

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
  
      if (currentScrollPos < lastScrollPos) {
        setAppBarPosition('sticky');
      } else {
        setAppBarPosition('relative');
      }
  
      setLastScrollPos(currentScrollPos);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPos]);
  

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
          <header className={`${styles.appBar} ${styles[appBarPosition]}`}>
          <div className={styles.toolbar}>
            <h3>
              <a href="/" className={styles.title}>open </a>
                <Image
                  src="/images/footer/logo-datactivist.png"
                  alt="Datactivist logo"
                  width={220}
                  height={220}
                  priority
                />
            </h3>
            <nav className={styles.navLinks}>
            <Link href="/" passHref>
              <span className={styles.link}>Accueil</span>
            </Link>
            <Link href="/products" passHref>
              <span className={styles.link}>Nos outils</span>
            </Link>
            <Link href="/docs" passHref>
              <span className={styles.link}>Docs</span>
            </Link>
          </nav>
          </div>
        </header>
      )}
      <div className={styles.layout}>
      <div className={`container ${showLayout ? styles.container : ''}`}>
        <div className={showLayout ? styles.box : ''}>
          <main>{children}</main>
        </div>
      </div>
  
      <footer className={styles.footer}>
        <div className={showLayout ? styles.footerBox : ''}>
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
        </div>
      </footer>
    </div>
    </div>
  );  
}
