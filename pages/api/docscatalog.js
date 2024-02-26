import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { action, type } = req.query; // Keep 'type' in the destructured query parameters

  // Path to the JSON file
  const jsonFilePath = path.join(process.cwd(), 'public', 'sitedata', 'docs_catalog.json');

  // Read the JSON file
  const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
  const records = JSON.parse(jsonData); // Directly parse the JSON file content

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
