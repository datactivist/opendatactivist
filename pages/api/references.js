// pages/api/references.js
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

export default async function handler(req, res) {
    const { query: { action, id } } = req;

    const filePath = path.join(process.cwd(), 'public', 'sitedata', 'references_catalog.csv');
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const records = await new Promise((resolve, reject) => {
        parse(fileContents, {
            columns: headers => headers.map(header => header.trim().replace(/^\uFEFF/, '').toLowerCase()), // Normalize headers
            trim: true,
            skip_empty_lines: true
        }, (err, output) => {
            if (err) {
                reject(err);
            } else {
                resolve(output);
            }
        });
    });

    if (action === 'list') {
        res.status(200).json(records);
    } else if (action === 'get' && id) {
        // Now accessing the id field without the special character
        const reference = records.find(record => record.id === id.trim().toLowerCase());
        if (reference) {
            res.status(200).json(reference);
        } else {
            res.status(404).json({ message: 'Reference not found' });
        }
    } else {
        res.status(400).json({ message: 'Invalid action or missing id' });
    }
}
