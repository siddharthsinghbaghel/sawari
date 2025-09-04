// import React, { useState, useEffect } from 'react'
// import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

// const containerStyle = {
//     width: '100%',
//     height: '100%',
// };

// const center = {
//     lat: -3.745,
//     lng: -38.523
// };

// const LiveTracking = () => {
//     const [ currentPosition, setCurrentPosition ] = useState(center);

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const { latitude, longitude } = position.coords;
//             setCurrentPosition({
//                 lat: latitude,
//                 lng: longitude
//             });
//         });

//         const watchId = navigator.geolocation.watchPosition((position) => {
//             const { latitude, longitude } = position.coords;
//             setCurrentPosition({
//                 lat: latitude,
//                 lng: longitude
//             });
//         });

//         return () => navigator.geolocation.clearWatch(watchId);
//     }, []);

//     useEffect(() => {
//         const updatePosition = () => {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 const { latitude, longitude } = position.coords;

//                 console.log('Position updated:', latitude, longitude);
//                 setCurrentPosition({
//                     lat: latitude,
//                     lng: longitude
//                 });
//             });
//         };

//         updatePosition(); // Initial position update

//         const intervalId = setInterval(updatePosition, 1000); // Update every 10 seconds

//     }, []);

//     return (
//         <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={currentPosition}
//                 zoom={15}
//             >
//                 <Marker position={currentPosition} />
//             </GoogleMap>
//         </LoadScript>
//     )
// }

// export default LiveTracking
import React, { useState, useEffect, useCallback } from "react";
import { LoadScript, GoogleMap } from "@react-google-maps/api";

const libraries = ["marker"];

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 28.6139, // New Delhi (default)
  lng: 77.2090,
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  // ✅ Get initial and live geolocation
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });

    const watchId = navigator.geolocation.watchPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // ✅ Update marker when position changes
  useEffect(() => {
    if (!map) return;

    if (!marker) {
      const newMarker = new google.maps.marker.AdvancedMarkerElement({
        position: currentPosition,
        map,
        title: "You are here",
      });
      setMarker(newMarker);
    } else {
      marker.position = currentPosition;
    }

    // Keep map centered on the user
    map.setCenter(currentPosition);
  }, [currentPosition, map]);

  // ✅ When map loads
  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
        onLoad={onLoad}
        options={{
          mapId: import.meta.env.VITE_GOOGLE_MAP_ID, // ✅ Make sure this is valid in .env
          zoomControl: true,
          mapTypeControl: true, // ✅ Satellite / Map toggle
          streetViewControl: true,
          fullscreenControl: true,
          disableDefaultUI: false, // ✅ Keep default UI
        }}
      />
    </LoadScript>
  );
};

export default LiveTracking;
