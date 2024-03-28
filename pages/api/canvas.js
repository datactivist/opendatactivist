import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export default async function handler(req, res) {
  const { canva, filename, list } = req.query;

  // Chemin vers le dossier où sont stockés les fichiers CSV et Markdown
  const csvBasePath = path.join(process.cwd(), 'public', 'sitedata', 'canvas');
  const mdBasePath = path.join(process.cwd(), 'posts', 'rawmd');
  // Base URL for the canvas images
  const imageUrlBase = '/images/canvas';

  // Route pour lister toutes les métadonnées
  if (list !== undefined) {
    const metadataList = [];
    try {
      const files = fs.readdirSync(csvBasePath);
      files.forEach(file => {
        // Extract the canvaName from the file name (strip the .csv extension)
        const canvaName = file.replace('.csv', '');
        const csvData = fs.readFileSync(path.join(csvBasePath, file), 'utf-8');
        const records = parse(csvData, {
          columns: true,
          skip_empty_lines: true
        });
        const metaData = records.find(record => record.filename === 'meta');
        if (metaData) {
          // Append the image URL and canvaName to the metadata
          const imageName = `${canvaName}.png`;
          metaData.imageUrl = `${imageUrlBase}/${imageName}`;
          metaData.canvaName = canvaName; // Add the canvaName property
          metadataList.push(metaData);
        }
      });
      return res.status(200).json(metadataList);
    } catch (error) {
      return res.status(500).json({ message: "Erreur lors de la lecture des fichiers CSV." });
    }
  }

  // Handling des requêtes existantes
  if (canva && !filename) {
    try {
      const csvPath = path.join(csvBasePath, `${canva}.csv`);
      const csvData = fs.readFileSync(csvPath, 'utf-8');
      const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true
      });
      // If only the metadata for a single canvas is requested, include the image URL
      const imageName = `${canva}.png`;
      records.forEach(record => {
        if (record.filename === 'meta') {
          record.imageUrl = `${imageUrlBase}/${imageName}`;
        }
      });
      return res.status(200).json(records);
    } catch (error) {
      return res.status(500).json({ message: "Erreur lors de la lecture du fichier CSV." });
    }
  } else if (canva && filename) {
    try {
      const mdPath = path.join(mdBasePath, canva, `${filename}.md`);
      const mdData = fs.readFileSync(mdPath, 'utf-8');
      return res.status(200).json({ content: mdData });
    } catch (error) {
      return res.status(500).json({ message: "Erreur lors de la lecture du fichier Markdown." });
    }
  } else {
    return res.status(400).json({ message: "Paramètres de requête manquants." });
  }
}
