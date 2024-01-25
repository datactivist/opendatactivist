import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { tag, cercle } = req.query;
  const filePath = path.join(process.cwd(), 'public', 'sitedata', 'authors.json');
  const jsonData = fs.readFileSync(filePath);
  const authors = JSON.parse(jsonData);

  // Convertir les auteurs en tableau et ajouter un champ 'id' pour chaque auteur
  let filteredAuthors = Object.entries(authors).map(([id, author]) => ({
    id, // Utiliser la clé comme 'id'
    ...author, // Étaler les propriétés de l'auteur
  }));

  // Filtrer par tag si le paramètre tag est fourni
  if (tag) {
    filteredAuthors = filteredAuthors.filter(author =>
      author.tags && author.tags.includes(tag)
    );
  }

  // Filtrer par cercle si le paramètre cercle est fourni
  if (cercle) {
    filteredAuthors = filteredAuthors.filter(author =>
      author.cercle && (Array.isArray(author.cercle) ? author.cercle.includes(cercle) : author.cercle === cercle)
    );
  }

  // Renvoyer les auteurs filtrés avec l'id inclus
  res.status(200).json(filteredAuthors);
}
