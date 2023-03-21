import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

export default function MethodsGallery({ methods }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
      {methods.map((method) => (
        <Grid item key={method.slug} xs={12} md={6}>
          <Link href={`/methodes/${method.slug}`} passHref>
            <Card component="a" sx={{ textDecoration: 'none', height: '100%' }}>
              {method.image && (
                <img src={method.image} alt={method.title} style={{ width: '100%' }} />
              )}
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {method.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {method.description}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
