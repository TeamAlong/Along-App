import Image from "next/image";
import Done from "../../../public/assets/completed.svg";
import Arrow from "../../../public/assets/down-arrow.svg";

export default function RideComplete() {
  return (
    <main className="flex flex-col items-center gap-3 py-4 px-16 bg-[#F2F2F2] text-[#5D5D5D] font-semibold rounded-xl z-50">
      <Image src={Done} alt="done icon" />
      <div className="flex flex-col items-center gap-[18px]">
        <div className="flex flex-col items-center text-xl font-semibold">
          <h4>Ride completed</h4>
          <p className="text-2xl font-bold">N6000</p>
        </div>

        <div className="flex flex-col items-center gap-2 text-[#7A7A7A] font-medium">
          <p>Kadokushi 5km </p>
          <Image src={Arrow} alt="arrow icon" />
          <p>Wuse Market 5km </p>
        </div>
      </div>
    </main>
  );
}
