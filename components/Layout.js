// components/Layout.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Importez Image de Next.js pour une meilleure optimisation des images
import styles from '../styles/Layout.module.css'; // Assurez-vous de créer ce fichier CSS

const Layout = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // État pour gérer la visibilité du dropdown

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

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);


  return (
    <>
      <header className={`${styles.header} ${visible ? styles.visible : styles.hidden}`}>
        <div className={styles.logoDatactivist}>
          <Link href="/" passHref>
            <Image src="/images/footer/logo-datactivist.png" alt="Datactivist Logo" width={200} height={50} />
          </Link>
        </div>
        {windowWidth > 768 ? (
          <nav className={styles.menunav}>
            <Link href="/docs">📖 Publications</Link>
            <Link href="/products">👾 Produits</Link>
            <Link href="/canvas">📎 Canvas</Link>
            <Link href="/blog">✏️ Blog</Link>
            <div className={styles.dropdown}>
              <button className={styles.dropdownMenuButton} onClick={toggleDropdown}>↓ À propos</button>
              {isDropdownOpen && (
                <div className={styles.dropdownContent}>
                  <Link href="/equipe">🏃🏻‍♀️ Équipe</Link>
                  <Link href="/references">🧳 Références</Link>
                  <Link href="/recherche">🎓 Recherche</Link>
                  <Link href="/presse">📸 Presse</Link>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <select className={styles.menuselect} onChange={(e) => window.location.href = e.target.value}>
            <option className={styles.option} value="">Menu</option>
            <option className={styles.option}value="/docs">Publications</option>
            <option className={styles.option} value="/products">Produits</option>
            <option className={styles.option} value="/references">Références</option>
            <option className={styles.option} value="/recherche">Recherche</option>
            <option className={styles.option} value="/equipe">Equipe</option>
            <option className={styles.option} value="/blog">Blog</option>
            <option className={styles.option} value="/presse">Presse</option>
          </select>
        )}
      </header>
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerIcons}>
          <Link href="https://www.linkedin.com/company/datactivist" passHref><Image src="/images/footer/linkedin.svg" alt="LinkedIn" width={24} height={24} /></Link>
          <Link href="mailto:hello@datactivist.coop" passHref><Image src="/images/footer/mail.svg" alt="Mail" width={24} height={24} /></Link>
          <Link href="https://x.com/datactivi_st" passHref><Image src="/images/footer/x.svg" alt="X" width={24} height={24} /></Link>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/partners">Nos partenaires</Link>
          <Link href="/links">Ressources externes</Link>
        </div>
      </footer>
    </>
  );
};

export default Layout;
