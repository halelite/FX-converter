import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import { getCurrencies } from "@/lib/helpers";

const Header = async () => {
  const currencies = await getCurrencies();
  const currenciesCount = currencies?.length || 0;

  return (
    <header className="flex items-center justify-between p-4 sm:px-6 sm:py-5">
      <Image src={logo} alt="logo" className="h-5 w-auto sm:h-auto" />

      <div className="text-captionSm sm:text-bodySm text-neutral-200">
        {currenciesCount} Currencies · EOD · ECB data
      </div>
    </header>
  );
};

export default Header;
