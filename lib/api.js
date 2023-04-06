function getApiUrl() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/api/yaml';
  } else {
    // Utiliser l'URL actuelle pour les environnements de production et de staging
    const currentUrl = typeof window !== 'undefined' ? window.location.host : process.env.VERCEL_URL || 'localhost:3000';
    return `https://${currentUrl}/api/yaml`;
  }
}


export async function getCellDataFromApi() {
  const apiUrl = getApiUrl();
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
}
