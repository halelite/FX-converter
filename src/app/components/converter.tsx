import Image from "next/image";
import exchange from "../../../public/images/icon-exchange.svg";
import { Button } from "@/components/ui/button";
import { StarFilled } from "@/assets/icons/star-filled";

const testNum = 1000;

const CurrencyConverter = () => {
  return (
    <div>
      <div className="text-h3 mb-4">CHECK THE RATE</div>
      <div className="bg-neutral-700 rounded-lg">
        <div className="flex items-center gap-6 p-4">
          <div className="flex-1 bg-neutral-600 border border-neutral-500 p-4 rounded-lg">
            <div className="text-bodySm mb-5">SEND</div>

            <div className="flex items-center justify-between">
              <div className="text-h1">{testNum.toLocaleString()}</div>
            </div>
          </div>

          <div className="size-12 flex items-center justify-center bg-neutral-600 border border-neutral-500 rounded-lg">
            <Image src={exchange} alt="exchange" className="w-4 h-4.5" />
          </div>

          <div className="flex-1 bg-neutral-600 border border-neutral-500 p-4 rounded-lg">
            <div className="text-bodySm mb-5">RECEIVE</div>

            <div className="flex items-center justify-between">
              <div className="text-h1 text-lime-500">
                {(853.02).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-t-neutral-500 border-dashed">
          <div className="text-captionMd">1 USD = 0.8530 EUR</div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="uppercase">
              <StarFilled />
              Favorite/Favorited
            </Button>

            <Button variant="outline" className="uppercase bg-transparent!">
              Log conversion
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
