import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const loading = false;
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <form className="flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Reset Password</h1>
          <p className="text-sm text-gray-600">Enter your new password</p>
        </div>
        <div className="relative w-full">
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your password"
            className="pl-10"
          />
          <KeyRound className="absolute size-5 inset-y-2 left-2 text-gray-400 pointer-events-none" />
        </div>
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
            Reset Password
          </Button>
        )}
        <span className="text-center">
          Back to{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
