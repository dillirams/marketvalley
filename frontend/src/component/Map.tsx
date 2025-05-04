import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Button from "./Button";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocationPicker: React.FC = () => {
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>("");

  // Reverse geocode using OpenStreetMap Nominatim API
  const fetchAddress = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setAddress(data.display_name || "Address not found");
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      setAddress("Failed to fetch address");
    }
  };

  // Get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        fetchAddress(latitude, longitude);
      },
      (err) => {
        alert("Could not fetch location: " + err.message);
      }
    );
  }, []);

  // Component to handle map click
  const LocationSelector = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        fetchAddress(lat, lng);
        setShowMap(false);
      },
    });
    return position ? <Marker position={position} /> : null;
  };

  return (
    <div className="flex flex-wrap justify-center md:flex-col md:items-start">
      //@ts-ignore
      <Button
        onClick={() => setShowMap(!showMap)}
        variant="primary"
        size="sm"
        title="select location"
      >
        Select Location
      </Button>

      {showMap && position && (
        <div className="fixed top-50 md:top-20 md:left-100 h-[400px] w-full max-w-[600px] mx-auto border-2 border-[#ccc] rounded-lg overflow-hidden">
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationSelector />
          </MapContainer>
        </div>
      )}

      {address && !showMap && (
        <div className=" flex flex-col justify-center m-3">
          <h3>📍 Selected Address</h3>
          <p>{address}</p>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
