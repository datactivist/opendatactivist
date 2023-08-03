// DataMapTable.js
import React, { useEffect, useState } from 'react';
import styles from '../../styles/DataMapTable.module.css';

const DataMapTable = ({ search }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
  
    const url = search 
      ? `/api/datamap?search=${encodeURIComponent(search)}` 
      : '/api/datamap?all=data';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setData([]);
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) setData(data);
      });
  }, [search]);

  const colors = [
    '#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff',
    '#a0c4ff', '#bdb2ff', '#ffc6ff', '#fffffc', '#b5b9bc'
  ];  

  const accessColors = {
    "Open data": "#023047",
    "Accès sous condition": "#219ebc",
    "Données jamais ouvertes": "#e63946",
    "Accès restreint": "#ffb703",
    "Aucun accès": "#fb8500",
};


  return (
<div style={{ overflow: 'auto' }}>
  <table className={styles.dataMapTable}>
          <thead>
        <tr>
          <th className={`${styles.tableHeader} ${styles.tdWidthLarge}`}>Label</th>
          <th className={`${styles.tableHeader} ${styles.tdWidthExtraLarge}`}>Description</th>
          <th className={`${styles.tableHeader} ${styles.tdWidthMedium}`}>URL</th>
          <th className={`${styles.tableHeader} ${styles.tdWidthMedium}`}>Producer</th>
          <th className={`${styles.tableHeader} ${styles.tdWidthExtraLarge}`}>Tags</th>
          <th className={`${styles.tableHeader} ${styles.tdWidthMedium}`}>Access</th>
          <th className={`${styles.tableHeader} ${styles.tdWidthMedium}`}>Format</th>
          <th className={`${styles.tableHeader} ${styles.tdWidthSmall}`}>Record Count</th>
          <th className={`${styles.tableHeader} ${styles.tdWidthSmall}`}>Datamap ID</th>
          <th className={`${styles.tableHeader} ${styles.tdWidthMedium}`}>Datamap Label</th>
          <th className={`${styles.tableHeader} ${styles.tdWidthSmall}`}>Search Date</th>
          <th className={`${styles.tableHeader} ${styles.tdWidthSmall}`}>Datagouv ID</th>
          <th className={`${styles.tableHeader} ${styles.tdWidthMedium}`}>Perimeter</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item['data-id']} className={styles.tableRow}>
            <td className={styles.tableData}>{item['data-label']}</td>
            <td className={styles.tableData}>{item['data-description']}</td>
            <td className={styles.tableData}><a href={item['data-url']} className={styles.tableLink}>Lien vers les données</a></td>
            <td className={styles.tableData}>{item['data-producer']}</td>
            <td className={styles.tableData}>
            {item['data-tags'].split(',').map((tag, index) => (
                <span 
                    key={index} 
                    className={styles.tag}
                    style={{ backgroundColor: colors[index % colors.length] }}>
                    {tag.trim()}
                </span>
            ))}
            </td>
            <td className={styles.tableData}>
                {item['data-access'].split(',').map((access, index) => (
                    <span 
                        key={index} 
                        className={styles.access}
                        style={{ color: 'white', backgroundColor: accessColors[access.trim()] }}>
                        {access.trim()}
                    </span>
                ))}
            </td>
            <td className={styles.tableData}>{item['data-format']}</td>
            <td className={styles.tableData}>{item['data-record-count']}</td>
            <td className={styles.tableData}>{item['datamap-id']}</td>
            <td className={styles.tableData}>{item['datamap-label']}</td>
            <td className={styles.tableData}>{item['search-date']}</td>
            <td className={styles.tableData}>{item['datagouv-id']}</td>
            <td className={styles.tableData}>{item['datamap-perimeter']}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default DataMapTable;
