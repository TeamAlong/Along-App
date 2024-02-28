import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Layout from "@/components/Layout";
import Image from "next/image";
import { useUi } from "@/context/UiContext/uiContext";
import Ticket from "@/components/user/Ticket";
import Circles from "../../public/assets/loc-circles.svg";
import Rout from "../../public/assets/route-icon.svg";

export default function Home() {
  const { setShowSpin, setShowBtn, showBtn, showTicket, setShowTicket } =
    useUi();

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
  }, []);

  const handleGetAlongClick = () => {
    setShowSpin(false); // Hide the spin and show drivers preview
    setShowBtn(false);
  };

  return (
    <Layout>
      <main className="relative pt-40 pb-10 px-3 flex flex-col items-center gap-[220px]">
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
        
        {showTicket ? (
          <Ticket />
        ) : (
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
