import React from 'react';
import { Grid, Typography } from '@mui/material';
import UsageCard from './UsageCard';

const UsageGallery = ({ usages }) => {
  return (
    <Grid item xs={12}>
      <Typography variant="h5" gutterBottom>
        Cas d'utilisation
      </Typography>
      <Grid container spacing={2} justifyContent="left">
        {usages.map((usage) => (
          <Grid item key={usage.slug} xs={12} sm={6} md={4}>
            <UsageCard usage={{ title: usage.title, slug: usage.slug, image: usage.image }} image={usage.image} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default UsageGallery;
