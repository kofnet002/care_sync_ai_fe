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
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
        <h1 className="mb-4 text-center text-2xl font-bold text-[#3e888c]">
          Account Verification
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Please enter the 6-digit code sent to your email.
        </p>

        {/* OTP Input */}
        <div className="flex justify-center gap-2">
          <InputOTP maxLength={6} value={value} onChange={setValue}>
            <InputOTPGroup>
              {[0, 1, 2].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="h-12 w-12 rounded-lg border-2 border-[#3e888c] text-lg font-semibold transition-all focus:border-[#226466] focus:ring-2 focus:ring-[#3e888c]/50"
                />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator className="mx-2 text-gray-400" />
            <InputOTPGroup>
              {[3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="h-12 w-12 rounded-lg border-2 border-[#3e888c] text-lg font-semibold transition-all focus:border-[#226466] focus:ring-2 focus:ring-[#3e888c]/50"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Button */}
        <Button
          className="mt-8 w-full rounded-lg bg-[#3e888c] text-white hover:bg-[#226466] transition-all duration-300"
          disabled={value.length < 6 || isLoading}
          onClick={verifyAccount}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin w-5 h-5" />
          ) : (
            "Verify Account"
          )}
        </Button>

        {/* Resend Logic */}
        <div className="text-center mt-6 text-sm">
          {timeLeft > 0 ? (
            <p className="text-gray-600">
              Didn’t receive the code? Wait <strong>{timeLeft}s</strong>
            </p>
          ) : (
            <button
              type="button"
              onClick={() => {
                setTimeLeft(60);
                resendOTP();
              }}
              className="text-[#3e888c] hover:underline font-medium transition"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
