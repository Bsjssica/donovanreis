import { MarkerIconOptions } from '../types/maps';

export const createMarkerIcon = (googleMaps: typeof google.maps, options: MarkerIconOptions) => {
  if (!googleMaps) return null;
  
  return {
    url: options.url,
    scaledSize: new googleMaps.Size(options.size || 32, options.size || 32),
  };
};

export const getMarkerUrl = (risk: string) => {
  return risk === 'high' ? '/red-marker.png' :
         risk === 'medium' ? '/yellow-marker.png' :
         '/green-marker.png';
};