"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "@/app/components/navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import Link from "next/link";

// Types for form values
type LoginFormValues = {
  email: string;
  password1: string;
};

type RegistrationFormValues = {
  email: string;
  password1: string;
  password2: string;
  username: string;
  userType: string;
};

// Validation Schemas
const RegistrationValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  userType: Yup.string().required("User Type is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email Address is required"),
  password1: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  password2: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password1")], "Passwords must match"),
});

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email Address is required"),
  password1: Yup.string().required("Password is required"),
});

// Initial Values
const RegistrationInitialValues: RegistrationFormValues = {
  email: "",
  password1: "",
  password2: "",
  username: "",
  userType: "",
};

const LoginInitialValues: LoginFormValues = {
  email: "",
  password1: "",
};

const Page = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Create separate formiks for login and registration
  const loginFormik = useFormik<LoginFormValues>({
    initialValues: LoginInitialValues,
    validationSchema: LoginValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      handleSubmit(values, setSubmitting, resetForm, true);
    },
  });

  const registrationFormik = useFormik<RegistrationFormValues>({
    initialValues: RegistrationInitialValues,
    validationSchema: RegistrationValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      handleSubmit(values, setSubmitting, resetForm, false);
    },
  });

  // Shared submit handler
  const handleSubmit = async (
    values: LoginFormValues | RegistrationFormValues,
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: () => void,
    isLoginSubmit: boolean
  ) => {
    setIsLoading(true);

    try {
      const endpoint = isLoginSubmit ? "/api/auth/login" : "/api/auth/register";

      const requestBody = isLoginSubmit
        ? {
            email: values.email,
            password: values.password1,
          }
        : {
            email: (values as RegistrationFormValues).email,
            username: (values as RegistrationFormValues).username,
            user_type: (values as RegistrationFormValues).userType,
            password: (values as RegistrationFormValues).password1,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        const tokens =
          responseData.data?.credentials || responseData?.data.tokens;

        Cookies.set("access_token", tokens.access, {
          secure: true,
          expires: 0.16625, // ~4 hours
        });

        Cookies.set("refresh_token", tokens.refresh, {
          secure: true,
          expires: 1, // 1 day
        });

        toast.success(
          isLoginSubmit ? "Login successful" : "Registration successful"
        );

        resetForm();
        router.push("/verify-account");
      } else {
        const errorMessage =
          responseData.errors?.detail || "Something went wrong";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  // Get the active formik based on mode
  const formik = isLogin ? loginFormik : registrationFormik;

  // Redirect if already logged in
  useEffect(() => {
    const access = Cookies.get("access_token");
    if (access) {
      router.push("/dashboard");
    }
  }, [router]);

  const toggleAuthMode = () => setIsLogin(!isLogin);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh] p-4 w-full">
        {/* Form */}
        <h1 className="text-2xl font-bold">
          Be a part of the CareSync AI family
        </h1>

        <div className="flex items-center mx-auto justify-center w-full gap-2">
          <Image
            src="/login-banner.png"
            alt="Login Banner"
            width={500}
            height={0}
            className="w-[30%]"
          />
          <form
            className="w-full max-w-md flex flex-col gap-4"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={registrationFormik.values.username}
                    onChange={registrationFormik.handleChange}
                    onBlur={registrationFormik.handleBlur}
                    aria-invalid={
                      registrationFormik.touched.username &&
                      !!registrationFormik.errors.username
                    }
                  />
                  {registrationFormik.touched.username &&
                    registrationFormik.errors.username && (
                      <p className="text-red-500 text-sm">
                        {registrationFormik.errors.username}
                      </p>
                    )}
                </div>

                <div className="space-y-2">
                  <Select
                    onValueChange={(value) =>
                      registrationFormik.setFieldValue("userType", value)
                    }
                    value={registrationFormik.values.userType}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="User Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PATIENT">Patient</SelectItem>
                      <SelectItem value="DOCTOR">Doctor</SelectItem>
                    </SelectContent>
                  </Select>
                  {registrationFormik.touched.userType &&
                    registrationFormik.errors.userType && (
                      <p className="text-red-500 text-sm">
                        {registrationFormik.errors.userType}
                      </p>
                    )}
                </div>
              </>
            )}

            <div className="space-y-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={formik.touched.email && !!formik.errors.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                id="password1"
                name="password1"
                type="password"
                placeholder="Password"
                value={formik.values.password1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={
                  formik.touched.password1 && !!formik.errors.password1
                }
              />
              {formik.touched.password1 && formik.errors.password1 && (
                <p className="text-red-500 text-sm">
                  {formik.errors.password1}
                </p>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Input
                  id="password2"
                  name="password2"
                  type="password"
                  placeholder="Confirm Password"
                  value={registrationFormik.values.password2}
                  onChange={registrationFormik.handleChange}
                  onBlur={registrationFormik.handleBlur}
                  aria-invalid={
                    registrationFormik.touched.password2 &&
                    !!registrationFormik.errors.password2
                  }
                />
                {registrationFormik.touched.password2 &&
                  registrationFormik.errors.password2 && (
                    <p className="text-red-500 text-sm">
                      {registrationFormik.errors.password2}
                    </p>
                  )}
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-end">
                <Link
                  href="#"
                  className="text-gray-100 hover:underline  text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isLoading || !formik.isValid || !formik.dirty}
            >
              {isLoading ? (
                <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
              ) : isLogin ? (
                "Login"
              ) : (
                "Register"
              )}
            </Button>

            <p className="text-center text-sm mt-2">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                className="text-blue-600 hover:underline focus:outline-none"
                onClick={toggleAuthMode}
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
