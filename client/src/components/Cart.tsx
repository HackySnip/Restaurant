import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import CheckoutConfirmationPage from "./CheckoutConfirmationPage";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="justify-end">
        <Button variant={"link"}>Clear All</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Avatar>
                <AvatarImage />
                <AvatarFallback>RB</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>Biryani</TableCell>
            <TableCell>80</TableCell>
            <TableCell>
              <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                <Button
                  size={"icon"}
                  variant="outline"
                  className="rounded-full bg-gray-200"
                >
                  <Minus size={14} />
                </Button>
                <Button
                  disabled
                  variant={"outline"}
                  size={"icon"}
                  className="font-bold border-none"
                >
                  1
                </Button>
                <Button
                  size={"icon"}
                  variant="outline"
                  className="rounded-full bg-orange hover:bg-hoverOrange"
                >
                  <Plus size={14} />
                </Button>
              </div>
            </TableCell>
            <TableCell>80</TableCell>
            <TableCell className="flex justify-end">
              <Button size={"sm"} className="bg-orange hover:bg-hoverOrange">
                Remove
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">80</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
          className="bg-orange hover:bg-hoverOrange"
        >
          Proceed To Checkout
        </Button>
      </div>
      <CheckoutConfirmationPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
