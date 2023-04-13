// Cette API permet de lister les CSV présents dans une base de données (/posts/data/bases/[nom-de-la-base])
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { database } = req.query;

  try {
    const dataFolder = path.join(process.cwd(), 'posts', 'data', 'bases', database);
    if (!fs.existsSync(dataFolder)) {
      res.status(404).json({ message: `La base de données ${database} n'existe pas.` });
      return;
    }

    const files = fs.readdirSync(dataFolder).filter(file => file.endsWith('.csv')).map(file => file.replace('.csv', ''));
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: `Erreur lors de la récupération de la liste des fichiers : ${error.message}` });
  }
}
