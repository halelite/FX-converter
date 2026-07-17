import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import lightLogo from "../../../public/images/light-mode-logo.svg";
import { getCurrencies } from "@/lib/helpers";
import ThemeSwitchButton from "./ThemeSwitchButton";

const Header = async () => {
  const currencies = await getCurrencies();
  const currenciesCount = currencies?.length || 0;

  return (
    <header className="flex items-center justify-between gap-2 p-4 sm:px-6 sm:py-5">
      <Image
        src={logo}
        alt="dark theme logo"
        className="h-5 w-auto sm:h-auto text-foreground hidden dark:block"
      />
      <Image
        src={lightLogo}
        alt="light theme logo"
        className="h-5 w-auto sm:h-auto text-foreground dark:hidden"
      />

      <div className="flex items-center gap-1 sm:gap-2">
        <div className="text-captionSm sm:text-bodySm text-neutral-400 dark:text-neutral-200">
          {currenciesCount} Currencies · EOD · ECB data
        </div>

        <ThemeSwitchButton />
      </div>
    </header>
  );
};

export default Header;
