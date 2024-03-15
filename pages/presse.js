// pages/presse.js
import React, { useEffect, useState } from 'react';
import styles from '../styles/Presse.module.css'; // Vérifie le chemin
import Layout from '../components/Layout';

export default function Presse() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/quotes?action=list')
      .then((response) => response.json())
      .then((data) => {
        // Assure que les articles sont classés du plus récent au plus ancien dès la récupération
        const sortedData = data.sort((a, b) => new Date(b['Date published']) - new Date(a['Date published']));
        setArticles(sortedData);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  };

  const filteredArticles = articles.filter(article =>
    article.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.Abstract.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className={styles.pressPage}>
        <h1 className={styles.pressPageTitle}>Revue de presse</h1>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.grid}>
          {filteredArticles.map((article) => (
            <a href={article.Link} key={article.ID} className={styles.card}>
              <img src={article.journal_image} alt={article.Journal} className={styles.mediaImage} />
              <div className={styles.cardContent}>
                <h2 className={styles.articleTitle}>{article.Title}</h2>
                <p>{article.Abstract}</p>
                <p className={styles.date}>{formatDate(article['Date published'])}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
}
