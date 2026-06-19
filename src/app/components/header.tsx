import Image from "next/image";
import logo from "../../../public/images/logo.svg";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-5">
      <Image src={logo} alt="logo" />

      <div className="text-bodySm text-neutral-200">
        55 Currencies · EOD · ECB data
      </div>
    </header>
  );
};

export default Header;
