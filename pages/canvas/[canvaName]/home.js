// pages/canvas/[canvaName]/home.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import styles from '../../../styles/Canvas.module.css';

export default function CanvasHome() {
  const router = useRouter();
  const { canvaName } = router.query;
  const [titles, setTitles] = useState([]);
  const [metaInfo, setMetaInfo] = useState({ title: '', description: '' });

  useEffect(() => {
    if (canvaName) {
      fetch(`/api/canvas?canva=${canvaName}`)
        .then(response => response.json())
        .then(data => {
          const mainTitles = data.filter(item => !item.level.includes('.') && item.level !== '0');
          const metaItem = data.find(item => item.level === '0');
          if (metaItem) {
            setMetaInfo({ title: metaItem.title, description: metaItem.description });
          }
          setTitles(mainTitles);
        })
        .catch(error => console.error('Erreur lors du chargement des titres:', error));
    }
  }, [canvaName]);

  return (
    <Layout>
      <div className={styles.homeContainer}>
        {metaInfo.title && (
          <div className={styles.metaInfo}>
            <h1>{metaInfo.title}</h1>
            <h2>{metaInfo.description}</h2>
          </div>
        )}

        <div className={styles.gridContainer}>
          {titles.map((title, index) => (
            <div key={index} className={styles.titleBox} onClick={() => router.push(`/canvas/${canvaName}#${title.filename}`)}>
              <div className={styles.titleText}>{title.title}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
