import React, { useEffect } from 'react';
import styles from '../../styles/apps/PeriodicTable.module.css';

const Popup = ({ title, description, onClose }) => {
  // Effect for adding and cleaning up the global click event listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Assuming your popup content is wrapped in a div with a ref attached to it
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add click event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Ref for the popup content
  const popupRef = React.createRef();

  return (
    <div className={styles.popup}>
      {/* Add ref to the popup content div */}
      <div ref={popupRef} className={styles.popupContent}>
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Popup;
