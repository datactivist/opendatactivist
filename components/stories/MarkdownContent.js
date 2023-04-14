import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import styles from '/styles/MarkdownContent.module.css';

const MarkdownContent = ({ filename }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        const res = await fetch(`/api/markdown?filename=${filename}`);
        const data = await res.json();
        setContent(data.content);
      } catch (error) {
        console.error('Erreur lors de la récupération du contenu Markdown', error);
      }
    };

    fetchMarkdownContent();
  }, [filename]);

  return (
    <div
      className={styles.markdownContent}
      dangerouslySetInnerHTML={{ __html: content ? marked(content) : '' }}
    />
  );
};

export default MarkdownContent;
