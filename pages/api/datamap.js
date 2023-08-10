import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

async function getDataFromFile(fileName) {
  const filePath = path.join(process.cwd(), 'public', 'datamap', fileName);
  const fileData = await readFileAsync(filePath, 'utf8');
  return JSON.parse(fileData);
}

export default async function handler(req, res) {
  const { query } = req;

  // Get data from files
  const data = await getDataFromFile('data.json');
  const producers = await getDataFromFile('producers.json');
  const tags = await getDataFromFile('tags.json');

  if (query.alltags) {
    res.status(200).json(tags);
  } else if (query.allproducers) {
    res.status(200).json(producers);
  } else if (query.data === 'all') { 
    res.status(200).json(data);
  } else if (query.producerlabel) {
    const producerData = data.filter(d => d['data-producer'] === query.producerlabel);
    res.status(200).json(producerData);
  } else if (query.tag) {
    const tagData = data.filter(d => d['data-tags'].includes(query.tag));
    res.status(200).json(tagData);
  } else if (query['datamap-id']) {
    const datamapData = data.filter(d => d['datamap-id'] === query['datamap-id']);
    res.status(200).json(datamapData);
  } else {
    res.status(400).json({ error: 'Invalid query parameter' });
  }
}
