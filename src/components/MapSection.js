import { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader,  MarkerF, } from "@react-google-maps/api";
import { useFrom } from "@/context/LocationContext/FromContext";
import { useDestination } from "@/context/LocationContext/DestinationContext";
import { Marker } from "react-map-gl";

const containerStyle = {
  width: "100%",
  height: "100vh",
  zoom: 0,
};

export default function MapSection() {
  const { source, setSource } = useFrom();
  const { destination, setDestination } = useDestination();
  //   const { isLoaded } = useJsApiLoader({
  //     id: "google-map-script",
  //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  //   });

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (source && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
  }, [source]);

  useEffect(() => {
    if (destination && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }
  }, [destination]);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
        <MarkerF position={{lat:source.lat, lng:source.lng}} />
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  );
}
