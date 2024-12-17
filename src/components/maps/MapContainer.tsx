import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { MapContainerProps } from '../../types/maps';
import { GOOGLE_MAPS_API_KEY, defaultMapOptions, defaultMapContainerStyle, libraries } from '../../config/maps';

const MapContainer: React.FC<MapContainerProps> = ({ 
  center, 
  zoom = 13, 
  onLoad,
  children 
}) => {
  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        options={defaultMapOptions}
      >
        {children}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;