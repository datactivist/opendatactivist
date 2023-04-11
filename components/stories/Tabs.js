import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Styles from '../../styles/Tabs.module.css';

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    const containerRef = useRef(null);
    const activeTabRef = useRef(null);
    const [activeSection, setActiveSection] = useState('');

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
        setActiveSection(tabs[activeTab]?.section || '');
    }, [activeTab]);

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
        <div>
            <div className={Styles.sectionTitle}>
                {activeSection}
            </div>
            <div className={Styles.tabsContainer} ref={containerRef}>
                {tabs.map((tab, index) => {
                    const isActive = index === activeTab;
                    const isPrevious = index === activeTab - 1;
                    const isNext = index === activeTab + 1;

                    if (isActive || isPrevious || isNext) {
                        return (
                            <button
                                key={index}
                                ref={isActive ? activeTabRef : null}
                                className={`${Styles.tab} ${isActive ? Styles.active : ''}`}
                                onClick={() => handleTabClick(index)}
                                style={{ backgroundColor: isActive ? '#e95459' : '' }}
                            >
                                {tab.title}
                            </button>
                        );
                    }
                    return null;
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
            section: PropTypes.string.isRequired,
            component: PropTypes.elementType.isRequired,
            props: PropTypes.object,
        }).isRequired
    ).isRequired,
};

export default Tabs;
