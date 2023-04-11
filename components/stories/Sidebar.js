import React from 'react';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.css';

const Sidebar = ({ sidebarData }) => {
  const { title, topics } = sidebarData;
  const router = useRouter();

  const navigateToTopic = (topic) => {
    router.push(`/topics/${topic.toLowerCase().replace(/ /g, '-')}`);
  };

  return (
    <div className={styles.sidebar}>
      <br />
      <br />
      <h3>{title}</h3>
      <hr></hr>
      <br></br>
      {topics && (
        <div className={styles.sidebar__list}>
          {topics.map((topic, index) => (
            <div key={index} className={styles.sidebar__item}>
              <span
                style={{
                  backgroundColor: '#fff',
                  color: 'black',
                  padding: '0.5em',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginBottom: '10px',
                  fontSize: '14px',
                }}
              >
                {topic}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
