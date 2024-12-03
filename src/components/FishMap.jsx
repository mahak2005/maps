import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fishData } from "../data";

const FishMap = () => {
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [filters, setFilters] = useState({ depth: [0, 100], lat: [-90, 90], lng: [-180, 180] });

  const colors = {
    Salmon: "blue",
    Bass: "red",
    Trout: "green",
  };

  const applyFilters = (fish) => {
    return (
      (!selectedSpecies.length || selectedSpecies.includes(fish.species)) &&
      fish.depth >= filters.depth[0] &&
      fish.depth <= filters.depth[1] &&
      fish.latitude >= filters.lat[0] &&
      fish.latitude <= filters.lat[1] &&
      fish.longitude >= filters.lng[0] &&
      fish.longitude <= filters.lng[1]
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <MapContainer center={[0, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {fishData.filter(applyFilters).map((fish, index) => (
            <CircleMarker
              key={index}
              center={[fish.latitude, fish.longitude]}
              radius={10}
              color={colors[fish.species]}
            >
              <Tooltip>
                <div>
                  <strong>Species:</strong> {fish.species}
                  <br />
                  <strong>Catch Weight (kg):</strong> {fish.catchWeight.toFixed(2)}
                  <br />
                  <strong>Latitude:</strong> {fish.latitude}
                  <br />
                  <strong>Longitude:</strong> {fish.longitude}
                  <br />
                  <strong>Date:</strong> {new Date(fish.date).toLocaleString()}
                  <br />
                  <strong>Depth (m):</strong> {fish.depth.toFixed(2)}
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
      <div style={{ width: "250px", padding: "10px", background: "#f4f4f4" }}>
        <h3>Filters</h3>
        <label>
          <strong>Species:</strong>
        </label>
        {Object.keys(colors).map((species) => (
          <div key={species}>
            <input
              type="checkbox"
              value={species}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedSpecies((prev) =>
                  prev.includes(value)
                    ? prev.filter((s) => s !== value)
                    : [...prev, value]
                );
              }}
            />
            {species}
          </div>
        ))}
        <hr />
        <label>
          <strong>Depth (m):</strong>
        </label>
        <input
          type="number"
          placeholder="Min"
          onChange={(e) => setFilters({ ...filters, depth: [Number(e.target.value), filters.depth[1]] })}
        />
        <input
          type="number"
          placeholder="Max"
          onChange={(e) => setFilters({ ...filters, depth: [filters.depth[0], Number(e.target.value)] })}
        />
        <hr />
        <label>
          <strong>Latitude:</strong>
        </label>
        <input
          type="number"
          placeholder="Min"
          onChange={(e) => setFilters({ ...filters, lat: [Number(e.target.value), filters.lat[1]] })}
        />
        <input
          type="number"
          placeholder="Max"
          onChange={(e) => setFilters({ ...filters, lat: [filters.lat[0], Number(e.target.value)] })}
        />
        <hr />
        <label>
          <strong>Longitude:</strong>
        </label>
        <input
          type="number"
          placeholder="Min"
          onChange={(e) => setFilters({ ...filters, lng: [Number(e.target.value), filters.lng[1]] })}
        />
        <input
          type="number"
          placeholder="Max"
          onChange={(e) => setFilters({ ...filters, lng: [filters.lng[0], Number(e.target.value)] })}
        />
      </div>
    </div>
  );
};

export default FishMap;
