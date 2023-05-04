// Cette API liste tous les noms de CSV dans /posts/data
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const directoryPath = './posts/data';
  const files = fs
    .readdirSync(directoryPath)
    .filter((file) => path.extname(file) === '.csv')
    .map((file) => path.parse(file).name);
  res.status(200).json({ files });
}
