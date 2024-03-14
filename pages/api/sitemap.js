import axios from 'axios';

export default async function handler(req, res) {
  // Définis le content-type comme XML
  res.setHeader('Content-Type', 'text/xml');

  // Base fixe de pages à inclure dans le sitemap
  const staticPages = [
    '/docs',
    '/products',
    '/equipe',
    '/recherche',
    '/products/conciergerie',
    '/products/dataposition',
    '/products/teamopendata',
    '/products/donnees-democratie',
    '/products/expo-smartcity',
    '/products/patchwork-algorithmes',
    '/products/patchwork-opendata',
    '/products/patchwork-pgd',
    '/products/stickers',
  ];

  // Récupère les pages dynamiques depuis ton API
  const fetchDynamicPages = async () => {
    try {
      const response = await axios.get('https://open.datactivist.coop/api/docscatalog?action=metadatalist');
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des pages dynamiques:", error);
      return [];
    }
  };

  const dynamicPages = await fetchDynamicPages();

  // Début du sitemap XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Ajoute les pages statiques au sitemap
  staticPages.forEach(pagePath => {
    const pageUrl = `https://open.datactivist.coop${pagePath}`;
    sitemap += `
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.80</priority>
  </url>`;
  });

  // Ajoute les pages dynamiques
  dynamicPages.forEach(page => {
    const pageUrl = `https://open.datactivist.coop/docs/${page.name}`;
    const lastModDate = page.date;

    sitemap += `
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastModDate}</lastmod>
    <priority>0.80</priority>
  </url>`;
  });

  // Fin du sitemap XML
  sitemap += `</urlset>`;

  // Envoie le sitemap comme réponse
  res.send(sitemap);
}
