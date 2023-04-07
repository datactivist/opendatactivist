import React from 'react';
import { getCellDataFromApi } from '../pages/api/yaml';

function CellCard({ title, description }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Cell({ slug }) {
  const [cellData, setCellData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const data = await getCellDataFromApi();
      const cell = data.find((c) => c.slug === slug);
      setCellData(cell);
    }

    fetchData();
  }, [slug]);

  return (
    <div>
      {cellData ? (
        <CellCard title={cellData.title} description={cellData.description} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
