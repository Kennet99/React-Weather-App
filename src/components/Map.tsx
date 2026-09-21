import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { Coords } from "../types";
// import "../App.css";

// Bundlers don't resolve Leaflet's default icon URLs, so point them at the imported assets.
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export type Map = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
  mapType: string;
};

const API_Key = import.meta.env.VITE_API_KEY;

export default function Map({ coords, onMapClick, mapType }: Map) {
  const { lat, lon } = coords;
  return (
    <MapContainer
      key={`${lat},${lon}`}
      center={[lat, lon]}
      zoom={5}
      className="z-0"
      style={{ height: "400px", width: "100%" }}
    >
      <MapClick onMapClick={onMapClick} coords={{ lat, lon }} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_Key}`}
      />
      <Marker position={[lat, lon]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

function MapClick({
  onMapClick,
  coords: { lat, lon },
}: {
  onMapClick: (lat: number, lon: number) => void;
  coords: { lat: number; lon: number };
}) {
  const map = useMap();
  map.panTo([lat, lon]);
  map.on("click", (e) => {
    const { lat, lng: lon } = e.latlng;
    onMapClick(lat, lon);
    console.log("Map clicked at", { lat, lon });
  });
  return null;
}
