// pages/api/canvas.js
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export default async function handler(req, res) {
  const { canva, filename } = req.query;

  // Chemin vers le dossier où sont stockés les fichiers CSV et Markdown
  const csvBasePath = path.join(process.cwd(), 'public', 'sitedata', 'canvas');
  const mdBasePath = path.join(process.cwd(), 'posts', 'rawmd');

  if (canva && !filename) {
    // Lire et parser le fichier CSV
    try {
      const csvPath = path.join(csvBasePath, `${canva}.csv`);
      const csvData = fs.readFileSync(csvPath, 'utf-8');
      const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true
      });
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la lecture du fichier CSV." });
    }
  } else if (canva && filename) {
    // Lire le contenu du fichier Markdown
    try {
      const mdPath = path.join(mdBasePath, canva, `${filename}.md`);
      const mdData = fs.readFileSync(mdPath, 'utf-8');
      res.status(200).json({ content: mdData });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la lecture du fichier Markdown." });
    }
  } else {
    res.status(400).json({ message: "Paramètres de requête manquants." });
  }
}
