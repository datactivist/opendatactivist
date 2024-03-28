import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { action, type } = req.query;

  // Read and parse the JSON file
  const filePath = path.join(process.cwd(), 'public', 'sitedata', 'docs_catalog.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const records = JSON.parse(fileContent);

  if (action === 'metadatalist') {
    let filteredRecords;

    // Filter records to include only those with index 1, and by type if 'type' query parameter is present
    if (type) {
      filteredRecords = records.filter(record => record.type === type && record.index === 1);
    } else {
      // Include only records with index 1 if no type filter is applied
      filteredRecords = records.filter(record => record.index === 1);
    }

    // Return filtered records
    res.status(200).json(filteredRecords);
  } else {
    // Handle other actions or errors
    res.status(400).json({ error: 'Invalid action' });
  }
}
