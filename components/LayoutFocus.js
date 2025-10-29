// components/LayoutFocus.js
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/LayoutFocus.module.css';
import { supabase } from '../utils/supabaseClient';

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [appBarPosition, setAppBarPosition] = useState('sticky');
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    async function checkUserSession() {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error.message);
      } else if (data) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    }

    checkUserSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLoggedIn(false);
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
            className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}
          >
            <Link href="/products" passHref>
              <span className={styles.link}>Outils & produits</span>
            </Link>
            <Link href="/docs" passHref>
              <span className={styles.link}>Contenus ouverts</span>
            </Link>
            <div
              className={`${styles.userContainer} dropdown-container`}
              onClick={toggleDropdown}
            >
              <Image src="/icons/user.svg" alt="User" width={30} height={30} />
              <div
                className={`${styles.dropdownMenu} ${
                  dropdownOpen ? styles.dropdownOpen : ''
                }`}
              >
                {loggedIn ? (
                  <>
                    <Link href="/account/mes-informations" passHref>
                      <span className={`${styles.link} ${styles.dropdownItem}`}>
                        Mon compte
                      </span>
                    </Link>
                    <div
                      onClick={handleLogout}
                      className={`${styles.link} ${styles.dropdownItem}`}
                    >
                      Me déconnecter
                    </div>
                  </>
                ) : (
                  <Link href="/auth/login" passHref>
                    <span className={`${styles.link} ${styles.dropdownItem}`}>
                      Mon compte
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className={styles.layout}>
        <div className={`container ${styles.container}`}>
          <div className={styles.box}>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
