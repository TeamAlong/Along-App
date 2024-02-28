import { useState, useEffect } from "react";
import { useUi } from "@/context/UiContext/uiContext";

export default function Arriving() {
  const [status, setStatus] = useState("arriving");
  const { setShowArriving, setShowTicket, showTicket } = useUi();


  useEffect(() => {
    let intervalId;

    // Function to update status based on the current status
    const updateStatus = () => {
      if (status === "arriving") {
        setStatus("arrived");
      } else if (status === "arrived") {
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
  let headerText, subText, bottomText;
  if (status === "arriving") {
    headerText = "Arriving in 10 mins";
    subText = "AB 234 65F";
    bottomText = "Moving";
  } else if (status === "arrived") {
    headerText = "KADO to BANNEX";
    subText = "10 mins. 25KM";
    bottomText = "Arrived";
  } else if (status === "driving") {
    headerText = "KADO to BANNEX";
    subText = "10 mins. 25KM";
    bottomText = "Driving to destination";
  }
   // If showTicket is true, return null or an empty fragment to render nothing
   if (showTicket) return null;

  return (
    <main className="w-full flex flex-col items-center gap-4 bg-[#F2F2F2]">
      <div className="flex flex-col gap-6 text-[#626262] pt-8 pb-4">
        <h4 className="text-xl font-semibold">{headerText}</h4>
        <div className="py-1 px-2 bg-[#E6E6E6] rounded font-semibold text-center">
          <p>{subText}</p>
        </div>
      </div>

      <div
        onClick={() => {
          if (status === "driving") {
            setShowTicket(true); 
          }
        }}
        className="w-full bg-[#367ADD] text-[#EFEFEF] text-2xl font-semibold text-center py-4"
      >
        <p>{bottomText}</p>
      </div>
    </main>
  );
}
