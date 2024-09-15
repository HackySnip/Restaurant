import React from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export interface IFilterOptions {
  id: string;
  label: string;
}

const filterOptions: IFilterOptions[] = [
  {
    id: "burger",
    label: "Burger",
  },
  {
    id: "pizza",
    label: "Pizza",
  },
  {
    id: "thali",
    label: "Thali",
  },
  {
    id: "biryani",
    label: "Biryani",
  },
];

const FilterPage = () => {
  const appliedFilterHandler = (value: string) => {
    console.log("Value", value);
  };
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter By Cuisines</h1>
        <Button variant={"link"}>Reset</Button>
      </div>
      {filterOptions.map((option) => (
        <div className="flex items-center space-x-2 my-2" key={option.id}>
          <Checkbox
            id={option.id}
            onClick={() => appliedFilterHandler(option.label)}
          />
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default FilterPage;
