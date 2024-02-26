import Image from "next/image";
import { useUi } from "@/context/UiContext/uiContext";
import DriversPreview from "./user/drivers-preview";
import Spin from "../../public/assets/spin-board.svg";

export default function Footer() {
  const { showSpin } = useUi();
  return (
    <footer className=" fixed inset-x-0 bottom-0 w-full max- bg-[#F2F2F2] rounded-tl-[12px] rounded-tr-[12px] overflow-y-scroll border border-red-600 z-50 ">
      {showSpin ? (
        <div className="flex flex-col gap-2.5 items-center pt-4">
          <h3 className="text-xl font-semibold">CLICK AND SPIN TO WIN</h3>
          <Image src={Spin} alt="" />
        </div>
      ) : (
        <DriversPreview />
      )}
    </footer>
  );
}
