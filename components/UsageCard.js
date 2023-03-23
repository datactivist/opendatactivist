import Link from 'next/link';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

export default function UsageCard({ usage }) {
  const { title, description, slug, image, content } = usage;

  return (
    <Link href={`/usages/${slug}`}>
      <Card sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardActionArea sx={{ flexGrow: 1 }}>
          {image && (
            <CardMedia component="img" image={image} alt={title} height="140" />
          )}
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" sx={{ fontFamily: 'Montserrat' }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
