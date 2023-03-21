// components/MethodCard.js

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

export default function MethodCard({ method }) {
  return (
    <Link href={`/methodes/${method.slug}`} passHref>
      <Card
        sx={{
          cursor: 'pointer',
          maxWidth: 345,
          boxShadow: 3,
          borderRadius: 2,
          '&:hover': {
            boxShadow: 5,
            transform: 'scale(1.02)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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
          <Box sx={{ height: 60 }}> {/* Ajoutez une boîte pour gérer la hauteur de la description */}
            <Typography variant="body2" color="text.secondary">
              {method.description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
