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
  const [canvaTitle, setCanvaTitle] = useState('');
  const [activeFilename, setActiveFilename] = useState('');
  const [prevNextTitles, setPrevNextTitles] = useState({ prev: null, next: null });
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the menu open/close
  const arrowRightIcon = '/icons/arrow-down2.svg';
  const arrowDownIcon = '/icons/arrow-down.svg';
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const updateMenuState = () => {
    if (window.innerWidth < 1000) { // Set the width based on your design
      setIsMenuOpen(false); 
    } else {
      setIsMenuOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateMenuState);
    updateMenuState(); // Initial check
    return () => window.removeEventListener('resize', updateMenuState);
  }, []);

  useEffect(() => {
    if (canvaName) {
      fetch(`/api/canvas?canva=${canvaName}`)
        .then((response) => response.json())
        .then((data) => {
          const filteredTitles = data.filter(item => item.level !== '0');
          const canvaInfo = data.find(item => item.level === '0');
          setCanvaTitle(canvaInfo ? canvaInfo.title : '');
          setTitles(filteredTitles);
          updatePrevNextTitles(activeFilename, filteredTitles);
          const hash = window.location.hash.replace('#', '');
          if (hash) {
            loadContent(hash);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [canvaName, activeFilename]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const titleLevel = titles.find(title => title.filename === hash)?.level;
      const topLevel = titleLevel?.includes('.') ? titleLevel.split('.')[0] : titleLevel;
      setActiveFilename(hash);
      if (topLevel) {
        setOpenedTitles(prev => ({ ...prev, [topLevel]: true }));
      }
      loadContent(hash);
    };
  
    window.addEventListener('hashchange', handleHashChange, false);
    handleHashChange(); 
  
    return () => window.removeEventListener('hashchange', handleHashChange, false);
  }, [titles]); 
  

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    setActiveFilename(hash);
    loadContent(hash);
  }, [canvaName]); 
  

  const updatePrevNextTitles = (filename, titles) => {
    const currentIndex = titles.findIndex(title => title.filename === filename);
    const prevTitle = currentIndex > 0 ? titles[currentIndex - 1] : null;
    const nextTitle = currentIndex < titles.length - 1 ? titles[currentIndex + 1] : null;
    setPrevNextTitles({ prev: prevTitle, next: nextTitle });
  };

  const handleTitleClick = (filename, level) => {
    const isAlreadyOpened = !!openedTitles[level];
    setOpenedTitles(prevState => ({
      ...prevState,
      [level]: !isAlreadyOpened
    }));
    
    setActiveFilename(filename);
    updatePrevNextTitles(filename, titles);
  
    if (window.innerWidth < 1000) { 
      setIsMenuOpen(false);
    }
    
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
            let htmlContent = String(file);
            // Remplacer les liens spécifiés pour être des boutons
            const buttonRegex = /<a href="([^"]+)"[^>]* title="canvaLinkButton">([^<]+)<\/a>/g;
            htmlContent = htmlContent.replace(buttonRegex, (match, p1, p2) => {
              return `<a href="${p1}" class="canvaLinkButton" target="_blank">${p2}</a>`;
            });
      
            // Ajouter la classe `linkcanvas` à tous les autres liens
            htmlContent = htmlContent.replace(/<a href="([^"]+)"(?!.*class="canvaLinkButton")(.*?)>(.*?)<\/a>/g, (match, p1, p3, p4) => {
              return `<a href="${p1}" class="linkcanvas"${p3}>${p4}</a>`;
            });
      
            htmlContent = htmlContent.replace(/<code>(.*?)<\/code>/g, `<code class="canvasCode">$1</code>`);
            htmlContent = htmlContent.replace(/<ul>/g, '<ul class="canvasList">');
            htmlContent = htmlContent.replace(/<ol>/g, '<ol class="canvasOrderedList">');
            htmlContent = htmlContent.replace(/<code>(.*?)<\/code>/g, `<code class="canvasCode">$1</code>`);
        
        // Trouver les blocs de code (précédés et suivis par des balises `<pre>`) et appliquer la classe `canvasCodeBlock`
        htmlContent = htmlContent.replace(/<pre><code>(.*?)<\/code><\/pre>/gs, `<pre><code class="canvasCodeBlock">$1</code></pre>`);

          setContent(htmlContent);
          });
      })
      .catch((error) => console.error('Erreur lors du chargement du contenu:', error));
        
      
    };
    const handleCanvaTitleBoxClick = () => {
      // Utiliser router.push pour naviguer vers la page /canvas/{canvaName}/home
      router.push(`/canvas/${canvaName}/home`);
    };

    useEffect(() => {
      // Fonction pour copier le contenu dans le presse-papiers
      const copyToClipboard = (text, wrapper) => {
        navigator.clipboard.writeText(text).then(() => {
          console.log('Code copié');
          
          // Création des particules d'explosion
          for (let i = 0; i < 3; i++) { // 3 pour l'exemple, ajuste selon le nombre souhaité
            const particle = document.createElement('div');
            particle.className = 'explosionParticle';
            wrapper.appendChild(particle);
      
            // Taille et position aléatoires pour l'exemple
            particle.style.width = particle.style.height = `${Math.random() * 5 + 10}px`; // Entre 5px et 10px
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
      
            // Suppression de la particule à la fin de l'animation
            particle.addEventListener('animationend', () => particle.remove());
          }
        }, (err) => {
          console.error('Erreur lors de la copie du texte :', err);
        });
      };
    
      // Ajoute des tooltips à tous les blocs de code
      document.querySelectorAll('pre code').forEach((block) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'tooltip';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        
        const tooltipText = document.createElement('span');
        tooltipText.className = 'tooltiptext';
        tooltipText.textContent = 'Copier';
        wrapper.appendChild(tooltipText);
        
wrapper.addEventListener('click', () => copyToClipboard(block.textContent, wrapper));
      });
    }, [content]); // Ré-exécute ce code chaque fois que le contenu change
    
    

  return (
    <Layout>
      <div className={styles.container}>
        <button className={styles.menuToggle} onClick={toggleMenu}>
          Etapes
        </button>
        <div className={`${styles.titles} ${isMenuOpen ? styles.open : ''}`}>
        {canvaTitle && (
  <div className={styles.canvaTitleBox} onClick={handleCanvaTitleBoxClick}>
    {canvaTitle}
  </div>
)}

         {titles.map((title, index) => {
  const isMainTitle = !title.level.includes('.');
  const isOpened = openedTitles[title.level.split('.')[0]];
  const isActive = title.filename === activeFilename;
  const iconUrl = isOpened ? arrowDownIcon : arrowRightIcon; // Détermine l'icône à utiliser

  return (
    <div key={index}>
      {isMainTitle ? (
        <div
          className={`${styles.title} ${isActive ? styles.activeTitle : ''}`}
          onClick={() => handleTitleClick(title.filename, title.level)}
        >
          {title.title}
          <img src={iconUrl} alt="Toggle" className={styles.toggleIcon} style={{ float: 'right' }} /> 
        </div>
      ) : null}
      {isOpened && title.level.includes('.') && (
        <div
          className={`${styles.title} ${styles.subTitle} ${isActive ? styles.activeTitle : ''}`}
          onClick={() => handleTitleClick(title.filename, title.level)}
        >
          {title.title}
        </div>
      )}
    </div>
  );
})}


        </div>
        <div className={styles.contentArea}>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
        
        <div className={styles.navigationLinks}>
          {prevNextTitles.prev && (
            <a onClick={() => handleTitleClick(prevNextTitles.prev.filename, prevNextTitles.prev.level)} className={styles.navigationLinkLeft}>
              <img src="/icons/arrow-left.svg" alt="Précédent" className={styles.navigationIcon}/>
               {prevNextTitles.prev.title}
            </a>
          )}
          {prevNextTitles.next && (
            <a onClick={() => handleTitleClick(prevNextTitles.next.filename, prevNextTitles.next.level)} className={styles.navigationLinkRight}>
              {prevNextTitles.next.title}
              <img src="/icons/arrow-right.svg" alt="Suivant" className={styles.navigationIcon}/>
            </a>
          )}
        </div>
      </div>
      
    </div>
  </Layout>
);
}
