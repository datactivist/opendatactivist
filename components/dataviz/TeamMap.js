import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../../styles/Dataviz.module.css';

const TeamMap = () => {
  const [groupedAuthors, setGroupedAuthors] = useState({});

  useEffect(() => {
    fetch('/api/authors-list')
      .then((response) => response.json())
      .then((authors) => {
        // Grouper les auteurs par ville
        const authorsByCity = authors.reduce((acc, author) => {
          const key = `${author.lat},${author.lon}`; // Utiliser la combinaison lat,lon comme clé pour gérer les cas de même ville mais coordonnées légèrement différentes
          if (!acc[key]) {
            acc[key] = {
              city: author.city,
              authors: [author],
              lat: author.lat,
              lon: author.lon,
            };
          } else {
            acc[key].authors.push(author);
          }
          return acc;
        }, {});

        setGroupedAuthors(authorsByCity);
      })
      .catch(console.error);
  }, []);

  return (
    <MapContainer
      center={[44.8566, 2.3522]}
      zoom={5.5}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {Object.values(groupedAuthors).map((group) => (
        <CircleMarker
          key={group.city}
          center={[group.lat, group.lon]}
          radius={4 + group.authors.length * 3}
          fillColor="#e63946"
          color="#e63946"
          weight={1}
          opacity={1}
          fillOpacity={0.8}
        >
          <Popup>
            <h1 className={styles.cityTitle}>{group.city}</h1>
            <br />
            {group.authors.map((author) => (
              <div key={author.id}>
                {author.name}
                <br />
              </div>
            ))}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default TeamMap;
