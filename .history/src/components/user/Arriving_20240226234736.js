import { useState } from "react";

export default function Arriving() {
  const [status, setStatus] = useState("arriving");

  // Function to handle click and update status
  const handleClick = () => {
    if (status === "arriving") {
      setStatus("arrived");
    } else if (status === "arrived") {
      setStatus("driving");
    } else if (status === "driving") {
      setStatus("arriving"); // Reset to initial state or handle as needed
    }
  };

    // Determine what to display based on the current status
    let headerText, subText, bottomText;
    if (status === "arriving") {
      headerText = "Arriving in 10 mins";
      subText = "AB 234 65F";
      bottomText = "Moving";
    } else if (status === "arrived") {
      headerText = "KADO to BANNEX"; // Assuming you want this text unchanged
      subText = "10 mins. 25KM";
      bottomText = "Arrived";
    } else if (status === "driving") {
        headerText = "KADO to BANNEX"; 
        subText = "10 mins. 25KM";
      bottomText = "Driving to destination"; 
    }

  return (
    <main className="w-full flex flex-col items-center gap-4 bg-[#F2F2F2] ">
      <div className="flex flex-col gap-6 text-[#626262] pt-8 pb-4">
        <h4 className="text-xl font-semibold">Arriving in 10 mins</h4>
        <div className="py-1 px-2 bg-[#E6E6E6] rounded font-semibold text-center">
          <p>AB 234 65F</p>
        </div>
      </div>

      <div className="w-full bg-[#367ADD] text-[#EFEFEF] text-2xl font-semibold text-center py-4">
        <p>Moving</p>
      </div>
    </main>
  );
}
