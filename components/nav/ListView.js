// ListView.js
import styles from '../../styles/ListView.module.css';
import tagStyles from '../../styles/Tags.module.css';
import { useRouter } from 'next/router';

const ListView = ({ items, tagRoute, showTags = true }) => {
  const router = useRouter();

  const handleItemClick = (item) => {
    // This should be the same property used in Cards for routing
    const docName = item['﻿name'];
    if (docName) {
      router.push(`/docs/${docName}`);
    } else {
      console.error('Document name is undefined');
    }
  };

  const renderItem = (item) => {
    // Handle tags as in Cards component
    const tagsArray = typeof item.tags === 'string' ? item.tags.split(',').map(tag => tag.trim()) : item.tags;

    return (
      <>
        <a className={styles.title} onClick={() => handleItemClick(item)}>
          {item.title}
        </a>
        <p className={styles.description}>
          {item.description}
        </p>
        {showTags && tagsArray && tagsArray.map((tag) => (
          <button key={tag} className={tagStyles.tag} onClick={(e) => {
            e.stopPropagation();
            router.push(`/${tagRoute}?tag=${encodeURIComponent(tag)}`);
          }}>
            {tag}
          </button>
        ))}
      </>
    );
  };

  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li key={index} className={styles.listItem}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default ListView;
