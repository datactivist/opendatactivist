import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import styles from './MethodCard.module.css';

export default function MethodCard({ method }) {
  return (
    <Link href={`/methodes/${method.slug}`} passHref>
      <Card className={styles.card}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" className={styles.title}>
            {method.title}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{
            height: 140,
            objectFit: 'cover',
          }}
          image={method.image}
          alt={method.title}
        />
        <CardContent>
          <Box className={styles.description}>
            <Typography variant="body2" color="text.secondary" className={styles.description}>
              {method.description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
