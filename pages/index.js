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
          Open <a href="https://datactivist.coop">Datactivist</a>
        </h1>

        <p className={styles.description}>
          Des méthodes et des cas pratiques en accès libre <br></br>
          <code>Produire des données</code> <code>Utiliser des données</code>
        </p>

        <div className={styles.grid}>
          <a href="/" className={styles.card}>
            <h3>Patchworks &rarr;</h3>
            <p>
              Des guides outillés pour construire des projets étape par étape
            </p>
          </a>

          <a href="/docs" className={styles.card}>
            <h3>Nos articles &rarr;</h3>
            <p>
              Tous nos contenus en accès libre, pour produire et utiliser des
              données
            </p>
          </a>

          <a href="/links" className={styles.card}>
            <h3>Ressources externes &rarr;</h3>
            <p>Des liens vers des ressources et outils pour vous inspirer</p>
          </a>

          <a href="/products" className={styles.card}>
            <h3>Nos outils &rarr;</h3>
            <p>Nos outils en accès libre, pour faciliter vos projets</p>
          </a>
        </div>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #eaeaea;
          border-radius: 5px;
          padding: 0.5rem;
          font-size: 1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Montserrat;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
