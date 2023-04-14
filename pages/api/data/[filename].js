import fs from 'fs';
import path from 'path';
import csvtojson from 'csvtojson';

export default async function handler(req, res) {
  const {
    query: { filename },
  } = req;

  const csvFilePath = path.join(process.cwd(), 'posts', 'data', `${filename}.csv`);

  try {
    const fileContent = await fs.promises.readFile(csvFilePath, 'utf-8');
    const [headerRow, ...dataRows] = fileContent.split('\n');

    // Detect delimiter
    const delimiter = headerRow.includes(';') ? ';' : ',';

    // Fix the header row if needed
    const fixedHeaderRow =
      delimiter === ';' && !headerRow.startsWith('"')
        ? headerRow.split(delimiter).map((header) => `"${header.trim()}"`).join(delimiter)
        : headerRow;

    const fixedContent = [fixedHeaderRow, ...dataRows].join('\n');

    const data = await csvtojson({ delimiter }).fromString(fixedContent);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la lecture du fichier CSV.' });
  }
}
