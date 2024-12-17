// Replace this with your actual Google Maps API key
export const GOOGLE_MAPS_API_KEY = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg';

export const defaultMapOptions = {
  styles: [
    {
      elementType: "geometry",
      stylers: [{ color: "#242f3e" }]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#242f3e" }]
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#746855" }]
    }
  ],
  streetViewControl: false,
  mapTypeControl: false,
};

export const defaultMapContainerStyle = {
  width: '100%',
  height: '100%',
};

export const libraries: ("visualization" | "places" | "drawing" | "geometry" | "localContext")[] = ["visualization"];