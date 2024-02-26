import Image from "next/image";
import Menu from "../../public/assets/hamburger.svg";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-5 px-[18px]">
        <h1>Along</h1>
        <Image src={Menu} alt="hamburger menu"/>
    </nav>
  )
}
