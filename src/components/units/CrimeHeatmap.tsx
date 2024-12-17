import React from 'react';
import { HeatmapLayer } from '@react-google-maps/api';

interface CrimeHeatmapProps {
  location: string;
  visible: boolean;
}

const CrimeHeatmap: React.FC<CrimeHeatmapProps> = ({ location, visible }) => {
  if (!visible) return null;

  // Simulated crime data points for each location
  const getHeatmapData = () => {
    const baseLocation = location === 'Guaxindiba' 
      ? { lat: -22.8269, lng: -43.0539 }
      : { lat: -22.8169, lng: -43.0439 };

    // Generate a grid of points around the base location
    const points = [];
    for (let i = -5; i <= 5; i++) {
      for (let j = -5; j <= 5; j++) {
        points.push({
          location: new google.maps.LatLng(
            baseLocation.lat + (i * 0.001),
            baseLocation.lng + (j * 0.001)
          ),
          weight: Math.random() * (location === 'Guaxindiba' ? 1 : 0.7)
        });
      }
    }
    return points;
  };

  return (
    <HeatmapLayer
      options={{
        radius: 20,
        opacity: 0.6,
        maxIntensity: 10,
        gradient: [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]
      }}
      data={getHeatmapData()}
    />
  );
};

export default CrimeHeatmap;