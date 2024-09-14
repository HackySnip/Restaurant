import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { KeyRound, Loader2, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoginInputState } from "@/schema/userSchema";
import { userSignUpSchema } from "../schema/userSchema";

const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const result = userSignUpSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
  };

  const loading = false;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 max-w-md w-full rounded-lg md:border"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl mb-5 text-center">Rushi Eats</h1>
          <div className="mb-4">
            <div className="relative">
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Email"
                className=" pl-10 focus-visible:ring-1"
              />
              <Mail className="absolute size-5 inset-y-2 left-2 text-gray-400 pointer-events-none" />
              {errors && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Password"
                className=" pl-10 focus-visible:ring-1"
              />
              <KeyRound className="absolute size-5 inset-y-2 left-2 text-gray-400 pointer-events-none" />
              {errors && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>
          </div>
          <div className="mb-10">
            {loading ? (
              <Button
                disabled
                className="bg-orange hover:bg-hoverOrange w-full"
              >
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-orange hover:bg-hoverOrange w-full"
              >
                Login
              </Button>
            )}
            <div className="mt-3 text-right">
              <Link
                to="/forgot-password"
                className="w-full text-right text-blue-500"
              >
                Forgot password ?
              </Link>
            </div>
          </div>
          <Separator />
          <p className="mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
