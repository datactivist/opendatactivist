// components/Summary.js
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import styles from '../pages/methodes/MethodPage.module.css';
import Link from 'next/link';

function Summary({ tableOfContents }) {
  return (
    <Box
      sx={{
        bgcolor: '#FFF1EB',
        borderRadius: '10px',
        p: 2,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography className={styles.h6} variant="h5" align="center" gutterBottom>
        Sommaire
      </Typography>
      <List>
        {tableOfContents.map((heading) => (
          <ListItem key={heading.slug}>
            <Link href={`#${heading.slug}`}>
              <ListItemText primary={heading.title} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Summary;
