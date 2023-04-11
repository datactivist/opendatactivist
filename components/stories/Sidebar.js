import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';


const Sidebar = ({ sidebarData, sectionsData, tabs }) => {
    const { title, topics } = sidebarData;
    const router = useRouter();
  
    const navigateToTopic = (topic) => {
      router.push(`/topics/${topic.toLowerCase().replace(/ /g, '-')}`);
    };
  
    const [activeSection, setActiveSection] = useState('');
  
    const [activeTab, setActiveTab] = useState('');
  
    const updateActiveSection = () => {
      const currentHash = window.location.hash;
    
      // Find the first tab in the section that matches the current hash.
      const activeTab = tabs.find((tab) => {
        const tabHash = `#${tab.title.replace(/\s+/g, '-').toLowerCase()}`;
        return currentHash.startsWith(tabHash);
      });
    
      // Update the active section based on the found tab.
      if (activeTab) {
        setActiveSection(activeTab.section);
        setActiveTab(activeTab);
      } else {
        setActiveSection('');
        setActiveTab('');
      }
    };
  
    const isActiveSection = (section) => {
        if (typeof window === "undefined") {
          return false;
        }
      
        const activeTab = tabs.find((tab) => {
          const tabHash = `#${tab.title.replace(/\s+/g, '-').toLowerCase()}`;
          return window.location.hash.startsWith(tabHash);
        });
      
        const isVisible = activeTab?.title?.replace(/\s+/g, '-')?.toLowerCase() === section.replace(/\s+/g, '-').toLowerCase();
      
        return activeTab && activeTab.section === section && isVisible;
      };
      
  
    useEffect(() => {
      updateActiveSection();
      window.addEventListener('hashchange', updateActiveSection);
  
      return () => {
        window.removeEventListener('hashchange', updateActiveSection);
      };
    }, []);
  
    return (
      <div className={styles.sidebar}>
        <br />
        <br />
        <h3>{title}</h3>
        <hr />
        <div className={styles.sidebar__sections}>
          <h4>Sommaire</h4>
          <ul className={styles.sectionList}>
            {sectionsData.map((sectionData, index) => (
              <li key={index} className={styles.sectionListItem}>
                <a
                  href={`#${sectionData.anchor}`}
                  className={
                    isActiveSection(sectionData.section)
                      ? `${styles.sectionLink} ${styles.sectionLinkActive}`
                      : styles.sectionLink
                  }
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
                  style={{
                    backgroundColor: "#fff",
                    color: "black",
                    padding: "0.5em",
                    borderRadius: "4px",
                    display: "inline-block",
                    marginBottom: "10px",
                    fontSize: "14px",
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
