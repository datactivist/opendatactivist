import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';

const Sidebar = ({ sidebarData, sectionsData, tabs }) => {
  const { title, topics } = sidebarData;
  const router = useRouter();

  const navigateToTopic = (topic) => {
    const encodedTopic = encodeURIComponent(topic.toLowerCase());
    router.push(`/stories?topic=${encodedTopic}`);
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(-1);

  useEffect(() => {
    // Find the active section based on the active tab
    const activeTab = tabs.find((tab) => {
      const tabHash = `#${tab.title.replace(/\s+/g, '-').toLowerCase()}`;
      return window.location.hash.startsWith(tabHash);
    });

    if (activeTab) {
      const activeSectionIndex = sectionsData.findIndex(
        (section) => section.section === activeTab.section
      );
      setActiveSectionIndex(activeSectionIndex);
    }
  }, [tabs]);

  const isActiveSection = (section, index) => {
    return activeSectionIndex === index;
  };

  return (
    <div className={styles.sidebar}>
      <br />
      <br />
      <div className={styles.titleBox}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.sidebar__sections}>
        <h4>Sommaire</h4>
        <ul className={styles.sectionList}>
          {sectionsData.map((sectionData, index) => (
            <li key={index} className={styles.sectionListItem}>
              <a
                href={`#${sectionData.anchor}`}
                className={
                  isActiveSection(sectionData.section, index)
                    ? `${styles.sectionLink} ${styles.sectionLinkActive}`
                    : styles.sectionLink
                }
                onClick={() => setActiveSectionIndex(index)}
              >
                {sectionData.section}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <br />
      <h4>Sujets</h4>
      {topics && (
        <div className={styles.sidebar__list}>
          {topics.map((topic, index) => (
            <div key={index} className={styles.sidebar__item}>
              <span
                className={styles.topicButton}
                onClick={() => navigateToTopic(topic)}
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

Sidebar.propTypes = {
  sidebarData: PropTypes.object.isRequired,
  sectionsData: PropTypes.arrayOf(
    PropTypes.shape({
      section: PropTypes.string.isRequired,
      anchor: PropTypes.string.isRequired,
    })
  ),
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      section: PropTypes.string.isRequired,
      component: PropTypes.elementType.isRequired,
      props: PropTypes.object.isRequired,
    })
  ),
};

Sidebar.defaultProps = {
  sectionsData: [],
  tabs: [],
};

export default Sidebar;
