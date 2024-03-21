import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import Layout from '../../components/Layout';
import styles from '../../styles/Canvas.module.css';

export default function CanvasPage() {
  const router = useRouter();
  const { canvaName } = router.query;
  const [titles, setTitles] = useState([]);
  const [content, setContent] = useState('');
  const [openedTitles, setOpenedTitles] = useState({});
  const [canvaTitle, setCanvaTitle] = useState(''); // Add state to store the canva title
  const [activeFilename, setActiveFilename] = useState('');

  useEffect(() => {
    if (canvaName) {
      fetch(`/api/canvas?canva=${canvaName}`)
        .then((response) => response.json())
        .then((data) => {
          // Extract the canva title from level 0 and update the titles excluding level 0
          const filteredTitles = data.filter(item => item.level !== '0');
          const canvaInfo = data.find(item => item.level === '0');
          setCanvaTitle(canvaInfo ? canvaInfo.title : ''); // Set the canva title
          setTitles(filteredTitles);
          const hash = window.location.hash.replace('#', '');
          if (hash) {
            loadContent(hash);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [canvaName]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      loadContent(hash);
    };
    window.addEventListener('hashchange', handleHashChange, false);

    return () => window.removeEventListener('hashchange', handleHashChange, false);
  }, []);

  const handleTitleClick = (filename, level) => {
    const isAlreadyOpened = !!openedTitles[level];
    setOpenedTitles(prevState => ({
      ...prevState,
      [level]: !isAlreadyOpened
    }));
    
    setActiveFilename(filename); // Set the active filename
    
    router.push(`/canvas/${canvaName}#${filename}`, undefined, { shallow: true }).then(() => {
      loadContent(filename);
    });
};
    
  const loadContent = (filename) => {
    if (!filename) {
      setContent('');
      return;
    }
    

    fetch(`/api/canvas?canva=${canvaName}&filename=${filename}`)
      .then((response) => response.json())
      .then((data) => {
        unified()
          .use(remarkParse)
          .use(remarkHtml)
          .process(data.content)
          .then((file) => {
            setContent(String(file));
          });
      })
      .catch((error) => console.error('Erreur lors du chargement du contenu:', error));
  };
  
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) loadContent(hash);
  }, [canvaName]);
  
  return (
    <Layout>
      <div className={styles.container}>
       
        <div className={styles.titles}>
        {canvaTitle && (
          <div className={styles.canvaTitleBox}>
            {canvaTitle}
          </div>
        )}
          {titles.map((title, index) => {
    const isMainTitle = !title.level.includes('.');
    const isOpened = openedTitles[title.level.split('.')[0]];
    const isActive = title.filename === activeFilename; // Determine if the title is active
    return (
      <div key={index}>
        {isMainTitle ? (
          <div
            className={`${styles.title} ${isActive ? styles.activeTitle : ''}`} // Apply activeTitle class if active
            onClick={() => handleTitleClick(title.filename, title.level)}
          >
            {title.title}
          </div>
        ) : null}
        {isOpened && title.level.includes('.') && (
          <div
            className={`${styles.title} ${styles.subTitle} ${isActive ? styles.activeTitle : ''}`} // Apply activeTitle class if active
            onClick={() => handleTitleClick(title.filename, title.level)}
          >
            {title.title}
          </div>
        )}
      </div>
    );
})}

        </div>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Layout>
  );
}
