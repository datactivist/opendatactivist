function getApiUrl() {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.NEXT_PUBLIC_STAGING === 'true') {
      // Environnement de staging
      const currentUrl = typeof window !== 'undefined' && window.location.hostname;
      return `https://${currentUrl}/api/yaml`;
    } else {
      // Environnement de production
      return process.env.NEXT_PUBLIC_API_URL;
    }
  } else {
    // Environnement de développement
    return 'http://localhost:3000/api/yaml';
  }
}


export async function getCellDataFromApi() {
  const apiUrl = getApiUrl();
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
}
