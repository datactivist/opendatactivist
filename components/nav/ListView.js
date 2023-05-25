// ListView.js
import styles from '../../styles/ListView.module.css';  // Assume that you have a ListView.module.css file.
import tagStyles from '../../styles/Tags.module.css';
import { useRouter } from 'next/router';

const RenderTagButtons = (tags, tagRoute) => {
  const router = useRouter();
  if (tags) {
    return tags.map((tag) => {
      const handleClick = (e) => {
        e.stopPropagation(); // Ajouter ici
        router.push(`/${tagRoute}?tag=${encodeURIComponent(tag)}`);
      };
      return (
        <button key={tag} onClick={handleClick} className={tagStyles.tag}>
          {tag}
        </button>
      );
    });
  }
  return null;
};

const ListView = ({ items, onClick, tagRoute, showTags = true }) => {
  const handleClick = (item) => {
    if (item.url) {
      window.open(item.url, '_blank');
    } else {
      onClick(item.name);
    }
  };

  const renderItem = (item) => (
    <>
      <a className={styles.title} onClick={() => handleClick(item)}>
        {item.metadata ? item.metadata.title : item.title}
      </a>
      <p className={styles.description}>
        {item.metadata ? item.metadata.description : item.description}
      </p>
      {showTags && RenderTagButtons(item.metadata?.tags || item.tags, tagRoute)}
    </>
  );

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
