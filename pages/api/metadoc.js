import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import fetch from 'node-fetch';
import matter from 'gray-matter';

export default async function handler(req, res) {
  const { filename } = req.query;

  // Path to the CSV file
  const csvFilePath = path.join(process.cwd(), 'public', 'sitedata', 'docs_catalog.csv');

  // Read and parse the CSV file
  const csvContent = fs.readFileSync(csvFilePath, 'utf8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true
  });

  // Find the document's metadata in the CSV
  const documentMetadata = records.find(doc => doc['name'] === filename);
  if (!documentMetadata) {
    return res.status(404).json({ error: 'Document not found' });
  }

  // URL to fetch the Markdown file
  const NEXTCLOUD_URL = 'https://nextcloud.datactivist.coop/s/Te2XrTkdnG9zgan';
  const fileURL = `${NEXTCLOUD_URL}/download?path=/&files=${filename}.md`;

  try {
    // Fetch and parse the Markdown file
    const markdownResponse = await fetch(fileURL);
    if (!markdownResponse.ok) {
      throw new Error('Failed to fetch Markdown file');
    }

    const markdownContent = await markdownResponse.text();
    const { content: markdownParsedContent } = matter(markdownContent);

    // Combine metadata from CSV and content from Markdown
    res.status(200).json({
      metadata: documentMetadata,
      content: markdownParsedContent
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
