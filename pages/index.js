import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Open Datactivist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Open <span style={{ color: '#E95459' }}>Datactivist</span>
        </h1>

        <p className={styles.description}>
          Des méthodes et des cas pratiques en accès libre, pour{' '}
          <span>produire et utiliser des données</span>.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Nos contenus ouverts &rarr;</h3>
            <p>
              Des contenus en accès libre, pour se former à la donnée,
              comprendre les enjeux de l‘open data, et s‘inspirer de cas
              pratiques.
            </p>
            <a href="/docs" className={styles.viewButton}>
              <b>Voir les contenus</b>
            </a>
            <div className={styles.tagsBox}>
              <a
                href="/docs?tag=qualité"
                className={`${styles.tag} ${styles.tag1}`}
              >
                #Qualité des données
              </a>
              <a
                href="/docs?tag=strategie"
                className={`${styles.tag} ${styles.tag2}`}
              >
                #Stratégie
              </a>
              <a
                href="/docs?tag=culture"
                className={`${styles.tag} ${styles.tag3}`}
              >
                #Culture
              </a>
              <a
                href="/docs?tag=territoires"
                className={`${styles.tag} ${styles.tag4}`}
              >
                #Territoires
              </a>
              <a
                href="/docs?tag=hackathon"
                className={`${styles.tag} ${styles.tag5}`}
              >
                #Hackathons
              </a>
              <a href="/docs" className={`${styles.tag} ${styles.tag3}`}>
                #...
              </a>
            </div>
          </div>

          <div className={styles.card}>
            <h3>Nos outils et produits &rarr;</h3>
            <p>
              Des outils et produits pour faciliter vos projets, accessibles en
              open source et personnalisables avec nos équipes.
            </p>
            <a href="/products" className={styles.viewButton}>
              <b>Voir les outils</b>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
