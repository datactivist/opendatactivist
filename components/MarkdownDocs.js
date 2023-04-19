import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import styles from '/styles/MarkdownContent.module.css';
import Layout from './Layout';

const MarkdownDocs = ({ filename }) => {
  const [metadata, setMetadata] = useState({});
  const [content, setContent] = useState('');

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

  const openFullscreen = (e) => {
    e.preventDefault();
    const iframe = e.target.closest(".responsiveIframe").querySelector("iframe");
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) { // Safari
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE11
      iframe.msRequestFullscreen();
    }
  };

  useEffect(() => {
    const handleButtonClick = (e) => {
      if (e.target.closest(".fullscreen-button")) {
        openFullscreen(e);
      }
    };

    document.addEventListener("click", handleButtonClick);
    return () => document.removeEventListener("click", handleButtonClick);
  }, []);


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
      <div style={{ backgroundColor: 'white', marginLeft: '10em', marginRight: '10em' }}> {/* Conteneur externe avec fond rose */}
        <h1 style={{ textAlign: 'center', fontSize: '3rem' }}>{metadata.title}</h1>
        <br></br>
        <img
          src={metadata.image}
          alt={metadata.title}
          style={{ width: '100%', display: 'block', marginLeft: 'auto', marginRight: 'auto', borderRadius: '20px' }}
        />
        <br></br>
        <p style={{ width: '80%', display: 'block', marginLeft: 'auto', fontSize:'1.5rem', marginRight: 'auto', color: '#696969' ,textAlign: 'center'}}>{metadata.description}</p>
        <br></br>
        <div
          className={styles.markdownContent}
          dangerouslySetInnerHTML={{ __html: content ? content : '' }}
        />


      </div>
    </Layout>
  );
};

export default MarkdownDocs;
