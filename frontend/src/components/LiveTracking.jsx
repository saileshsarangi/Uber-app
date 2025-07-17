import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom marker icon (because default one is broken in Leaflet with React)
const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

// Default center (same as your code)
const center = {
  lat: -3.745,
  lng: -38.523
};

function LocationUpdater({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
}

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);

  // Same functionality as your useEffect for watching location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: latitude,
        lng: longitude
      });
    });

    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: latitude,
        lng: longitude
      });
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Same as your second useEffect for periodic update (though redundant but added because you had it)
  useEffect(() => {
    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log('Position updated:', latitude, longitude);
        setCurrentPosition({
          lat: latitude,
          lng: longitude
        });
      });
    };

    updatePosition(); // Initial position update

    const intervalId = setInterval(updatePosition, 1000); // Update every 1 second

    return () => clearInterval(intervalId);
  }, []);

  return (
    <MapContainer
      center={currentPosition}
      zoom={15}
      scrollWheelZoom={true}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <LocationUpdater position={currentPosition} />
      <Marker position={currentPosition} icon={icon} />
    </MapContainer>
  );
};

export default LiveTracking;
