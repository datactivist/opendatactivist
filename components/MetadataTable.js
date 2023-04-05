// components/MetadataTable.js
import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';



const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy', { locale: fr });
  };
  

  const MetadataTable = ({ metadata }) => {
    return (
      <TableContainer component={Box} sx={{ bgcolor: '#fff', borderRadius: '10px', p: 0, mt:3, mb: 2}}>
        <Table aria-label="metadata table">
          <TableBody>
            {Object.entries(metadata).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  <Typography variant="body2" fontWeight="bold">
                    {key}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">{key === 'Dernière mise à jour' ? formatDate(value) : value}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

export default MetadataTable;
