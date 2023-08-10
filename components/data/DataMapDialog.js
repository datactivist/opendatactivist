import React from 'react';
import { Dialog, DialogTitle, DialogContent as MuiDialogContent, Typography } from '@mui/material';
import styles from '../../styles/DataMapTable2.module.css';
import { styled } from '@mui/system';

const getColorByLength = (length) => {
  if (length < 3) return '#';
  if (length === 3) return '#fff1e6';
  if (length === 4) return '#fde2e4';
  if (length === 5) return '#caffbf';
  if (length === 6) return '#e2ece9';
  if (length === 7) return '#bee1e6';
  if (length === 8) return '#f0efeb';
  if (length === 9) return '#eae4e9';
  if (length === 10) return '#dfe7fd';
  if (length === 11) return '#cddafd';
  if (length === 12) return '#d7e1fd';
  if (length === 13) return '#f9c6c9';
  if (length === 14) return '#dbcdf0';
  if (length === 15) return '#c6def1';
  if (length === 16) return '#c9e4de';
  if (length === 17) return '#faedcb';
  return '#f5efe8'; 
}; 

const accessColors = {
  "Open data": "#023047",
  "Accès sous condition": "#219ebc",
  "Données jamais ouvertes": "#e63946",
  "Accès restreint": "#ffb703",
  "Aucun accès": "#fb8500",
};

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

const FieldName = styled(Typography)({
  fontSize: '18px',
});

const FieldValue = styled(Typography)({
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '15px',
});

const DialogContent = styled(MuiDialogContent)({
  backgroundColor: '#f5f5f5', 
});

const DataMapDialog = ({ open, onClose, data }) => {
  if (!data) {
    return null;
  }

  const fields = Object.keys(data).filter(field => field !== 'data-id');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{data['data-label']}</DialogTitle>
      <DialogContent>
        {fields.map((field, index) => (
          field !== 'data-label' && (
            <div key={index}>
              <FieldName variant="body1" color="textSecondary">
                {field.replace('-', ' ')}:
              </FieldName>
              <FieldValue variant="body2">
                {field === 'data-url' ? (
                  <a href={data[field]} className={styles.tableLink}>🔗 Voir les données</a>
                ) : field === 'data-access' ? (
                  data[field].split(',').map((access, index) => (
                    <span 
                      key={index} 
                      className={styles.access}
                      style={{ color: 'white', backgroundColor: accessColors[access.trim()] }}>
                      {access.trim()}
                    </span>
                  ))
                  ) : field === 'data-format' ? (
                    data[field].split(',').map((format, index) => (
                      <span 
                        key={index} 
                        className={styles.format}
                        style={{ color: 'white', backgroundColor: formatColors[format.trim()] }}>
                        {format.trim()}
                      </span>
                    ))
                ) : field === 'data-producer' ? (
                  data[field].split(',').map((producer, index) => (
                    <span key={index} className={styles.producer}>
                      {producer.trim()}
                    </span>
                  ))
                ) : field === 'data-tags' ? data[field].split(',').map((tag) => (
                  <span 
                  key={index} 
                  className={styles.tag}
                  style={{ backgroundColor: getColorByLength(tag.trim().length) }}>
                  {tag.trim()}
                </span>
                )) : (
                  data[field]
                )}
              </FieldValue>
            </div>
          )
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default DataMapDialog;
