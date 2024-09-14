import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<any>([]);
  const loading = false;

  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }

    if (value !== "" && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md max-w-md flex flex-col gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify email</h1>
          <p className="text-sm text-gray-600">
            Enter the 6 digit code sent to your email
          </p>
        </div>
        <form action="">
          <div className="flex justify-between md:gap-4">
            {otp.map((letter: string, idx: number) => (
              <Input
                className="md:w-12 md:h-12 w-8 h-8 text-sm md:text-2xl md:font-bold font-normal rounded-lg text-center focus:outline-none focus:ring-1"
                key={idx}
                type="text"
                maxLength={1}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(idx, e)
                }
                ref={(element) => (inputRef.current[idx] = element)}
                onChange={(e) => handleChange(idx, e.target.value)}
                value={letter}
              />
            ))}
          </div>
          {loading ? (
            <Button
              disabled
              className="bg-orange w-full mt-4 hover:bg-hoverOrange select-none"
            >
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Please wait
            </Button>
          ) : (
            <Button className="bg-orange hover:bg-hoverOrange w-full mt-4">
              Verify
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
