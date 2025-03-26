"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const Page = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const verifyAccount = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/verify-account", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          otp_code: value,
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        Cookies.set("access_token", responseData.data.credentials.access, {
          secure: true,
          expires: 0.16625, // 3 hours 59 minutes in days
        });
        Cookies.set("refresh_token", responseData.data.credentials.refresh, {
          secure: true,
          expires: 1,
        });
        router.push("/dashboard");
        toast.success("Account verified successfully");
        // setIsLoading(false);
      } else {
        toast.error(responseData.errors.detail);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/resendOTP", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast.success("New OTP has been sent to your account", {
          duration: 5000,
        });
        setIsLoading(false);
      } else {
        toast.error(responseData.errors.detail);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
        <h1 className="mb-6 text-center text-xl font-bold text-gray-800">
          Account Verification
        </h1>
        <p className="mb-8 text-center text-gray-600 text-sm">
          Please enter the 6-digit code sent to your email.
        </p>

        <div className="flex justify-center gap-2">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="h-12 w-12 rounded-lg border-2 border-[#3e888c] text-lg font-semibold transition-all focus:border-[#38888c]"
              />
              <InputOTPSlot
                index={1}
                className="h-12 w-12 mx-2 rounded-lg border-2 border-[#3e888c] text-lg font-semibold transition-all focus:border-[#38888c]"
              />
              <InputOTPSlot
                index={2}
                className="h-12 w-12 rounded-lg border-2 border-[#3e888c] text-lg font-semibold transition-all focus:border-[#38888c]"
              />
            </InputOTPGroup>
            <InputOTPSeparator className="mx-2 text-gray-400" />
            <InputOTPGroup>
              <InputOTPSlot
                index={3}
                className="h-12 w-12 rounded-lg border-2 border-[#3e888c] text-lg font-semibold transition-all focus:border-[#38888c]"
              />
              <InputOTPSlot
                index={4}
                className="h-12 w-12 mx-2 rounded-lg border-2 border-[#3e888c] text-lg font-semibold transition-all focus:border-[#38888c]"
              />
              <InputOTPSlot
                index={5}
                className="h-12 w-12 rounded-lg border-2 border-[#3e888c] text-lg font-semibold transition-all focus:border-[#38888c]"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          className="mt-8 w-full rounded-lg"
          disabled={value.length < 6 || isLoading}
          onClick={verifyAccount}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin w-5 h-5" />
          ) : (
            "Verify Account"
          )}
        </Button>

        <div className="text-center mt-5">
          {timeLeft > 0 ? (
            <p className="text-gray-600">
              {" "}
              Didn&apos;t receive the code? {timeLeft} seconds
            </p>
          ) : (
            <p
              onClick={() => {
                setTimeLeft(60);
                resendOTP();
              }}
              className="w-fit text-center mx-auto hover:cursor-pointer rounded-md hover:text-[#3e888c] text-base"
            >
              Resend OTP
            </p>
          )}
        </div>

        {/* <p className="mt-4 text-center text-sm text-gray-500">
          Didn&apos;t receive the code?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Resend
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Page;
