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
          const city = String(partner.partner_city ?? '').trim();
          if (!city) return acc;

          const key = city.toLowerCase();
          if (!acc[key]) {
            acc[key] = {
              city,
              partners: [],
              latitudeTotal: 0,
              longitudeTotal: 0,
              coordinateCount: 0,
            };
          }

          const group = acc[key];
          group.partners.push(partner);
          const latitudeText = String(partner.lat ?? '').trim();
          const longitudeText = String(partner.lon ?? '').trim();
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

          group.latitudeTotal += latitude;
          group.longitudeTotal += longitude;
          group.coordinateCount += 1;
          return acc;
        }, {});

        const positionedPartners = Object.fromEntries(
          Object.entries(partnersByCity)
            .filter(([, group]) => group.coordinateCount > 0)
            .map(([key, group]) => [
              key,
              {
                city: group.city,
                partners: group.partners,
                lat: group.latitudeTotal / group.coordinateCount,
                lon: group.longitudeTotal / group.coordinateCount,
              },
            ]),
        );

        setGroupedPartners(positionedPartners);
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
        url={`https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png?key=${process.env.NEXT_PUBLIC_CARTO_API_KEY}`}
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
