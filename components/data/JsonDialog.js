import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import styles from '../../styles/JsonGallery.module.css';

const JsonDialog = ({ selectedCard, handleClose }) => {
  const isUrl = (value) => typeof value === 'string' && value.startsWith('http');

  return (
    <Dialog open={!!selectedCard} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle className={styles.dialogTitle}>{Object.entries(selectedCard)[0][1]}</DialogTitle>
      <DialogContent className={styles.dialogBackground}>
        {Object.entries(selectedCard).slice(1).map(([key, content], i) => (
          <div key={i} className={styles.dialogField}>
            <Typography variant="h6" component="div">
              <strong>{key}</strong>
            </Typography>
            {isUrl(content) ? (
              <Typography variant="body1" component="div">
                <a href={content} target="_blank" rel="noopener noreferrer">
                  <LinkIcon style={{ verticalAlign: 'middle' }} /> Accéder au site
                </a>
              </Typography>
            ) : (
              <Typography variant="body1" component="div">
                {content}
              </Typography>
            )}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default JsonDialog;
