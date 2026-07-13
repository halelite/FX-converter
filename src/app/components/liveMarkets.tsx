import { getLatestTwoRates, getPairsChanges } from "@/lib/helpers";
import { Ticker } from "./ticker";

const LiveMarkets = async () => {
  const latestPairs = await getLatestTwoRates();
  const rates = getPairsChanges(latestPairs);

  return (
    <div className="flex relative">
      <div className="w-fit shrink-0 bg-lime-500 flex items-center gap-2 px-2 sm:px-4 py-3">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-300 opacity-75"></span>
          <span className="relative inline-flex size-1.5 rounded-full bg-neutral-900 pb-1.75"></span>
        </span>

        <div className="text-captionSm sm:text-caption sm:font-medium text-neutral-900 uppercase">
          Live markets
        </div>
      </div>

      <div className="flex overflow-x-hidden bg-neutral-700">
        <Ticker items={rates} />
      </div>
    </div>
  );
};

export default LiveMarkets;
