import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function getPinIcon(status) {
  const imageMap = {
    SAFE: '/pin_green.png',
    ANOMALY: '/pin_orange.png',
  };

  return new L.Icon({
    iconUrl: imageMap[status] || '/default.png',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });
}

export default function MiniMap({ locations }) {
  const avgLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
  const avgLon = locations.reduce((sum, loc) => sum + loc.lon, 0) / locations.length;
  const center = [avgLat, avgLon];

  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      <MapContainer center={center} zoom={locations.length == 1 ? 14 : 12} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((loc, i) => (
          <Marker
            key={i}
            position={[loc.lat, loc.lon]}
            icon={getPinIcon(loc.status)}
          >
            <Popup>
              <div>
                <strong>Status:</strong> {loc.status}<br />
                <strong>Lat:</strong> {loc.lat}<br />
                <strong>Lon:</strong> {loc.lon}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
