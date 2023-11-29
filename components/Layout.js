// components/Layout.js
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [appBarPosition, setAppBarPosition] = useState('sticky');
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };



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

  useEffect(() => {
    const closeDropdown = (event) => {
      if (dropdownOpen && !event.target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener('click', closeDropdown);

    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  }, [dropdownOpen]);

  return (
    <div>
      <Head>
        <title>Open Datactivist</title>
        <meta
          name="description"
          content="Un catalogue de méthodes dédiées à l'open data"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ width: '90%', margin: '0 auto' }}>
        <header className={`${styles.appBar} ${styles[appBarPosition]}`}>
          <div className={styles.toolbar}>
            <button onClick={toggleMenu} className={styles.hamburgerButton}>
              ☰
            </button>
            <div className={styles.titleContainer}>
              <a href="/" className={styles.title}>
                open{' '}
              </a>
              <Link href="/" passHref>
                <Image
                  src="/images/footer/logo-datactivist.png"
                  alt="Datactivist logo"
                  width={220}
                  height={220}
                  priority
                  className={styles.logo}
                />
              </Link>
            </div>
            <nav
              className={`${styles.navLinks} ${
                menuOpen ? styles.showMenu : ''
              }`}
            >
              <Link href="/products" passHref>
                <span className={styles.link}>Outils & produits</span>
              </Link>
              <Link href="/docs" passHref>
                <span className={styles.link}>Contenus ouverts</span>
              </Link>
              
            </nav>
          </div>
        </header>
      </div>
      <main className={styles.layout}>
        <div className={`container ${styles.container}`}>
          <div className={styles.box}>{children}</div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerBox}>
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
          <div>
            <hr></hr>
            <Link href="/partners">
              <span className={styles.footerLink}>🤍 Partenaires</span>
            </Link>
            <Link href="/links">
              <span className={styles.footerLink}>🔗 Ressources externes</span>
            </Link>
            <Link href="/stats">
              <span className={styles.footerLink}>📊 Stats</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
