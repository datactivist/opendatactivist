import React, { useState, useRef } from 'react'; 
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

const formatColors = {
  "API":"#90be6d",
  "CSV":"#90be6d",
  "XML": "#90be6d",
  "JSON" :"#90be6d",
  "GeoJSON": "#90be6d",
  "Dataviz - site web": "#7209b7",
  "Excel": "#f9c74f",
  "Format spécifique / chiffré": "#f8961e",
  "GTFS": "#577590",
  "Peu exploitable (ex : PDF)": "#f94144",
  "Variable": "#f9844a",
  "impression": "#9d0208"
};

const DataMapTable2 = ({ data }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const resizingRef = useRef(null); 

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setDialogOpen(true);
  }

  const handleMouseDown = (event, columnIndex) => {
    resizingRef.current = {
      startX: event.clientX,
      startWidth: event.target.parentElement.offsetWidth,
      columnIndex,
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleMouseMove = (event) => {
    if (resizingRef.current) {
      const { startX, startWidth, columnIndex } = resizingRef.current;
      const newWidth = startWidth + (event.clientX - startX);
      document.querySelector(`th:nth-child(${columnIndex + 1})`).style.width = `${newWidth}px`;
    }
  };
  
  
  const handleMouseUp = () => {
    resizingRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
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
    <th className={`${styles.stickyColumn} stickyColumn`}>Jeu de données<div className={styles.resizeHandle} onMouseDown={(e) => handleMouseDown(e, 0)} /></th>
              <th style={{ width: '400px' }}>Description<div className={styles.resizeHandle} onMouseDown={(e) => handleMouseDown(e, 1)} /></th>
              <th style={{ width: '200px' }}>URL<div className={styles.resizeHandle} onMouseDown={(e) => handleMouseDown(e, 2)} /></th>
              <th style={{ width: '200px' }}>Producteur<div className={styles.resizeHandle} onMouseDown={(e) => handleMouseDown(e, 3)} /></th>
              <th style={{ width: '400px' }}>Tags<div className={styles.resizeHandle} onMouseDown={(e) => handleMouseDown(e, 4)} /></th>
              <th style={{ width: '250px' }}>Accès<div className={styles.resizeHandle} onMouseDown={(e) => handleMouseDown(e, 5)} /></th>
              <th style={{ width: '300px' }}>Format<div className={styles.resizeHandle} onMouseDown={(e) => handleMouseDown(e, 6)} /></th>
              <th style={{ width: '150px' }}>Nombre d‘enregistrements<div className={styles.resizeHandle} onMouseDown={(e) => handleMouseDown(e, 7)} /></th>
              <th style={{ width: '100px' }}>Datamap Id<div className={styles.resizeHandle} onMouseDown={(e) => handleMouseDown(e, 8)} /></th>
              <th style={{ width: '200px' }}>Datamap Label<div className={styles.resizeHandle} onMouseDown={(e) => handleMouseDown(e, 9)} /></th>
              <th style={{ width: '100px' }}>Date de la recherche<div className={styles.resizeHandle} onMouseDown={(e) => handleMouseDown(e, 10)} /></th>
              <th style={{ width: '100px' }}>Datagouv Id<div className={styles.resizeHandle} onMouseDown={(e) => handleMouseDown(e, 11)} /></th>
              <th style={{ width: '200px' }}>Datamap Perimeter<div className={styles.resizeHandle} onMouseDown={(e) => handleMouseDown(e, 12)} /></th>
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
                    <div style={{flex: '0 0 90%', display: 'flex', alignItems: 'center'}}>
                      {row['data-label']}
                    </div>
                  </div>
                </td>
                <td>{row['data-description']}</td>
                <td className={styles.tableData}><a href={row['data-url']} className={styles.tableLink}>🔗 Voir les données</a></td>
                <td className={styles.tableData}>
                {row['data-producer'].split(',').map((producer, index) => (
                  <span key={index} className={styles.producer}>
                    {producer.trim()}
                  </span>
                ))}
              </td>
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
                <td>
                  {row['data-format'].split(',').map((format, index) => (
                    <span 
                      key={index} 
                      className={styles.format}
                      style={{ color: 'white', backgroundColor: formatColors[format.trim()] }}>
                      {format.trim()}
                    </span>
                  ))}
                </td>
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
