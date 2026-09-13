import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Map } from "../types";

export default function Map({ coords, onMapClick }: Map) {
  const { lat, lon } = coords;
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={5}
      style={{ height: "400px", width: "500px" }}
    >
      <MapClick onMapClick={onMapClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
}: {
  onMapClick: (lat: number, lon: number) => void;
}) {
  const map = useMap();
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    map.panTo([lat, lng]);
    onMapClick(lat, lng);
    console.log("Map clicked at", { lat, lng });
  });
  return null;
}
