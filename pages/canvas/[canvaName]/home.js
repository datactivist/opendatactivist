// pages/canvas/[canvaName]/home.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import styles from '../../../styles/Canvas.module.css';

function renderMarkdown(text) {
  return text.split('\n\n').filter(p => p.trim()).map((para, i) => {
    if (para.startsWith('## ')) {
      return <h2 key={i}>{para.slice(3)}</h2>;
    }
    const parts = para.split(/\*([^*]+)\*/);
    return (
      <p key={i}>
        {parts.map((part, j) => j % 2 === 1 ? <em key={j}>{part}</em> : part)}
      </p>
    );
  });
}

export default function CanvasHome() {
  const router = useRouter();
  const { canvaName } = router.query;
  const [titles, setTitles] = useState([]);
  const [metaInfo, setMetaInfo] = useState({ title: '', description: '' });
  const [introContent, setIntroContent] = useState('');

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

      fetch(`/api/canvas?canva=${canvaName}&filename=meta`)
        .then(response => response.json())
        .then(data => {
          if (data.content) setIntroContent(data.content);
        })
        .catch(() => {});
    }
  }, [canvaName]);

  return (
    <Layout>
      <div className={styles.homeContainer}>
        {metaInfo.title && (
          <div className={styles.metaInfo}>
            <h1>{metaInfo.title}</h1>
            <h2>{metaInfo.description}</h2>
            {canvaName === 'standards' && (
              <div className={styles.partnersBanner}>
                <span>Construit avec l'Ademe et l'association Open Data France dans le cadre du partenariat stratégique autour de la donnée</span>
                <div className={styles.partnersLogos}>
                  <img src="/images/partners/ademe.png" alt="Ademe" className={styles.partnerLogo} />
                  <img src="/images/partners/odf.png" alt="Open Data France" className={styles.partnerLogo} />
                </div>
              </div>
            )}
          </div>
        )}

        {introContent && (
          <div className={styles.introContent}>
            {renderMarkdown(introContent)}
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
