import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../../styles/Dataviz.module.css';

const PartnersMap = () => {
  const [groupedPartners, setGroupedPartners] = useState({});

  useEffect(() => {
    fetch('/api/partners')
      .then((response) => response.json())
      .then((partners) => {
        const partnersByCity = partners.reduce((acc, partner) => {
          const key = `${partner.lat},${partner.lon}`;
          if (!acc[key]) {
            acc[key] = {
              city: partner.partner_city,
              partners: [partner],
              lat: partner.lat,
              lon: partner.lon,
            };
          } else {
            acc[key].partners.push(partner);
          }
          return acc;
        }, {});

        setGroupedPartners(partnersByCity);
      })
      .catch(console.error);
  }, []);

  return (
    <MapContainer
      center={[45.8566, 2.3522]}
      zoom={6}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {Object.values(groupedPartners).map((group) => (
        <CircleMarker
          key={group.city} // Changed from group.partner_city to group.city for consistency with your data structure
          center={[group.lat, group.lon]}
          radius={2 + group.partners.length * 2}
          fillColor="#e63946"
          color="#e63946"
          weight={1}
          opacity={1}
          fillOpacity={0.7}
        >
          <Popup>
            <h1 className={styles.cityTitle}>{group.city}</h1>{' '}
            {/* Changed for consistency */}
            <br />
            {group.partners.map(
              (
                partner, // Changed from group.authors to group.partners
              ) => (
                <div key={partner.id}>
                  {partner.name}
                  <br />
                </div>
              ),
            )}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default PartnersMap;
