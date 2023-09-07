import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DataMapTable2 from '../components/data/DataMapTable2';
import DataMapSearch2 from '../components/data/DataMapSearch2';
import LayoutFocus from '../components/LayoutFocus';
import DataMapGallery from '../components/data/DataMapGallery';

const DataMapPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  // Initialize galleryMode as null to defer setting it
  const [galleryMode, setGalleryMode] = useState(null);

  useEffect(() => {
    // Set the initial galleryMode based on router.query once it's available
    if (router.isReady) {
      setGalleryMode(router.query.view === 'gallery');
    }

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
  }, [router.query, router.isReady]);

  const toggleView = () => {
    // Toggle the galleryMode
    setGalleryMode(!galleryMode);

    // Update the URL to reflect the new mode
    const newViewMode = !galleryMode ? 'gallery' : 'table';
    const newQuery = { ...router.query, view: newViewMode };
    router.push({
      pathname: router.pathname,
      query: newQuery,
    }, undefined, { shallow: true });
  };

  // If galleryMode is not yet determined, don't render anything
  if (galleryMode === null) return null;

  return (
    <LayoutFocus>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DataMapSearch2 data={originalData} setData={setData} />
          <button 
            style={{
              marginLeft: '2rem',
              alignSelf: 'flex-start',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: '#4ED9CC',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              outline: 'none'
            }}
            onClick={toggleView}
          >
            {galleryMode ? 'Vue tableau' : 'Vue galerie'}
          </button>
        </div>
        {galleryMode ? <DataMapGallery data={data} /> : <DataMapTable2 data={data} />}
      </div>
    </LayoutFocus>
  );
};

export default DataMapPage;
