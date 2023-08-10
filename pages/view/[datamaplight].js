import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DataMapLight from '../../components/data/DataMapLight';

const DataMapLightPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApiData = async () => {
      const queryParam = new URLSearchParams(router.query).toString();
      try {
        const res = await fetch(`/api/datamap?${queryParam}`);
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApiData();
  }, [router.query]);

  return (
    <div style={{ height: '100vh' }}>
      <DataMapLight data={data} />
    </div>
);

};

export default DataMapLightPage;
