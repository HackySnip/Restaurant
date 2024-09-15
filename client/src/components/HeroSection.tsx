import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HeroImage from "@/assets/hero_pizza.webp";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:text-5xl md:font-extrabold text-4xl">
            Order Food anytime & anywhere
          </h1>
          <p className="text-grap-500">
            Hey! Our Delicious food is waiting for you we are always near to you
          </p>
        </div>
        <div className="relative flex items-center gap-2">
          <Input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 shadow-lg"
            placeholder="Search by restaurant name, city & country"
          />
          <Search className="absolute size-5 text-gray-500 inset-y-2 left-2" />
          <Button
            className="bg-orange hover:bg-hoverOrange"
            onClick={() => navigate(`/search/${searchText}`)}
          >
            Search
          </Button>
        </div>
      </div>
      <div>
        <img
          src={HeroImage}
          alt="pizza"
          className="object-cover w-full max-h-[500px]"
        ></img>
      </div>
    </div>
  );
};

export default HeroSection;
