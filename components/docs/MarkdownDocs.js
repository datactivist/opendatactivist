import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import styles from '../../styles/MarkdownContent.module.css';
import Layout from '../Layout';
import FilteredDocsDisplay from './FilteredDocsDisplay';
import FilteredLinksDisplay from './FilteredLinksDisplay';
import DatagouvDisplay from './DatagouvDisplay';
import JsonGalleryDisplay from './JsonGalleryDisplay';


const MarkdownDocs = ({ filename }) => {
  const [metadata, setMetadata] = useState({});
  const [content, setContent] = useState('');


  const createContentElements = (htmlContent) => {
    const contentParts = htmlContent.split(/(%%FilteredDocsDisplay:[^%]*%%|%%FilteredLinksDisplay:[^%]*%%|%%DatagouvDisplay:[^%]*%%|%%JsonGalleryDisplay:[^%]*%%)/);
    return contentParts.map((part, index) => {
      const matchDocs = part.match(/%%FilteredDocsDisplay:([^%]*)%%/);
      if (matchDocs) {
        const docsList = matchDocs[1].split(",").map((doc) => doc.trim());
        return <FilteredDocsDisplay key={`filtered-docs-display-${index}`} docsList={docsList} />;
      } else {
        const matchLinks = part.match(/%%FilteredLinksDisplay:([^%]*)%%/);
        if (matchLinks) {
          const linksList = matchLinks[1].split(",").map((link) => link.trim());
          return <FilteredLinksDisplay key={`filtered-links-display-${index}`} ids={linksList} />;
        } else {
          const matchDataGouv = part.match(/%%DatagouvDisplay:([^%]*)%%/);
          if (matchDataGouv) {
            const ids = matchDataGouv[1].split(",").map((id) => id.trim());
            return <DatagouvDisplay key={`datagouv-display-${index}`} ids={ids} />;
          } else {
            const matchJsonGallery = part.match(/%%JsonGalleryDisplay:([^%]*)%%/);
            if (matchJsonGallery) {
              const [filename, title] = matchJsonGallery[1].split(",").map((value) => value.trim());
              return <JsonGalleryDisplay key={`json-gallery-${index}`} filename={filename} title={title} />;
            } else {
              return <div key={`markdown-part-${index}`} dangerouslySetInnerHTML={{ __html: part }} />;
            }
          }
        }
      }
    });
  };  

  const TitleWithBackground = ({ title }) => {
    return (
      <div style={{ position: 'relative' }}>
        <h1 style={{
          position: 'relative',
          textAlign: 'center',
          fontSize: '3rem',
          color: 'white',
          zIndex: 1,
          padding: '1rem',
          lineHeight: '1em',
          background: '#173541',
          backgroundClip: 'text',
          borderRadius: '10px',
          fontWeight: '1000'
        }}>
          {title}
        </h1>
      </div>
    );
  };

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        const res = await fetch(`/api/docs?filename=${filename}`);
        const data = await res.json();
        setMetadata(data.metadata);
        setContent(marked(data.content));
      } catch (error) {
        console.error('Erreur lors de la récupération du contenu Markdown', error);
      }
    };

    fetchMarkdownContent();
  }, [filename]);

  return (
    <Layout>
      <div style={{ backgroundColor: 'white', margin: '0 auto', maxWidth: '800px', padding: '0 20px' }}>
        <TitleWithBackground title={metadata.title} />
        <br />
        <img
          src={metadata.image}
          alt={metadata.title}
          style={{ width: '100%', display: 'block', maxHeight: '400px', objectFit: 'cover', borderRadius: '10px' }}
        />
        <br />
        <p style={{ width: '100%', display: 'block', fontSize: '1.5rem', color: '#696969', textAlign: 'center' }}>{metadata.description}</p>
        <br />
        <div className={styles.markdownContent}>
          {createContentElements(content)}
        </div>
      </div>
    </Layout>
  );
};

export default MarkdownDocs;
