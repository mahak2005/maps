'use client';

import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fishData } from "../data"; 
import DateRangePicker from "./DateRangePicker";
import SpeciesSelector from "./SpeciesSelector";
import RangeSlider from "./RangeSlider";
import "../FilterSlidebar.css";
// import { MultiValue } from "react-select";

const FishMap = () => {
  const [filters, setFilters] = useState({
    depth: [0, 100],
    lat: [-90, 90],
    lng: [-180, 180],
  });

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [latitudeRange, setLatitudeRange] = useState([-87.01, 88.63]);
  const [longitudeRange, setLongitudeRange] = useState([-179.98, 174.61]);
  const [depthRange, setDepthRange] = useState([0, 500]);
  const [catchWeightRange, setCatchWeightRange] = useState([0, 1000]);

  const [speciesColors, setSpeciesColors] = useState({});

  const generateColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const applyFilters = (fish) => {
    return (
      (!selectedSpecies.length || selectedSpecies.some((s) => s.value === fish.species)) &&
      fish.depth >= depthRange[0] &&
      fish.depth <= depthRange[1] &&
      fish.latitude >= latitudeRange[0] &&
      fish.latitude <= latitudeRange[1] &&
      fish.longitude >= longitudeRange[0] &&
      fish.longitude <= longitudeRange[1] &&
      fish.catchWeight >= catchWeightRange[0] &&
      fish.catchWeight <= catchWeightRange[1]
    );
  };

  const getFishColor = (species) => {
    if (!speciesColors[species]) {
      const newColor = generateColor();
      setSpeciesColors((prevColors) => ({
        ...prevColors,
        [species]: newColor,
      }));
      return newColor;
    }
    return speciesColors[species];
  };

  const maxCatchWeight = Math.max(...fishData.map(f => f.catchWeight));

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ height: "60px", background: "#333", color: "#fff", padding: "10px" }}>
        <h1>Fish Catch Maps</h1>
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <div
          style={{
            width: "300px",
            padding: "10px",
            background: "#f4f4f4",
            overflowY: "auto",
            height: "calc(100vh - 60px)",
            borderRight: "1px solid #ccc",
          }}
        >
          <h3>Filter Options</h3>
          <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          <SpeciesSelector selectedSpecies={selectedSpecies} setSelectedSpecies={setSelectedSpecies} />
          <RangeSlider
            label="Latitude Range"
            range={latitudeRange}
            setRange={setLatitudeRange}
            min={-90}
            max={90}
            unit=""
          />
          <RangeSlider
            label="Longitude Range"
            range={longitudeRange}
            setRange={setLongitudeRange}
            min={-180}
            max={180}
            unit=""
          />
          <RangeSlider
            label="Depth Range"
            range={depthRange}
            setRange={setDepthRange}
            min={0}
            max={1000}
            unit="m"
          />
          <RangeSlider
            label="Catch Weight (kg)"
            range={catchWeightRange}
            setRange={setCatchWeightRange}
            min={0}
            max={maxCatchWeight}
            unit="kg"
          />
        </div>
        <div style={{ flex: 1 }}>
          <MapContainer center={[0, 0]} zoom={2} style={{ height: "calc(100vh - 60px)", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {fishData.filter(applyFilters).map((fish, index) => (
              <CircleMarker
                key={index}
                center={[fish.latitude, fish.longitude]}
                radius={10}
                color={getFishColor(fish.species)}
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
      </div>
    </div>
  );
};

export default FishMap;
