import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { gallery } = req.query;

  if (!gallery) {
    return res.status(400).json({ error: 'Paramètre gallery requis' });
  }

  const dirPath = path.join(process.cwd(), 'public', 'images', 'galleries', gallery);
  
  if (!fs.existsSync(dirPath)) {
    return res.status(404).json({ error: 'Galerie non trouvée' });
  }

  const files = fs.readdirSync(dirPath);
  const imageUrls = files.map(file => `http://${req.headers.host}/images/galleries/${gallery}/${file}`);
  
  res.status(200).json({ images: imageUrls });
}
