import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests are allowed' });
    return;
  }

  const { id } = req.query; // Extract the 'id' from query parameters
  const filePath = path.join(process.cwd(), 'public', 'sitedata', 'authors.csv');
  const authors = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
        // Clean the 'id' field from any UTF-8 BOM or other unexpected characters
        const cleanData = Object.keys(data).reduce((acc, key) => {
          const cleanKey = key.replace(/^\uFEFF/, '').trim(); // Remove UTF-8 BOM and trim whitespace
          acc[cleanKey] = data[key];
          return acc;
        }, {});

        authors.push(cleanData);
    })
    .on('end', () => {
      if (id) {
        // Filter the authors array for the author with the matching id, using the cleaned 'id' field
        const filteredAuthors = authors.filter(author => author.id === id);
        if (filteredAuthors.length) {
          res.status(200).json(filteredAuthors[0]); // Send the first matching author
        } else {
          res.status(404).send({ message: 'Author not found' });
        }
      } else {
        // If no id is provided, return all authors
        res.status(200).json(authors);
      }
    });
}
