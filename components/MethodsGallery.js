import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import styles from './UsageGallery.module.css';

const MethodsGallery = ({ methods }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Grid item xs={12} className={styles.UsageGallery}>
      <Typography variant="h4" gutterBottom>
        Méthode utilisée
      </Typography>
      <Grid container spacing={2} justifyContent="left">
        {methods.map((method) => (
          <Grid item key={method.slug} xs={12} md={4}>
            <Link href={`/methodes/${method.slug}`} passHref>
              <Card component="a" sx={{ textDecoration: 'none', height: '40%' }}>
                {method.image && (
                  <img src={method.image} alt={method.title} style={{ width: '60%' }} />
                )}
                <CardContent>
                  <Typography variant="h7" component="h3" gutterBottom>
                    {method.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {method.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default MethodsGallery;
