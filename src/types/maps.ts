export interface MarkerIconOptions {
  url: string;
  size?: number;
}

export interface MapContainerProps {
  center: google.maps.LatLngLiteral;
  zoom?: number;
  onLoad?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

export interface Libraries extends Array<"visualization" | "places" | "drawing" | "geometry" | "localContext"> {}