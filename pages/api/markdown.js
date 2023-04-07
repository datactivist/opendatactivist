// pages/api/markdown.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default async function handler(req, res) {
  const { filename } = req.query; // Ajoutez cette ligne

  try {
    const filePath = path.join(process.cwd(), 'posts', 'rawmd', `${filename}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContent);

    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du contenu.' });
  }
}
