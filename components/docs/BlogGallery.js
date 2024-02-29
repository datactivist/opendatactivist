import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cards from '../nav/BCards';
import Gallery from '../nav/BGallery';

const BlogGallery = () => {
  const [docsMetadata, setDocsMetadata] = useState([]);

  useEffect(() => {
    const fetchDocsMetadata = async () => {
      try {
        const response = await fetch('/api/docscatalog?action=metadatalist&type=Blog');
        let data = await response.json();
        
        data = data.sort((a, b) => new Date(b.date) - new Date(a.date));

        data = data.filter(doc => doc.index === 1);

        setDocsMetadata(data);
      } catch (error) {
        console.error('Error fetching document metadata:', error);
      }
    };

    fetchDocsMetadata();
  }, []);

  const router = useRouter();

  const handleCardClick = (docName) => {
    router.push(`/docs/${docName}`);
  };

  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <Gallery>
        <Cards
          items={docsMetadata}
          onClick={(linkId) => handleCardClick(linkId)}
          tagRoute="docs"
        />
      </Gallery>
    </div>
  );
};

export default BlogGallery;
