// pages/dataviz/teammap.js
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Importez TeamMap avec dynamic import et ssr désactivé
const PartnersMapWithNoSSR = dynamic(() => import('../../components/dataviz/PartnersMap'), {
  ssr: false
});

const TeamMapPage = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      const response = await fetch('/api/partners');
      const data = await response.json();
      setPartners(data);
    };

    fetchPartners();
  }, []);

  return (
    <div>
      <PartnersMapWithNoSSR partners={partners} />
    </div>
  );
};

export default TeamMapPage;
