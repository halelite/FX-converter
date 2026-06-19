import CurrencyConverter from "../components/converter";

export default function Home() {
  return (
    <div className="h-full flex flex-col gap-8 py-8 px-4 md:py-12 md:px-6 lg:px-8 -bg-zinc-50 -dark:bg-black">
      <CurrencyConverter />

      <div>this is a test for the tab section</div>
    </div>
  );
}
