import Image from "next/image";
import Stars from "../../../public/assets/review.svg";
import Driver from "../../../public/assets/driver-img.svg";
import Seat from "../../../public/assets/seat.svg";
import Car from "../../../public/assets/car.svg";

export default function DriversPreview() {
  return (
    <main className="w-full flex flex-col gap-11 p-2.5 ">
      <section className=" relative flex flex-col gap-6 pt-10 rounded-2xl bg-[#F2F2F2] border border-red-600">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-[#1C55A9] rounded-xl z-[10000]">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#F2F2F2]">
            <Image src={Car} alt="car icon" />
            <p className="text-sm text-[#F2F2F2]">AB 234 65F</p>
          </div>

          <div className="text-sm text-[#F2F2F2] px-4 py-2">
            <p>BANNEX JUNC</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-[52px] h-[52px] rounded-[52px]">
              <Image
                src={Driver}
                alt="driver photo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#4E4E4E]">Mr. Jojojo</h4>
              <p className="text-[#737373] text-xs">15min away</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-[#424141] font-semibold">N1500.00</h4>
            <div className="flex items-center gap-[3px] text-black font-semibold">
              <Image src={Seat} alt="seat icon" />
              <p>3</p>
            </div>
          </div>
        </div>
        <div className="self-center">
          <Image src={Stars} alt="" />
        </div>
      </section>
    </main>
  );
}
