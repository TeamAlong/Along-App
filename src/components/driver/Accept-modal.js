import React from "react";

export default function AcceptModal({ onAccept }) {
  return (
    <main className="flex flex-col gap-3.5 bg-[#F2F2F2] text-[#626262] font-semibold rounded-xl z-10">
      <section className="flex flex-col items-center  gap-5 text-xl pt-[30px] pb-3.5 px-8">
        <p>KADO to BANNEX</p>
        <p>Kado junction1</p>
        <p>10 mins. 25KM</p>
      </section>

      <div
        onClick={onAccept}
        className="w-full bg-[#367ADD] py-3.5 px-[120px] text-xl font-semibold text-center text-[#EFEFEF] rounded-b-xl"
      >
        Accept
      </div>
    </main>
  );
}
