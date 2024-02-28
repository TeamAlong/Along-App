import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Layout from "@/components/Layout";
import Image from "next/image";
import { useTrip } from "@/context/TripContext/TripContext";
import AcceptModal from "@/components/driver/Accept-modal";
import MovementModal from "@/components/driver/Movement-modal";
import RideComplete from "@/components/driver/RideComplete";
import Circles from "../../../public/assets/loc-circles.svg";
import Rout from "../../../public/assets/route-icon.svg";
import Arrow from "../../../public/assets/arrow-right.svg";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMovementModal, setShowMovementModal] = useState(false);
  const [showRideComplete, setShowRideComplete] = useState(false);

  const { setDriverLocation } = useTrip();

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 14,
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
      console.log("Drivers's location:", position.coords);
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
        setDriverLocation({ latitude: newLatitude, longitude: newLongitude });

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

  // When "Accept" is clicked in the AcceptModal, hide it and show the MovementModal
  const handleAccept = () => {
    setIsModalOpen(false);
    setShowMovementModal(true);
  };

  const handleMovementModalClick = () => {
    setShowMovementModal(false); // Hide the MovementModal
    setShowRideComplete(true); // Show the RideComplete component
  };

  return (
    <Layout>
      <main className="relative pt-40 pb-10 px-3 h-full flex flex-col items-center ">
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <LoadScript googleMapsApiKey="AIzaSyAs1pIkGKW7Ex-huahARaHrzshbjMBhvME">
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

        <section className="w-full flex flex-col items-center gap-[80px] z-10 px-4">
          <section className="z-10 w-full flex items-center gap-6 px-4 py-[18px] rounded-lg bg-[#F2F2F2]">
            <Image src={Circles} alt="" />

            <div className="w-full flex flex-col">
              <div className="flex flex-col gap-2 items-start border-b border-[#7E7E7E] pb-3">
                <p className="text-xs text-[#7E7E7E]">From</p>
                <input
                  className="w-full h-full bg-transparent border-none outline-none"
                  type="text"
                  placeholder="Your location"
                />
              </div>

              <div className="flex flex-col gap-2 items-start pt-3 ">
                <p className="text-xs text-[#7E7E7E]">To</p>
                <input
                  className="w-full h-full bg-transparent border-none outline-none"
                  type="text"
                  placeholder="Wuse market"
                />
              </div>
            </div>

            <Image src={Rout} alt="" />
          </section>

          {isModalOpen && <AcceptModal onAccept={handleAccept} />}
          {showRideComplete && <RideComplete />}
        </section>

        {!showMovementModal && !showRideComplete && (
          <button
            className="w-[90%] fixed  bottom-16 flex items-center gap-5 justify-center self-center bg-[#F2F2F2] py-3 px-4 rounded-2xl text-xl text-[#717171] font-bold z-10"
            onClick={() => setIsModalOpen(true)}
          >
            Select your route
            <Image src={Arrow} alt="right arrow" />
          </button>
        )}
        {showMovementModal && (
          <MovementModal onSectionClick={handleMovementModalClick} />
        )}
      </main>
    </Layout>
  );
}
