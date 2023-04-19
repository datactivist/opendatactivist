import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default async function handler(req, res) {
  const { filename, action } = req.query;

  if (action === 'list') {
    try {
      const docsPath = path.join(process.cwd(), 'posts', 'docs');
      const files = fs.readdirSync(docsPath);

      const fileNames = files.map(file => {
        const filePath = path.join(docsPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        return {
          name: file.replace(/\.md$/, ''),
          metadata: data,
        };
      });

      res.status(200).json(fileNames);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des fichiers.' });
    }
  } else {
    try {
      const filePath = path.join(process.cwd(), 'posts', 'docs', `${filename}.md`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      res.status(200).json({ metadata: data, content });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération du contenu.' });
    }
  }
}
