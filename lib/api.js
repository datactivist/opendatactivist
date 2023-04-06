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
  console.log("Fetching data from URL:", apiUrl);
  const res = await fetch(apiUrl);
  console.log("Received response:", res);

  // Vérifier si le contenu est du JSON
  if (res.headers.get('content-type')?.includes('application/json')) {
    console.log("Response is JSON, attempting to parse...");
    const data = await res.json();
    console.log("Parsed response data:", data);
    return data;
  } else {
    console.error(`Erreur : L'API a renvoyé un format de contenu inattendu à l'URL ${apiUrl}`);
    throw new Error("Format de contenu inattendu");
  }
}