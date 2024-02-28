import Image from "next/image";
import Arrow from "../../../public/assets/arrow_back.svg";
import Share from "../../../public/assets/share.svg";
import User from "../../../public/assets/ticket-user-img.svg";
import Rout from "../../../public/assets/route-icon.svg";
import Calendar from "../../../public/assets/calendar.svg";
import Time from "../../../public/assets/time.svg";
import QR from "../../../public/assets/bx_qr.svg";

export default function Ticket() {
  return (
    <main className="max-w-[368px] w-full flex flex-col justify-center gap-6 bg-[#ECF0F6] text-black  p-4 rounded-2xl z-50">
      <section className="w-full flex items-center justify-between text-xl">
        <Image src={Arrow} alt="left arrow" />
        <h3>Your ticket</h3>
        <Image src={Share} alt="left arrow" />
      </section>

      <section className="w-full flex flex-col gap-6 rounded-3xl bg-[#F2F2F2] text-[#4F4F4F]">
        <div className="w-full flex flex-col gap-8">
          <div className="flex items-center justify-start gap-2">
            <div className="w-12 h-12 rounded-[48px]">
              <Image
                src={User}
                alt="user image"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col text-xs text-[#737373]">
              <h3 className="text-xl font-semibold text-[#4B4B4B]">
                Chidi Tenex
              </h3>
              <p>Passenger</p>
            </div>
          </div>

          <div className="w-full flex items-center justify-between text-xl text-[#7E7E7E] font-semibold">
            <p>KADO</p>
            <Image src={Rout} alt="route icon" />
            <p>BANNEX</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-[#4F4F4F]">
          <div className="flex items-center gap-1">
            <Image src={Calendar} alt="calendar" />
            <p>27th Feb, 2024</p>
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Image src={Time} alt="calendar" />
              <p>02:30 PM</p>
            </div>
            <p>TO</p>

            <div className="flex items-center gap-1">
              <Image src={Time} alt="calendar" />
              <p>03:10 PM</p>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between px-4 py-8 border-t-4 border-dashed border-[#7E7E7E]">
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-3">
              <p>Fare</p>
              <p>N1500</p>
            </div>

            <div className="flex flex-col gap-3">
              <p>Seat</p>
              <p>01</p>
            </div>
          </div>

          <Image src={QR} alt="qr code" />
        </div>
      </section>

      <button className="w-full py-4 px-8 bg-[#367ADD] text-[#E8E8E8] text-xl font-semibold rounded-2xl">
        Download Ticket
      </button>
    </main>
  );
}
