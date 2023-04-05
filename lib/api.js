export async function getCellDataFromApi() {
  const res = await fetch('/api/yaml');
  const data = await res.json();
  return data;
}
