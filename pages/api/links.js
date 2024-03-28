// pages/api/quotes.js
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export default function handler(req, res) {
  // Chemin vers ton fichier CSV
  const csvFilePath = path.join(process.cwd(), 'public/sitedata/links.csv');
  
  // Lecture du fichier CSV avec gestion du BOM
  let csvData = fs.readFileSync(csvFilePath, 'utf8');
  // Retire le BOM si présent
  if (csvData.charCodeAt(0) === 0xFEFF) {
    csvData = csvData.substr(1);
  }
  
  // Parsing du fichier CSV
  const records = parse(csvData, { columns: true, skip_empty_lines: true });
  
  // Gestion des requêtes
  const { action, ID } = req.query;
  
  if (action === 'list') {
    // Retourne tous les enregistrements si l'action est 'list'
    res.status(200).json(records);
  } else if (ID) {
    // Ajuste la clé pour les ID en raison du BOM potentiel
    const record = records.find(r => r.ID === ID || r["\uFEFFID"] === ID);
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  } else {
    res.status(400).json({ message: 'Invalid request' });
  }
}
