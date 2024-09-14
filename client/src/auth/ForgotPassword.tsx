import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const loading = false;
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <form className="flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Forgot Password</h1>
          <p className="text-sm text-gray-600">
            Enter your email address to reset password
          </p>
        </div>
        <div className="relative w-full">
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="pl-10"
          />
          <Mail className="absolute size-5 inset-y-2 left-2 text-gray-400 pointer-events-none" />
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
            Send Reset Link
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

export default ForgotPassword;
