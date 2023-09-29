import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import fetch from 'node-fetch';
import { supabase } from "../../utils/supabaseClient";

export default async function handler(req, res) {
  const { filename, action } = req.query;

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_PATH = 'datactivist/open-datactivist-private';
  const BASE_URL = `https://api.github.com/repos/${REPO_PATH}/contents/docs`;

  if (action === 'list') {
    try {
      const docsPath = path.join(process.cwd(), 'posts', 'docs');
      const files = fs.readdirSync(docsPath);

      const fileNames = files.map((file) => {
        const filePath = path.join(docsPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        return {
          name: file.replace(/\.md$/, ''),
          metadata: data,
        };
      });

      res.status(200).json(fileNames);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Erreur lors de la récupération des fichiers.' });
    }
  } else {
    try {
      const filePath = path.join(
        process.cwd(),
        'posts',
        'docs',
        `${filename}.md`,
      );
  
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        res.status(200).json({ metadata: data, content });
      } else {
        // If file not found locally, try fetching from GitHub
        const fileURL = `${BASE_URL}/${filename}.md`;
        const response = await fetch(fileURL, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3.raw',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch from GitHub API');
        }

        const content = await response.text();
        const { data, content: parsedContent } = matter(content);

        // Special handling for "pv" files
        if (filename.endsWith('pv') && data.access === 'datactivist-team') {
          const user = req.user;  // Assuming you have user in req

          if (user && user.email) {
            const { data: supabaseData, error } = await supabase
              .from('docaccess-datactivist-team')
              .select('email')
              .eq('email', user.email);

            if (error || !supabaseData.length) {
              res.status(403).json({ message: 'Access denied.' });
              return;
            }
          } else {
            res.status(403).json({ message: 'Access denied. No user email found.' });
            return;
          }
        }

        res.status(200).json({ metadata: data, content: parsedContent });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération du contenu.' });
    }
  }
}