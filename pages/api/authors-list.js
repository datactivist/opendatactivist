// pages/api/authors.js
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
        // Omitting tags from the data object
        const { ...rest } = data;
        authors.push(rest);
    })
    .on('end', () => {
      if (id) {
        // Filter the authors array for the author with the matching id
        const filteredAuthors = authors.filter(author => author['\ufeffid'] === id || author['id'] === id); // Handle UTF-8 BOM if present
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
