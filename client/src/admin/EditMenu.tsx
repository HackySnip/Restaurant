import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { menuFormSchema, menuSchema } from "@/schema/menuSchema";
import { Loader2 } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useMenuStore } from "../../store/useMenuStore";

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: any;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState<menuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [error, setError] = useState<Partial<menuFormSchema>>({});
  const { loading, editMenu } = useMenuStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<menuFormSchema>);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("image", input.image);
      }
      await editMenu(selectedMenu._id, formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || 0,
      image: undefined,
    });
  }, [selectedMenu]);
  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh and exciting!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={input?.name}
              onChange={changeEventHandler}
              type="text"
              placeholder="Enter menu name"
            />
            {error && (
              <span className="text-xs font-medium text-red-600">
                {error.name}
              </span>
            )}
          </div>
          <div>
            <Label>Description</Label>
            <Input
              name="description"
              value={input?.description}
              onChange={changeEventHandler}
              type="text"
              placeholder="Enter menu description"
            />
            {error && (
              <span className="text-xs font-medium text-red-600">
                {error.description}
              </span>
            )}
          </div>
          <div>
            <Label>Price</Label>
            <Input
              name="price"
              value={input?.price}
              onChange={changeEventHandler}
              type="number"
              placeholder="Enter menu price"
            />
            {error && (
              <span className="text-xs font-medium text-red-600">
                {error.price}
              </span>
            )}
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
            {error && (
              <span className="text-xs font-medium text-red-600">
                {error.image?.name}
              </span>
            )}
          </div>
          <DialogFooter className="mt-5">
            {loading ? (
              <Button
                disabled
                className="w-full bg-orange hover:bg-hoverOrange"
              >
                <Loader2 className="w-4 h-4 animate-spin mr-2" /> Please wait
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
  );
};

export default EditMenu;
