import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

const DataMapDialog = ({ open, onClose, data }) => {
  if (!data) {
    return null;
  }

  const fields = Object.keys(data);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Data Details</DialogTitle>
      <DialogContent>
        {fields.map((field, index) => (
          <div key={index}>
            <Typography variant="body1" color="textSecondary">
              {field.replace('-', ' ')}:
            </Typography>
            <Typography variant="body2">
              {Array.isArray(data[field]) ? data[field].join(', ') : data[field]}
            </Typography>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default DataMapDialog;
