'use client'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io"


const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/";

var greenIcon = L.icon({
  iconUrl: '/icons/pin-location.svg',
  shadowUrl: '/icons/pin-location2.svg',

  iconSize:     [40, 40], // size of the icon
  shadowSize:   [36, 36], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [22, 94],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const Map = ({location, editLocation, handleClose}) => {
  // const map = useMap();
  const [position, setPosition] = useState([location.latitude,location.longitude]);
  const [address, setAddress] = useState(location.address);
  const [inputAdd, setInputAdd] = useState("")

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    const address = await reverseGeocode(lat, lng);
    setAddress(address);
    editLocation({
        longitude: lng, 
        latitude: lat,
        address: address
      }
    )
  };

  // Custom component to change the map view
  function ChangeView({ center }) {
    const map = useMap();
    map.flyTo(center, 16);  // Adjust the zoom level as necessary
    return null;
  }

  const handleGeoCode = async (searchQuery) => {
    if(searchQuery === '') return;
    console.log(searchQuery);
    const locationInput = await geocode(searchQuery);
    console.log("Input: " ,locationInput)
    if (locationInput) {
      setPosition([locationInput.lat, locationInput.lon]);
      setAddress(locationInput.display_name)
      editLocation({
        longitude: locationInput.lon, 
        latitude: locationInput.lat,
        address: locationInput.display_name}
      )
      
    }
  };

  function MapClickHandler({ onClick }) {
    useMapEvents({
      click: onClick,
    });
    return null;
  }
      
  async function geocode(query) {
    console.log("queryr:", query);
    const url = `${NOMINATIM_BASE_URL}search?format=json&q=${encodeURIComponent(query)}&limit=1`;
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.length > 0) {
        return data[0];
    }
    return null;
  }
  
  async function reverseGeocode(lat, lon) {
      const url = `${NOMINATIM_BASE_URL}reverse?format=json&lat=${lat}&lon=${lon}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.address) {
        return data.display_name;
      }
      return null;
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50'>
    <div className='relative bg-white p-5 rounded-lg shadow-lg w-full max-w-xl h-auto mx-4'>
      <div className="flex mb-2">
        <h4 className="text-heading3_semibold font-semibold">Chọn vị trí của bạn</h4>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          onClick={handleClose}
        >
          <IoMdClose size={24} />
        </button>
      </div>

      {/* Geocoding Input */}
      <div className='flex gap-4'>
        <input 
          type="text" 
          placeholder="Nhập vị trí" 
          className='input_text w-full'
          value={inputAdd}
          onChange={(e) => {console.log(e.target.value);setInputAdd(e.target.value)}}
        />
        <div className='outline_btn h-[36px] mt-2' onClick={() => handleGeoCode(inputAdd)}>Tìm</div>
      </div>

      {/* Display the selected address */}
      {address && <p className='text-base my-2'>{address}</p>}

      {/* Map */}
      <MapContainer 
        center={position} 
        zoom={16} 
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && <Marker position={position} icon={greenIcon} />}
        {/* Change view based on new position */}
        <ChangeView center={position} />

        {/* Capture map clicks */}
        <MapClickHandler onClick={handleMapClick} />
      </MapContainer>
      </div>
    </div>
  );
}

export default Map