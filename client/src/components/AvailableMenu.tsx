import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import HeroImage from "@/assets/hero_pizza.webp";

const AvailableMenu = () => {
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menu
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        <Card className="w-full md:max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
          <img src={HeroImage} alt="" className="w-full h-48 object-cover" />
          <CardContent>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Tandoori Biryani
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
            <h3 className="text-lg font-semibold mt-4">
              Price <span className="text-[#D19254] ">Rs. 80</span>
            </h3>
          </CardContent>
          <CardFooter className="p-4">
            <Button className="bg-orange hover:bg-hoverOrange w-full">
              Add to cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AvailableMenu;
