import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import SearchBar from '../nav/SearchBar';
import styles from '../../styles/JsonGallery.module.css';

// Colonnes affichées selon le fichier de données (posts/data/<filename>.csv)
// - front : champs visibles sur la carte (en plus du titre), c'est le recto
// - back  : champs visibles au clic, c'est le verso
const CONFIGS = {
  'cartes-action': {
    title: 'Titre',
    front: [{ key: 'Hexagone', label: 'Hexagone' }, { key: 'Recto', label: 'Recto' }],
    back: [{ key: 'Verso', label: 'Verso' }],
  },
  'cartes-controverses': {
    title: 'Titre',
    front: [],
    back: [1, 2, 3, 4].map((n) => ({
      key: `Point de vue ${n}`,
      titleKey: `Titre du point de vue ${n}`,
      label: `Points de vue ${n}`,
    })),
  },
};

const CardsGallery = ({ filename }) => {
  const config = CONFIGS[filename];
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/data/${filename}`);
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, [filename]);

  if (!config) return null;

  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        Object.values(item).join('').toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className={styles.galleryContainer}>
        {filteredData.map((item, index) => (
          <div
            key={index}
            className={styles.card}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedCard(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedCard(item);
            }}
          >
            <div className={styles.firstTitle}>
              <Typography className={styles.title} variant="h5" component="div">
                <strong>{item[config.title]}</strong>
              </Typography>
            </div>
            {config.front.map((field) =>
              item[field.key] ? (
                <div key={field.key}>
                  <br />
                  <Typography variant="subtitle2" component="div">
                    <strong>{field.label}</strong>
                  </Typography>
                  <Typography variant="body1" component="div">
                    {item[field.key]}
                  </Typography>
                </div>
              ) : null,
            )}
          </div>
        ))}
      </div>
      {selectedCard && (
        <Dialog open onClose={() => setSelectedCard(null)} maxWidth="md" fullWidth>
          <DialogTitle className={styles.dialogTitle}>
            {selectedCard[config.title]}
          </DialogTitle>
          <DialogContent className={styles.dialogBackground}>
            {config.back.map((field) =>
              selectedCard[field.key] ? (
                <div key={field.key} className={styles.dialogField}>
                  <Typography variant="h6" component="div">
                    <strong>{field.label}</strong>
                  </Typography>
                  {field.titleKey && selectedCard[field.titleKey] ? (
                    <Typography variant="subtitle2" component="div">
                      <strong>{selectedCard[field.titleKey]}</strong>
                    </Typography>
                  ) : null}
                  <Typography variant="body1" component="div">
                    {selectedCard[field.key]}
                  </Typography>
                </div>
              ) : null,
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CardsGallery;
