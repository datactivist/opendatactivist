import Link from 'next/link';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

export default function UsageCard({ usage }) {
  const { title, description, slug, image, content } = usage;

  return (
    <Card>
      <Link href={`/usages/${slug}`}>
        <CardActionArea>
          {image && (
            <CardMedia component="img" image={image} alt={title} height="140" />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}