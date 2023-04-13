// Cette API est spécifique aux CSV dans /posts/data/bases/
import fs from 'fs';
import path from 'path';
import csvtojson from 'csvtojson';

export default async function handler(req, res) {
  const { database, file, uniqueId } = req.query;

  try {
    const dataFolder = path.join(process.cwd(), 'posts', 'data', 'bases', database);
    const csvFilePath = path.join(dataFolder, `${file}.csv`);

    if (!fs.existsSync(csvFilePath)) {
      res.status(404).json({ message: `Le fichier ${file}.csv n'existe pas dans la base de données ${database}.` });
      return;
    }

    const jsonArray = await csvtojson().fromFile(csvFilePath);
    const filteredData = uniqueId
      ? jsonArray.filter((record) => record[Object.keys(record)[0]] === uniqueId)
      : jsonArray;

    res.status(200).json(filteredData);

  } catch (error) {
    res.status(500).json({ message: `Erreur lors de la conversion du fichier CSV en JSON : ${error.message}` });
  }
}
