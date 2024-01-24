import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export default function handler(req, res) {
  const { action, type } = req.query; // Add 'type' to the destructured query parameters

  // Read and parse the CSV file
  const filePath = path.join(process.cwd(), 'public', 'sitedata', 'docs_catalog.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });

  if (action === 'metadatalist') {
    let filteredRecords = records;

    // Filter records by type if 'type' query parameter is present
    if (type) {
      filteredRecords = records.filter(record => record.type === type);
    }

    // Return filtered records
    res.status(200).json(filteredRecords);
  } else {
    // Handle other actions or errors
    res.status(400).json({ error: 'Invalid action' });
  }
}
