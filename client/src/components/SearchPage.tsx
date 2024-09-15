import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Globe, MapPin, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import HeroImage from "@/assets/hero_pizza.webp";
import { Skeleton } from "./ui/skeleton";

const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          <div className="relative flex items-center gap-2">
            <Input
              type="text"
              className="pl-10 "
              placeholder="Search by restaurants & cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <Search className="absolute size-5 text-gray-500 inset-y-2 left-2" />
            <Button className="bg-orange hover:bg-hoverOrange">Search</Button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4  md:my-1">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-2">
              <h1 className="font-medium text-lg">(2) Search results found</h1>
              <div>
                {["burger", "pizza", "vadapav"].map(
                  (selectedFilter: string, idx: number) => (
                    <div
                      className="relative inline-flex items-center max-w-full"
                      key={idx}
                    >
                      <Badge
                        className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap"
                        variant={"outline"}
                      >
                        {selectedFilter}
                      </Badge>
                      <X
                        size={14}
                        className="absolute text-[#D19254] right-1"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item: number, idx: number) => (
              <Card
                key={idx}
                className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative">
                  <AspectRatio ratio={16 / 6}>
                    <img
                      src={HeroImage}
                      alt="resto"
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                  <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Featured
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h1 className="text-2xl text-gray-900 font-bold dark:text-gray-100">
                    Pizza Hunt
                  </h1>
                  <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin size={14} />
                    <p className="text-sm">
                      <span className="font-medium">Mumbai, India</span>
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {["burger", "pizza", "vadapav"].map(
                      (cuisine: string, idx: number) => (
                        <Badge
                          className="font-medium rounded-full px-3 py-1 shadow-sm"
                          key={idx}
                        >
                          {cuisine}
                        </Badge>
                      )
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 border-t dark:border-gray-700 border-gray-100 text-white flex justify-end">
                  <Link to={`/restaurant/${123}`}>
                    <Button className="bg-orange hover:bg-hoverOrange font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-300">
                      View Menu
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const SearchPageSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((item: number, idx: number) => (
        <Card
          key={idx}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="relative">
            <AspectRatio ratio={16 / 6}>
              <Skeleton className="w-full h-full object-cover" />
            </AspectRatio>
            <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3">
              <Skeleton className="w-16 h-4" />
            </div>
          </div>
          <CardContent className="p-4">
            <Skeleton className="w-3/4 h-6 mb-2" />
            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="w-5 h-5" />
              <Skeleton className="ml-2 w-1/3 h-4" />
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {Array(3)
                .fill("")
                .map((_, idx: number) => (
                  <Skeleton className="w-16 h-6 rounded-full" key={idx} />
                ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t dark:border-gray-700 border-gray-100 text-white flex justify-end">
            <Skeleton className="w-24 h-10 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

const NoResultsFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        No results found
      </h1>
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
        We couldn't find any results for your "{searchText}" <br />. Please try
        using different keywords.
      </p>
      <Link to="/" className="inline-block">
        <button className="bg-orange hover:bg-hoverOrange text-white font-semibold py-2 px-6 rounded-full shadow-md transition-colors duration-300">
          Back to Home
        </button>
      </Link>
    </div>
  );
};
