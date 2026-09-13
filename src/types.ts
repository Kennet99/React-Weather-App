export type Coords = {
  lat: number;
  lon: number;
};

export type WeatherComponent = {
  //   children?: React.ReactNode;
  title: string;
  coords: Coords;
  //   onMapClick?: (lat: number, lon: number) => void;
};

export type Map = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
};
