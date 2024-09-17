import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import HeroImage from "@/assets/hero_pizza.webp";
import EditMenu from "./EditMenu";

const menus = [
  {
    image: HeroImage,
    name: "Biryani",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, temporibus.",
    price: 80,
  },
  {
    image: HeroImage,
    name: "Biryani",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, temporibus.",
    price: 80,
  },
];

const AddMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [input, setInput] = useState<any>({
    image: undefined,
    name: "",
    description: "",
    price: 0,
  });
  const loading = false;
  const [selectedMenu, setSelectedMenu] = useState<any>();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Add Menu", input);
  };
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold md:text-2xl text-lg">
          AvailableMenu
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange hover:bg-hoverOrange">
              <Plus className="size-5 mr-2" />
              Add Menus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Add A New Menu</DialogTitle>
              <DialogDescription className="text-center">
                Create a menu that will make restaurant stand out
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  type="text"
                  placeholder="Enter menu name"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  name="description"
                  value={input.descrition}
                  onChange={changeEventHandler}
                  type="text"
                  placeholder="Enter menu description"
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  name="price"
                  value={input.price}
                  onChange={changeEventHandler}
                  type="number"
                  placeholder="Enter menu price"
                />
              </div>
              <div>
                <Label>Upload Menu Image</Label>
                <Input
                  name="image"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                  type="file"
                />
              </div>
              <DialogFooter className="mt-5">
                {loading ? (
                  <Button
                    disabled
                    className="w-full bg-orange hover:bg-hoverOrange"
                  >
                    <Loader2 className="w-4 h-4 animate-spin mr-2" /> Please
                    wait
                  </Button>
                ) : (
                  <Button className="w-full bg-orange hover:bg-hoverOrange">
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {menus.map((menu: any, idx: number) => (
        <div key={idx} className="mt-6 space-y-4">
          <div className="flex flex-col md:items-center md:p-4 p-2 shadow-md rounded-lg b md:space-x-4 md:flex-row border">
            <img
              src={menu.image}
              alt="menu"
              className="md:h-24 md:w-24 h-20 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="text-lg font-semibold text-gray-800">
                {menu.name}
              </div>
              <p className="text-sm to-gray-600 mt-7">{menu.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-[#D19254]">{menu.price}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                selectedMenu();
                setEditOpen(true);
              }}
              size={"sm"}
              className="bg-orange hover:bg-hoverOrange mt-2"
            >
              Edit
            </Button>
          </div>
        </div>
      ))}

      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;
