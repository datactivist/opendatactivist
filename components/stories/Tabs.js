import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Styles from '../../styles/Tabs.module.css';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const activeTabRef = useRef(null);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    window.location.hash = tabs[tabIndex].title.replace(/\s+/g, '-').toLowerCase();
  };

  const setActiveTabFromUrl = () => {
    const hash = window.location.hash;
    const tabTitle = hash ? hash.substr(1).replace(/-/g, ' ') : '';
    const tabIndex = tabs.findIndex((tab) => tab.title === tabTitle);
    if (tabIndex !== -1) {
      setActiveTab(tabIndex);
    }
  };

  useEffect(() => {
    setActiveTabFromUrl();
    window.addEventListener('hashchange', setActiveTabFromUrl);
    return () => window.removeEventListener('hashchange', setActiveTabFromUrl);
  }, []);

  useEffect(() => {
    if (containerRef.current && activeTabRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const activeTabWidth = activeTabRef.current.offsetWidth;
      const activeTabLeft = activeTabRef.current.offsetLeft;
      const containerScrollLeft =
        activeTabLeft - containerWidth / 2 + activeTabWidth / 2;
      containerRef.current.scrollLeft = containerScrollLeft;
    }
  }, [activeTab]);

  const activeComponent = tabs[activeTab].component;
  const activeProps = tabs[activeTab].props;

  return (
    <div className={Styles.container}>
      <div className={Styles.breadcrumb} ref={containerRef}>
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          const isPrevious = index === activeTab - 1;
          const isNext = index === activeTab + 1;
          const isVisible = isActive || isPrevious || isNext;
          return isVisible ? (
            <button
              key={index}
              ref={isActive ? activeTabRef : null}
              className={`${Styles.tab} ${
                isActive ? Styles.active : ''
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </button>
          ) : null;
        })}
      </div>

      <div className={Styles.tabContent}>
        {React.createElement(activeComponent, activeProps)}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      component: PropTypes.elementType.isRequired,
      props: PropTypes.object,
    }).isRequired
  ).isRequired,
};

export default Tabs;
