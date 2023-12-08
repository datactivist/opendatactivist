import fetch from 'node-fetch';
import matter from 'gray-matter';

export default async function handler(req, res) {
  const { filename, action } = req.query;

  const NEXTCLOUD_URL = 'https://nextcloud.datactivist.coop/s/Te2XrTkdnG9zgan';
  const NEXTCLOUD_API_URL = `${NEXTCLOUD_URL}/download?path=/&files=`;

  if (action === 'list') {
    try {
      const listResponse = await fetch(NEXTCLOUD_API_URL);
      if (!listResponse.ok) {
        throw new Error('Failed to fetch file list from Nextcloud');
      }

      const files = await listResponse.json(); // Adjust based on Nextcloud's response

      // Here, just return the list of file names
      const fileNames = files.map(file => file.name.replace(/\.md$/, ''));
      res.status(200).json(fileNames);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching files from Nextcloud.' });
    }
  } else {
    try {
      const fileURL = `${NEXTCLOUD_API_URL}${filename}.md`;
      const contentResponse = await fetch(fileURL);
      if (!contentResponse.ok) {
        throw new Error('Failed to fetch file from Nextcloud');
      }

      const content = await contentResponse.text();
      const { data, content: parsedContent } = matter(content);

      // Here, return both metadata and content
      res.status(200).json({ metadata: data, content: parsedContent });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching file content from Nextcloud.' });
    }
  }
}
