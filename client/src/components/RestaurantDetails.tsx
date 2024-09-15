import HeroImage from "@/assets/hero_pizza.webp";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import AvailableMenu from "./AvailableMenu";

const RestaurantDetails = () => {
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="w-full">
        <div className="relatiive w-full h-32 md:h-64 lg:h-72">
          <img
            src={HeroImage}
            alt="resto"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">Tandoori tadka</h1>
            <div className="flex gap-2 my-2">
              {["Momos", "Parathas"].map((cuisine: string, idx: number) => (
                <Badge key={idx}>{cuisine}</Badge>
              ))}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="size-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time <span className="text-[#D19254]">35 mins</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <AvailableMenu />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
