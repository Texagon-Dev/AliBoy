import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import supabase from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const SignUp = () => {
  
  const [isLoading, setIsLoading] = useState(false);
 const [searchParams] = useSearchParams();
  const to = searchParams.get("to") || "/user";
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Full name is required"),
    dob: Yup.date().required("Date of birth is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });

  const handleSignUp = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullname,
            dob: data.dob,
          },
          emailRedirectTo: window.location.origin + to,
        },
      });

      if (error) throw error;

      toast.success(
        "Registration successful. Check your email to verify your account."
      );
      reset();
    } catch (error) {
      toast.error(`Signup failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid h-screen grid-cols-2">
      {/* LEFT IMAGE SECTION */}
      <section className="relative hidden px-12 md:grid bg-primary size-full place-content-center">
        <h2 className="absolute text-3xl text-white arvo-bold top-5 left-5 md:text-4xl">
          LOGO
        </h2>
        <img
          width={612}
          height={612}
          src="/src/assets/images/signup.png"
          alt="signup"
          className="object-contain m-auto  "
        />
      </section>
      {/* RIGHT FORM SECTION */}
      <section className="container flex flex-col items-start justify-center col-span-2 text-left size-full md:col-span-1 ">
        <Form>
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="w-full max-w-lg mx-auto my-12 md:my-auto "
          >
            <div className="mb-8 space-y-4 leading-relaxed">
              <h1 className="text-4xl arvo-bold">Account Signup</h1>
              <p className="text-xl text-muted">
                If you are already a member you can login with your email
                address and password.
              </p>
            </div>
            <div className="my-6">
              <Label className="arvo-bold" htmlFor="fullname">
                Full Name
              </Label>
              <Input
                type="text"
                placeholder="Full Name ex: John Doe"
                id="fullname"
                className="p-2 border rounded-full"
                {...register("fullname")}
              />
              {errors.fullname && (
                <p className="text-red-600">{errors.fullname.message}</p>
              )}
            </div>
            <div className="my-6">
              <Label className="arvo-bold" htmlFor="dob">
                Date of birth
              </Label>
              <Input
                type="date"
                id="dob"
                className="p-2 border rounded-full"
                {...register("dob")}
              />
              {errors.dob && (
                <p className="text-red-600">{errors.dob.message}</p>
              )}
            </div>
            <div className="my-6">
              <Label className="arvo-bold" htmlFor="email">
                Email address
              </Label>
              <Input
                type="email"
                placeholder="user@email.com"
                id="email"
                className="p-2 border rounded-full"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="my-6">
              <Label className="arvo-bold" htmlFor="password">
                Password
              </Label>
              <Input
                type="password"
                placeholder="Pa$$word"
                id="password"
                className="p-2 border rounded-full"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center my-6 space-x-2">
              <Checkbox />
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </Label>
            </div>

            <Button className="w-full rounded-full" disabled={isLoading}>
              Sign Up
            </Button>

            <p className="my-6 text-center text-muted">
              Already have an account ?{" "}
              <Link to="/signin" className="text-primary">
                Login here
              </Link>
            </p>
          </form>
        </Form>
      </section>
    </div>
  );
};
export default SignUp;
