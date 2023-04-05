import Link from 'next/link';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

export default function CellCard({ cell }) {
  if (!cell) return null;
  
  const { title = '', description = '', slug, image, content } = cell;

  return (
    <Link href={`/cells/${slug}`}>
      <a>
        <Card variant="outlined">
          {image && (
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt={title}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
