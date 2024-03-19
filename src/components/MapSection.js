import { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  OverlayView,
  OverlayViewF,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useFrom } from "@/context/LocationContext/FromContext";
import { useDestination } from "@/context/LocationContext/DestinationContext";
import { Marker } from "react-map-gl";

const containerStyle = {
  width: "100%",
  height: "100vh",
  zoom: 0,
};

export default function MapSection() {
  // const { source, setSource } = useFrom();
  // const { destination, setDestination } = useDestination();
  // //   const { isLoaded } = useJsApiLoader({
  // //     id: "google-map-script",
  // //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  // //   });

  // const [center, setCenter] = useState({
  //   lat: -3.745,
  //   lng: -38.523,
  // });

  // const [map, setMap] = useState(null);
  // const [directionRoutePoints, setDirectionRoutePoints] = useState([]);

  // useEffect(() => {
  //   if (source && map) {
  //     map.panTo({
  //       lat: source.lat,
  //       lng: source.lng,
  //     });
  //     setCenter({
  //       lat: source.lat,
  //       lng: source.lng,
  //     });
  //   }

  //   if (source && destination) {
  //     directionRoute();
  //   }
  // }, [source]);

  // useEffect(() => {
  //   if (destination && map) {
  //     setCenter({
  //       lat: destination.lat,
  //       lng: destination.lng,
  //     });
  //   }

  //   if (source && destination) {
  //     directionRoute();
  //   }
  // }, [destination]);

  // const directionRoute = () => {
  //   const DirectionService = new google.maps.DirectionsService();

  //   DirectionService.route(
  //     {
  //       origin: { lat: source.lat, lng: source.lng },
  //       destination: { lat: destination.lat, lng: destination.lng },
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     },
  //     (result, status) => {
  //       if (status === google.maps.DirectionsStatus.OK) {
  //         setDirectionRoutePoints(result);
  //       } else {
  //         console.error("DirectionsService error", status);
  //       }
  //     }
  //   );
  // };

  // My input 
  const {
    source,
    setSource
  } = useFrom();
  const {
    destination,
    setDestination
  } = useDestination();

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523
  });
  const [map, setMap] = useState(null);
  const [directionsResult, setDirectionsResult] = useState(null);

  // Define directionRoute at the top level of the component
  const directionRoute = useCallback(() => {
    if (!source || !destination || !map) return; // Early return if preconditions are not met

    const DirectionService = new window.google.maps.DirectionsService();

    DirectionService.route({
        origin: {
          lat: source.lat,
          lng: source.lng
        },
        destination: {
          lat: destination.lat,
          lng: destination.lng
        },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResult(result);
          const bounds = new window.google.maps.LatLngBounds();
          result.routes[0].overview_path.forEach((location) => {
            bounds.extend(location);
          });
          map.fitBounds(bounds);
        } else {
          console.error("DirectionsService error", status);
        }
      }
    );
  }, [source, destination, map]); // React will re-create this function when source, destination, or map changes

  useEffect(() => {
    if (source && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng
      });
      setCenter({
        lat: source.lat,
        lng: source.lng
      });
    };
    // Now, you can call directionRoute directly without conditional check here
    directionRoute();
  }, [source, directionRoute, map]);

  useEffect(() => {
    if (destination && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng
      });
    }
    // Call directionRoute again to ensure destination changes trigger route calculation
    directionRoute();
  }, [destination, directionRoute, map]);

  console.log(directionsResult);

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
      {source &&  (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: "/assets/user-marker.svg",
            scaledSize: {
              width: 40,
              height: 40,
            },
          }}
        >
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-semibold inline-block">
              <p className="text-black text-xs">{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}

      {/* Destination marker */}
      {destination && (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: "/assets/location-marker.svg",
            scaledSize: {
              width: 30,
              height: 30,
            },
          }}
        >
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-semibold inline-block">
              <p className="text-black text-xs">{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}
      {/* Child components, such as markers, info windows, etc. */}
      {/* <DirectionsRenderer directions={directionRoutePoints} options={{}} /> */}
      { directionsResult && (<DirectionsRenderer directions={directionsResult} options={{}} />)}
    </GoogleMap>
  );
}
