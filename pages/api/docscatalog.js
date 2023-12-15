import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export default function handler(req, res) {
  const { action, filename } = req.query;

  // Read and parse the CSV file
  const filePath = path.join(process.cwd(), 'public', 'sitedata', 'docs_catalog.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });

  if (action === 'metadatalist') {
    // Return all records if action is 'metadatalist'
    res.status(200).json(records);
  } else if (filename) {
    // Find and return the specific document's metadata
    const document = records.find(doc => doc['﻿name'] === filename);
    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } else {
    // Handle other actions or error
    res.status(400).json({ error: 'Invalid action' });
  }
}
