import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DataMapTable2 from '../components/data/DataMapTable2';
import DataMapSearch2 from '../components/data/DataMapSearch2';
import LayoutFocus from '../components/LayoutFocus';

const DataMapPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchApiData = async () => {
      const queryParam = new URLSearchParams(router.query).toString();
      try {
        const res = await fetch(`/api/datamap?${queryParam}`);
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const jsonData = await res.json();
        setOriginalData(jsonData);
        setData(jsonData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApiData();
  }, [router.query]);

  return (
    <LayoutFocus>
    <div>
      <DataMapSearch2 data={originalData} setData={setData} />
      <DataMapTable2 data={data} />
    </div>
    </LayoutFocus>
  );
};

export default DataMapPage;
