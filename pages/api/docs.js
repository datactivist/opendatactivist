import fetch from 'node-fetch';
import matter from 'gray-matter';

export default async function handler(req, res) {
  const { action, range } = req.query;
  const FILE_LIST_MD_URL = 'https://nextcloud.datactivist.coop/s/m68ztmJaaTiBitC/download';
  const NEXTCLOUD_URL = 'https://nextcloud.datactivist.coop/s/Te2XrTkdnG9zgan/download?path=/&files=';

  if (action === 'filelist') {
    try {
      const fileListResponse = await fetch(FILE_LIST_MD_URL);
      if (!fileListResponse.ok) {
        throw new Error(`Failed to fetch file list Markdown. Status: ${fileListResponse.status}`);
      }

      const fileListMd = await fileListResponse.text();
      const fileList = fileListMd.split(',').map(name => name.trim()).filter(name => name !== '');
      res.status(200).json({ fileList });
    } catch (error) {
      res.status(500).json({ message: `Error fetching file list Markdown: ${error.message}` });
    }
  } else if (action === 'metadatalist') {
    try {
      const fileListResponse = await fetch(FILE_LIST_MD_URL);
      if (!fileListResponse.ok) {
        throw new Error(`Failed to fetch file list Markdown. Status: ${fileListResponse.status}`);
      }

      const fileListMd = await fileListResponse.text();
      let fileList = fileListMd.split(',').map(name => name.trim()).filter(name => name !== '');

      // Parse the range and adjust fileList accordingly
      if (range) {
        const [start, end] = range.split('-').map(Number);
        fileList = fileList.slice(start - 1, end);
      }

      const fetchPromises = fileList.map(filename => {
        return fetch(`${NEXTCLOUD_URL}${filename}.md`)
          .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch file ${filename}. Status: ${response.status}`);
            return response.text();
          })
          .then(content => {
            const { data } = matter(content);
            return { name: filename.replace('.md', ''), metadata: data };
          })
          .catch(error => {
            console.error(error.message);
            return null; // Return null for failed requests
          });
      });

      const metadataList = (await Promise.all(fetchPromises)).filter(item => item !== null);
      res.status(200).json(metadataList);
    } catch (error) {

      res.status(500).json({ message: `Error processing metadata list: ${error.message}` });
    }
  } else {
    res.status(400).json({ message: 'Invalid action' });
  }
}
