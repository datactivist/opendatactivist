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
        const currentTeamAuthors = authors.filter(
          (author) =>
            author.organisation === 'datactivist' &&
            Object.entries(author).some(
              ([key, value]) => key.startsWith('tags/') && value,
            ),
        );

        // Grouper les auteurs par ville
        const authorsByCity = currentTeamAuthors.reduce((acc, author) => {
          const latitudeText = String(author.lat ?? '').trim();
          const longitudeText = String(author.lon ?? '').trim();
          const latitude = Number(latitudeText.replace(',', '.'));
          const longitude = Number(longitudeText.replace(',', '.'));

          if (
            !latitudeText ||
            !longitudeText ||
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude) ||
            Math.abs(latitude) > 90 ||
            Math.abs(longitude) > 180
          ) {
            return acc;
          }

          const key = `${latitude},${longitude}`;
          if (!acc[key]) {
            acc[key] = {
              city: author.city,
              authors: [author],
              lat: latitude,
              lon: longitude,
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
        url={`https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png?key=${process.env.NEXT_PUBLIC_CARTO_API_KEY}`}
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
