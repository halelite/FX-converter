import CurrencyConverter from "../components/converter";
import DetailsContainer from "../components/detailsContainer";

export default function Home() {
  return (
    <div className="h-full flex flex-col gap-8 py-8 px-4 md:py-12 md:px-6 lg:px-8 -bg-zinc-50 -dark:bg-black">
      <CurrencyConverter />

      <DetailsContainer />
    </div>
  );
}
