import React, { useState, useEffect } from 'react';
import Gallery from '../nav/Gallery';

const ImageGallery = ({ galleryName }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/images?gallery=${galleryName}`);
        const data = await res.json();
        setImageUrls(data.images);
      } catch (error) {
        console.error('Erreur lors de la récupération des images:', error);
      }
    };
  
    fetchImages();
  }, [galleryName]);

  const handleClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  }

  const closeImage = () => {
    setSelectedImage(null);
  }

  return (
    <div
      style={{
        backgroundColor: '#f8f8f8',
        padding: '1rem',
        borderRadius: '10px',
        marginTop: '10px',
        marginBottom: '10px',
      }}
    >
      <Gallery>
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
            style={{
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onClick={() => handleClick(imageUrl)}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = ''}
          />
        ))}
      </Gallery>
      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={closeImage}
        >
          <img src={selectedImage} alt='Selected' style={{ maxWidth: '90%', maxHeight: '90%' }}/>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
