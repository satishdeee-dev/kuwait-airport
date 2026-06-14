"use client";

import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Plane, RefreshCw, Radar } from "lucide-react";

const KIA = { lat: 29.2266, lng: 47.9689 };

type Flight = {
  id: string;
  callsign: string;
  country: string;
  lat: number;
  lng: number;
  altitude: number;
  onGround: boolean;
  velocity: number;
  heading: number;
  verticalRate: number;
};

function planeIcon(heading: number, onGround: boolean) {
  const color = onGround ? "#9ca3af" : "#0057a8";
  return L.divIcon({
    className: "",
    html: `<div style="transform: rotate(${heading}deg); transition: transform 1s linear;">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
      </svg></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

function Recenter() {
  const map = useMap();
  useEffect(() => {
    map.setView([KIA.lat, KIA.lng], map.getZoom());
  }, [map]);
  return null;
}

export default function LiveMap() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [updated, setUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/flights", { cache: "no-store" });
      const data = await res.json();
      setFlights(data.flights ?? []);
      setError(data.error && (data.flights ?? []).length === 0 ? "Live feed temporarily unavailable (OpenSky rate limit). Retrying…" : null);
      setUpdated(new Date());
    } catch {
      setError("Could not reach live feed.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, [load]);

  const airborne = flights.filter((f) => !f.onGround).length;

  return (
    <div className="relative">
      {/* Stats bar */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
        <div className="kia-glass rounded-xl px-4 py-3 shadow-lg">
          <div className="flex items-center gap-2 text-[#002b5c]">
            <Radar className="w-5 h-5 text-red-500" />
            <span className="font-bold">{flights.length}</span>
            <span className="text-sm text-gray-600">aircraft tracked</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">{airborne} airborne · {flights.length - airborne} on ground</div>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-[1000]">
        <button
          onClick={load}
          className="kia-glass rounded-xl px-3 py-2 shadow-lg flex items-center gap-2 text-sm font-medium text-[#002b5c] hover:bg-white transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          {updated ? updated.toLocaleTimeString() : "…"}
        </button>
      </div>

      {error && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] kia-glass rounded-lg px-4 py-2 text-xs text-amber-700 shadow-lg">
          {error}
        </div>
      )}

      <MapContainer
        center={[KIA.lat, KIA.lng]}
        zoom={9}
        style={{ height: "75vh", width: "100%", borderRadius: "1.5rem", zIndex: 0 }}
        scrollWheelZoom
      >
        <Recenter />
        <TileLayer
          attribution='&copy; OpenStreetMap · Live data &copy; OpenSky Network'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Circle center={[KIA.lat, KIA.lng]} radius={5000} pathOptions={{ color: "#0057a8", fillColor: "#0057a8", fillOpacity: 0.08 }} />
        <Marker
          position={[KIA.lat, KIA.lng]}
          icon={L.divIcon({
            className: "",
            html: `<div style="background:#c8102e;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-size:14px;">🛫</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          })}
        >
          <Popup>Kuwait International Airport (KWI / OKBK)</Popup>
        </Marker>

        {flights.map((f) => (
          <Marker key={f.id} position={[f.lat, f.lng]} icon={planeIcon(f.heading, f.onGround)}>
            <Popup>
              <div className="text-sm">
                <p className="font-bold text-[#002b5c]">{f.callsign}</p>
                <p className="text-gray-600">{f.country}</p>
                <hr className="my-1" />
                <p>Altitude: <b>{Math.round(f.altitude).toLocaleString()} m</b></p>
                <p>Speed: <b>{Math.round(f.velocity * 3.6)} km/h</b></p>
                <p>Heading: <b>{Math.round(f.heading)}°</b></p>
                <p>Status: <b>{f.onGround ? "On ground" : "Airborne"}</b></p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
