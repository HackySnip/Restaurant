import React, { FormEvent, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Loader2,
  LocateIcon,
  Mail,
  MapPin,
  MapPinHouse,
  Plus,
} from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const Profile = () => {
  const loading = false;
  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<string>("");

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prev) => ({
          ...prev,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Profile", profileData);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  return (
    <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="relative md:size-28 size-20">
            <AvatarImage src={selectedProfilePicture} />
            <AvatarFallback>RB</AvatarFallback>
            <input
              ref={imageRef}
              accept="image/*"
              type="file"
              className="hidden"
              onChange={fileChangeHandler}
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full"
            >
              <Plus className="text-white size-8" />
            </div>
          </Avatar>
          <Input
            type="text"
            name="fullname"
            value={profileData.fullname}
            className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent shadow-none"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 my-2">
          <Mail className="size-5 to-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <input
              type="text"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-transparent border-transparent outline-none border-none"
              name="email"
              value={profileData.email}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 my-2">
          <LocateIcon className="size-5 to-gray-500" />
          <div className="w-full">
            <Label>Address</Label>
            <input
              type="text"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-transparent border-transparent outline-none border-none"
              name="address"
              value={profileData.address}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 my-2">
          <MapPin className="size-5 to-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              type="text"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-transparent border-transparent outline-none border-none"
              name="city"
              value={profileData.city}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 my-2">
          <MapPinHouse className="size-5 to-gray-500" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              type="text"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-transparent border-transparent outline-none border-none"
              name="country"
              value={profileData.country}
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>
      <div className="text-center">
        {loading ? (
          <Button
            disabled
            className="bg-orange hover:bg-hoverOrange select-none"
          >
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Please wait
          </Button>
        ) : (
          <Button className="bg-orange hover:bg-hoverOrange">Update</Button>
        )}
      </div>
    </form>
  );
};

export default Profile;
