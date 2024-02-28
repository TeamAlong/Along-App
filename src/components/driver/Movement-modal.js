import { useState, useEffect } from "react";
import Image from "next/image";
import Circle from "../../../public/assets/rout-circle.svg";
import Line from "../../../public/assets/rout-line.svg";
import Location from "../../../public/assets/rout-location.svg";
import User from "../../../public/assets/rout-user-pin.svg";

export default function MovementModal({ onSectionClick }) {
  const [status, setStatus] = useState("arrived");
  const [route, setRoute] = useState(false);

  useEffect(() => {
    let intervalId;

    // Function to update status based on the current status
    const updateStatus = () => {
      if (status === "arrived") {
        setStatus("driving");
      }
    };

    if (status !== "driving") {
      // Set up a timer that updates the status every 10 seconds if the status is not "driving"
      intervalId = setInterval(updateStatus, 10000);
    }

    // Clean up the interval on component unmount or when the status changes to "driving"
    return () => clearInterval(intervalId);
  }, [status]); // Dependency array to re-run the effect when 'status' changes

  // Determine what to display based on the current status
  let headerText, bottomText;
  if (status === "arrived") {
    headerText = "Kado junction1";
    bottomText = "Arrived";
  } else if (status === "driving") {
    headerText = "KADO to BANNEX";
    bottomText = "Driving to destination";
  }

  return (
    <main className=" fixed inset-x-0 bottom-0 w-full max-h-[320px] bg-[#F2F2F2] rounded-tl-[12px] rounded-tr-[12px] z-50 ">
      {route ? (
        <section
          className="w-full flex flex-col items-start gap-1 p-6 bg-transparent text-[#565656] font-semibold"
          onClick={onSectionClick}
        >
          <div className="w-full flex items-center justify-between">
            <Image src={Circle} alt="route circle" />
            <p className="text-xl">Kado jun1</p>
            <div className="flex items-center gap-2">
              <Image src={User} alt="route user" />
              <p>10</p>
            </div>
            <p>N12,000</p>
            <p>45%</p>
          </div>

          <Image src={Line} alt="route circle" className="ml-2.5" />

          <div className="w-full flex items-center justify-between">
            <Image src={Location} alt="route circle" />
            <p className="text-xl">Kado jun2</p>
            <div className="flex items-center gap-2">
              <Image src={User} alt="route user" />
              <p>3</p>
            </div>
            <p>N12,000</p>
            <p>45%</p>
          </div>

          <Image src={Line} alt="route circle" className="ml-2.5" />

          <div className="w-full flex items-center justify-between">
            <Image src={Circle} alt="route circle" />
            <p className="text-xl">Kado jun3</p>
            <div className="flex items-center gap-2">
              <Image src={User} alt="route user" />
              <p>6</p>
            </div>
            <p>N12,000</p>
            <p>45%</p>
          </div>
        </section>
      ) : (
        <section className="w-full flex flex-col items-center gap-4 bg-transparent">
          <div className="flex flex-col items-center gap-6 text-[#626262] pt-8 pb-4 font-semibold">
            <h4 className="text-xl">{headerText}</h4>
            <p>10 mins. 25KM</p>
          </div>

          <div
            onClick={() => {
              if (status === "driving") {
                setRoute(true);
              }
            }}
            className="w-full bg-[#367ADD] text-[#EFEFEF] text-2xl font-semibold text-center py-4 rounded-b-xl cursor-pointer"
          >
            <p>{bottomText}</p>
          </div>
        </section>
      )}
    </main>
  );
}
