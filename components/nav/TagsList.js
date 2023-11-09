// components/TagsList.js
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/Tags.module.css';
import Layout from '../Layout';

const TagsList = () => {
  const [tagCounts, setTagCounts] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch('/api/docs?action=list');
      const data = await response.json();

      // Compter les occurrences de chaque tag
      const counts = {};
      data.forEach((doc) => {
        doc.metadata.tags.forEach((tag) => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
      });

      // Convertir l'objet en tableau et trier par count
      const sortedTags = Object.keys(counts)
        .map((tag) => {
          return { tag, count: counts[tag] };
        })
        .sort((a, b) => b.count - a.count);

      setTagCounts(sortedTags);
    };

    fetchTags().catch(console.error);
  }, []);

  return (
    <Layout>
      <div className={styles.tagListContainer}>
        {tagCounts.map((tagObj, index) => (
          <Link
            href={`/docs?tag=${encodeURIComponent(tagObj.tag)}`}
            key={index}
            passHref
          >
            <button className={styles.tagButton}>
              ﹟{tagObj.tag}{' '}
              <span className={styles.tagCount}>({tagObj.count})</span>
            </button>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default TagsList;
