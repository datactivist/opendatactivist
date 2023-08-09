import React from 'react';
import { Dialog, DialogTitle, DialogContent as MuiDialogContent, Typography } from '@mui/material';
import styles from '../../styles/DataMapTable2.module.css';
import { styled } from '@mui/system';

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
                ) : field === 'data-tags' ? data[field].split(',').map((tag, idx) => (
                  <span 
                    key={idx} 
                    className={styles.tag}
                    style={{ backgroundColor: colors[idx % colors.length] }}>
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
