import React from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import styles from './UsageGallery.module.css';

const MethodNext = ({ nextMethodSlug, nextMethodTitle }) => {
  return (
    <Link href={`/methodes/${nextMethodSlug}`} passHref>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#fff',
          borderColor: '#000',
          marginBottom: '10px',
          marginLeft: '1rem',
          marginRight: '10px',
          marginTop: '5px',
          borderWidth: '0.3px',
          borderStyle: 'solid',
          borderRadius: '10px',
          color: '#000',
          fontWeight: 'regular',
          fontSize: '0.9rem',
          textAlign: 'left',
          '&:hover': {
            backgroundColor: '#E95459',
            color: '#fff',
          },
        }}
      >
        👉 {nextMethodTitle} {/* Replace nextMethodSlug with nextMethodTitle */}
      </Button>
    </Link>
  );
};

export default MethodNext;
