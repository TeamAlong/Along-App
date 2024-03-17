import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Layout from "@/components/Layout";
import LocationInput from "@/components/LocationInput";
import Image from "next/image";
import { useUi } from "@/context/UiContext/uiContext";
import { useTrip } from "@/context/TripContext/TripContext";
import { useFrom } from "@/context/LocationContext/FromContext";
import { useDestination } from "@/context/LocationContext/DestinationContext";
import Ticket from "@/components/user/Ticket";
import Circles from "../../public/assets/loc-circles.svg";
import Rout from "../../public/assets/route-icon.svg";

export default function Home() {
  const { setShowSpin, setShowBtn, showBtn, showTicket, setShowTicket } =
    useUi();
  const { setUserLocation } = useTrip();

    const { source, setSource } = useFrom();
    const { destination, setDestination } = useDestination();

  const [location, setLocation] = useState(null);
  // const [destination, setDestination] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 16,
  });

  const containerStyle = {
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: 0,
    left: 0,
    // zIndex: -1,
  };

  useEffect(() => {
    function success(position) {
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }));
      console.log("User's location:", position.coords);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    const intervalId = setInterval(() => {
      // Increment latitude and longitude every 5 seconds
      setViewport((prevViewport) => {
        const newLatitude = prevViewport.latitude + 0.0001; // Simulated increment for latitude
        const newLongitude = prevViewport.longitude + 0.0001; // Simulated increment for longitude

        // Update the viewport with the new location
        const newViewport = {
          ...prevViewport,
          latitude: newLatitude,
          longitude: newLongitude,
        };

        // Log the updated location
        console.log(
          `Updated Location: Latitude: ${newLatitude}, Longitude: ${newLongitude}`
        );

        // Update location in the global context
        setUserLocation({ latitude: newLatitude, longitude: newLongitude });

        // Log confirmation that the global context was updated
        console.log("Global context updated with new location.");

        return newViewport;
      });
    }, 5000);

    return () => {
      console.log("Clearing location update interval.");
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  useEffect(() => {
    if(source) {
      console.log("source", source);
      console.log("destination", destination);
    }

  }, [source, destination])

  const handleGetAlongClick = () => {
    setShowSpin(false); // Hide the spin and show drivers preview
    setShowBtn(false);
  };

  return (
    <Layout>
      <main className="relative pt-20 pb-10 px-3 flex flex-col items-center gap-[220px]">
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat: viewport.latitude, lng: viewport.longitude }}
              zoom={viewport.zoom}
              onLoad={(map) => console.log("Google Map loaded:", map)}
            >
              <Marker
                position={{ lat: viewport.latitude, lng: viewport.longitude }}
              />
            </GoogleMap>
          </LoadScript>
        </div>

        {showTicket ? (
          <Ticket />
        ) : (
          <section className="z-10 w-full flex items-center gap-6 px-4 py-[18px] rounded-lg bg-[#F2F2F2]">
            <Image src={Circles} alt="" />

            <div className="w-full flex flex-col">
              <LocationInput
                label="From"
                value={location}
                onChange={setLocation}
                placeholder="Your location"
                type="source" 
              />

              <LocationInput
                label="To"
                value={destination}
                onChange={setDestination}
                placeholder="Destination"
                type="destination"
              />
            </div>

            <Image src={Rout} alt="" />
          </section>
        )}

        {showBtn && (
          <button
            className="w-[90%] self-center bg-[#F2F2F2] py-3 px-4 rounded-2xl text-xl text-[#717171] font-bold z-10"
            onClick={handleGetAlongClick}
          >
            Get Along
          </button>
        )}
      </main>
    </Layout>
  );
}
