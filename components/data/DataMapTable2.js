import React, { useState } from 'react'; 
import styles from '../../styles/DataMapTable2.module.css';
import DataMapDialog from './DataMapDialog';

const accessColors = {
  "Open data": "#023047",
  "Accès sous condition": "#219ebc",
  "Données jamais ouvertes": "#e63946",
  "Accès restreint": "#ffb703",
  "Aucun accès": "#fb8500",
};

const colors = [
  '#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff',
  '#a0c4ff', '#bdb2ff', '#ffc6ff', '#fffffc', '#b5b9bc'
];  

const DataMapTable2 = ({ data }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null); 

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setDialogOpen(true);
  }

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
              <th className={styles.stickyColumn}>Data Label</th>
              <th style={{ width: '400px' }}>Data Description</th>
              <th style={{ width: '200px' }}>Data URL</th>
              <th style={{ width: '200px' }}>Data Producer</th>
              <th style={{ width: '400px' }}>Data Tags</th>
              <th style={{ width: '250px' }}>Data Access</th>
              <th style={{ width: '300px' }}>Data Format</th>
              <th style={{ width: '150px' }}>Data Record Count</th>
              <th style={{ width: '100px' }}>Datamap Id</th>
              <th style={{ width: '200px' }}>Datamap Label</th>
              <th style={{ width: '100px' }}>Search Date</th>
              <th style={{ width: '100px' }}>Datagouv Id</th>
              <th style={{ width: '200px' }}>Datamap Perimeter</th>
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
                <div style={{display: 'flex'}}>
                    <div style={{flex: '0 0 10%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <button 
                        className={styles.button}
                        style={{ opacity: hoverIndex === index ? 1 : 0 }}  // Change this line
                        onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(row);
                        }}
                        title="Voir la fiche"
                    >
                        <img src="/images/icons/expand.svg" alt="expand" style={{width: '24px', height: '24px'}} />
                    </button>
                    </div>
                    <div style={{flex: '0 0 90%'}}>
                    {row['data-label']}
                    </div>
                </div>
                </td>
                <td>{row['data-description']}</td>
                <td className={styles.tableData}><a href={row['data-url']} className={styles.tableLink}>🔗 Voir les données</a></td>
                <td>{row['data-producer']}</td>
                <td className={styles.tableData}>
                  {row['data-tags'].split(',').map((tag, index) => (
                    <span 
                      key={index} 
                      className={styles.tag}
                      style={{ backgroundColor: colors[index % colors.length] }}>
                      {tag.trim()}
                    </span>
                  ))}
                </td>      
                <td>
                  {row['data-access'].split(',').map((access, index) => (
                    <span 
                      key={index} 
                      className={styles.access}
                      style={{ color: 'white', backgroundColor: accessColors[access.trim()] }}>
                      {access.trim()}
                    </span>
                  ))}
                </td>
                <td>{row['data-format']}</td>
                <td>{row['data-record-count']}</td>
                <td>{row['datamap-id']}</td>
                <td>{row['datamap-label']}</td>
                <td>{row['search-date']}</td>
                <td>{row['datagouv-id']}</td>
                <td>{row['datamap-perimeter']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataMapTable2;
