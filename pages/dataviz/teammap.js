// pages/dataviz/teammap.js
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Importez TeamMap avec dynamic import et ssr désactivé
const TeamMapWithNoSSR = dynamic(() => import('../../components/dataviz/TeamMap'), {
  ssr: false
});

const TeamMapPage = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await fetch('/api/authors-list');
      const data = await response.json();
      setAuthors(data);
    };

    fetchAuthors();
  }, []);

  return (
    <div>
      <TeamMapWithNoSSR authors={authors} />
    </div>
  );
};

export default TeamMapPage;
