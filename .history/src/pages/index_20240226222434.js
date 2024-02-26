import { useState } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import { useUi } from "@/context/UiContext/uiContext";
import Circles from "../../public/assets/loc-circles.svg";
import Rout from "../../public/assets/route-icon.svg";

export default function Home() {
  const { setShowSpin } = useUi();

  const handleGetAlongClick = () => {
    setShowSpin(false); // Hide the spin and show drivers preview
  };
  return (
    <Layout>
      <main className="pt-30 px-3 flex flex-col gap-[278px]">
        <section className="w-full flex items-center gap-6 px-4 py-[18px] rounded-lg bg-[#F2F2F2] border border-red-600">
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

        <button
          className="w-[90%] self-center bg-[#F2F2F2] py-3 px-4 rounded-2xl text-xl text-[#717171] font-bold border border-red-600"
          onClick={handleGetAlongClick}
        >
          Get Along
        </button>
      </main>
    </Layout>
  );
}
