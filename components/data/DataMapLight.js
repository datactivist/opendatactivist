import React, { useState } from 'react';
import DataMapDialog from './DataMapDialog';
import styles from '../../styles/DataMapLight.module.css';

const DataMapLight = ({ data }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  return (
    <div>
      <DataMapDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        data={selectedRow} 
      />
      <div className={styles.scrollableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={`${styles.stickyColumn} stickyColumn`}>Jeu de données</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((row, index) => (
              <tr 
                key={index} 
                className={styles.rowHeight}
                onMouseEnter={() => setHoverIndex(index)} 
                onMouseLeave={() => setHoverIndex(null)}  
              >
                <td className={styles.stickyColumn}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{flex: '0 0 12%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <button 
                        className={styles.button}
                        style={{ opacity: hoverIndex === index ? 1 : 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(row);
                        }}
                        title="Voir la fiche"
                      >
                        <img src="/images/icons/expand.svg" alt="expand" style={{width: '24px', height: '24px'}} />
                      </button>
                    </div>
                    <div style={{flex: '0 0 90%', display: 'flex', alignItems: 'center'}}>
                      {row['data-label']}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataMapLight;
