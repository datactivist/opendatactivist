import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

export default function handler(req, res) {
  const { id } = req.query; // Extraction de l'id du partenaire à partir de la requête
  const filePath = path.join(process.cwd(), 'public', 'sitedata', 'partners.csv');
  let partners = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (data) => {
      const cleanedData = Object.keys(data).reduce((acc, key) => {
        const cleanKey = key.replace(/^\uFEFF/, '').trim(); // Nettoie les clés
        acc[cleanKey] = data[key];
        return acc;
      }, {});
      partners.push(cleanedData);
    })
    .on('end', () => {
      if (id) {
        // Filtrer pour trouver le partenaire correspondant à l'id
        const partner = partners.find(partner => partner.id === id);
        if (partner) {
          res.status(200).json(partner);
        } else {
          res.status(404).json({ message: "Partner not found" });
        }
      } else {
        // Si aucun id n'est fourni, renvoyer tous les partenaires
        res.status(200).json(partners);
      }
    })
    .on('error', (error) => {
      console.error('Error reading the CSV file:', error);
      res.status(500).send('Error reading the CSV file');
    });
}
