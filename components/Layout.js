// components/Layout.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Importez Image de Next.js pour une meilleure optimisation des images
import styles from '../styles/Layout.module.css'; // Assurez-vous de créer ce fichier CSS

const Layout = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const updateDimensions = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setVisible(currentScrollY < lastScrollY || currentScrollY === 0);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateDimensions);

    updateDimensions();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [lastScrollY]);

  return (
    <>
      <header className={`${styles.header} ${visible ? styles.visible : styles.hidden}`}>
        <div className={styles.logoContainer}>
          <Image className={styles.logoDatactivist} src="/images/footer/logo-datactivist.png" alt="Datactivist Logo" width={100} height={50} />
        </div>
        {windowWidth > 768 ? (
          <nav className={styles.menunav}>
            <Link href="/docs">Publications</Link>
            <Link href="/products">Produits</Link>
            <Link href="/equipe">Équipe</Link>
            <Link href="/references">Références</Link>
            <Link href="/recherche">Recherche</Link>
            <Link href="/blog">Blog</Link>
          </nav>
        ) : (
          <select className={styles.menuselect} onChange={(e) => window.location.href = e.target.value}>
            <option value="">Menu</option>
            <option value="/docs">Publications</option>
            <option value="/products">Produits</option>
            <option value="/equipe">Equipe</option>
            <option value="/references">Références</option>
            <option value="/recherche">Recherche</option>
            <option value="/blog">Blog</option>
          </select>
        )}
      </header>
      <main className={styles.mainContent}>{children}</main>
    </>
  );
};

export default Layout;
