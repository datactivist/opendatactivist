import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

async function getDataFromFile(filename) {
  const filePath = path.join(process.cwd(), 'public', 'datamap', filename);
  const fileContents = await readFileAsync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(400).send({ message: 'Only GET requests are allowed' });
    return;
  }

  const { query: { producerlabel, tag, search, all } } = req;

  const data = await getDataFromFile('data.json');
  const producers = await getDataFromFile('producers.json');
  const tags = await getDataFromFile('tags.json');

  if (all === 'data') {
    res.status(200).json(data);
    return;
  } else if (all === 'producers') {
    res.status(200).json(producers);
    return;
  } else if (all === 'tags') {
    res.status(200).json(tags);
    return;
  }

  let result = null;

  if (producerlabel) {
    const producer = producers.find(p => p['producer-label'].toLowerCase() === producerlabel.toLowerCase());
    if (producer) {
      const dataIds = producer.data.split(',');
      result = data.filter(d => dataIds.includes(d['data-id']));
    }
  } else if (tag) {
    const tagEntry = tags.find(t => t.tag.toLowerCase() === tag.toLowerCase());
    if (tagEntry) {
      const dataIds = tagEntry.data.split(',');
      result = data.filter(d => dataIds.includes(d['data-id']));
    }
  } else if (search) {
    const searchLower = search.toLowerCase();
    result = data.filter(d => 
      d['data-label'].toLowerCase().includes(searchLower) || 
      d['data-producer'].toLowerCase().includes(searchLower) ||
      d['data-description'].toLowerCase().includes(searchLower) ||
      d['datamap-perimeter'].toLowerCase().includes(searchLower)
    );
  } else {
    res.status(400).send({ message: 'Please specify either producerlabel, tag, search, or all' });
    return;
  }

  if (!result || result.length === 0) {
    res.status(404).send({ message: 'No results found' });
    return;
  }

  res.status(200).json(result);
}

export default handler;
