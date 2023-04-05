export async function getCellDataFromApi() {
    const res = await fetch('http://localhost:3000/api/yaml');
    const data = await res.json();
    return data;
  }
  