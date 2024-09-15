import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurantSchema,
  restaurantStateTypes,
} from "@/schema/restaurantSchema";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

const Restaurant = () => {
  const loading = false;
  const [errors, setErrors] = useState<Partial<restaurantStateTypes>>({});
  const [input, setInput] = useState<restaurantStateTypes>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = restaurantSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<restaurantStateTypes>);
      return;
    }
    console.log("Restaurant", input);
  };

  const restaurantHai = false;
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurant</h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              <div>
                <Label>Restaurant Name</Label>
                <Input
                  type="text"
                  value={input.restaurantName}
                  onChange={changeEventHandler}
                  name="restaurantName"
                  placeholder="Enter your restaurant name"
                />
                {errors && (
                  <span className="text-red-500 text-sm">
                    {errors.restaurantName}
                  </span>
                )}
              </div>
              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  value={input.city}
                  onChange={changeEventHandler}
                  name="city"
                  placeholder="Enter your city name"
                />
                {errors && (
                  <span className="text-red-500 text-sm">{errors.city}</span>
                )}
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  value={input.country}
                  onChange={changeEventHandler}
                  name="country"
                  placeholder="Enter your country name"
                />
                {errors && (
                  <span className="text-red-500 text-sm">{errors.country}</span>
                )}
              </div>
              <div>
                <Label>Delivery Time</Label>
                <Input
                  type="number"
                  value={input.deliveryTime}
                  onChange={changeEventHandler}
                  name="deliveryTime"
                  placeholder="Enter your delivery time"
                />
                {errors && (
                  <span className="text-red-500 text-sm">
                    {errors.deliveryTime}
                  </span>
                )}
              </div>
              <div>
                <Label>Cuisines</Label>
                <Input
                  type="text"
                  value={input.cuisines}
                  onChange={(e) =>
                    setInput({ ...input, cuisines: e.target.value.split(",") })
                  }
                  name="cuisines"
                  placeholder="eg. chinese, italian, japanese"
                />
                {errors && (
                  <span className="text-red-500 text-sm">
                    {errors.cuisines}
                  </span>
                )}
              </div>
              <div>
                <Label>Upload Restaurant Image</Label>
                <Input
                  onChange={(e) =>
                    setInput({ ...input, imageFile: e.target.files?.[0] })
                  }
                  type="file"
                  accept="image/*"
                  name="imageFile"
                />
                {errors && (
                  <span className="text-red-500 text-sm">
                    {errors.imageFile?.name || "Image is required"}
                  </span>
                )}
              </div>
            </div>
            <div className="my-5 w-fit">
              {loading ? (
                <Button
                  disabled
                  className="bg-orange hover:bg-hoverOrange select-none"
                >
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Please wait
                </Button>
              ) : (
                <Button className="bg-orange hover:bg-hoverOrange">
                  {restaurantHai
                    ? "Add Your Restaurant"
                    : "Update Your Restaurant"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
