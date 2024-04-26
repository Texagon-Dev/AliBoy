import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useSearchParams } from "react-router-dom";
import supabase from "@/lib/supabase";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const to = searchParams.get("to") || "";

  const form = useForm();

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("Login error:", error.message || "Unknown error");
        toast.error(`Login error: ${error.message || "Unknown error"}`);
      } else {
        toast.success("Login successful");
        window.location.href = to ? `${window.location.origin}${to}` : "/user";
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(`Sign-in error ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid h-screen grid-cols-2">
      {/* LEFT IMAGE SECTION */}
      <section className="relative hidden px-12 md:grid bg-primary size-full place-content-center ">
        <h2 className="absolute text-6xl text-white arvo-bold top-5 left-5">
          LOGO
        </h2>
        <img
          width={612}
          height={612}
          src="/src/assets/images/login.png"
          alt="signup"
          className="object-contain m-auto "
        />
      </section>
      {/* RIGHT FORM SECTION */}
      <section className="container flex flex-col items-start justify-center col-span-2 text-left size-full md:col-span-1 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="w-full max-w-lg mx-auto my-12 md:my-auto "
          >
            <div className="mb-8 space-y-4 leading-relaxed">
              <h1 className="text-4xl arvo-bold">Account Login</h1>
              <p className="text-xl text-muted">
                If you are already a member you can login with your email
                address and password.
              </p>
            </div>
            <div className="my-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" arvo-bold ">Email address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="user@email.com"
                        {...field}
                        type="email"
                        className=" p-2 border rounded-full "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="my-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" arvo-bold ">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        type="password"
                        className=" p-2 border rounded-full "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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

            <Button
              disabled={isLoading}
              className="w-full rounded-full"
              type="submit"
            >
              Login
            </Button>

            <p className="my-6 text-center text-muted">
              Already have an account ?{" "}
              <Link to="/signup" className="text-primary">
                Sign Up here
              </Link>
            </p>
          </form>
        </Form>
      </section>
    </div>
  );
};
export default SignIn;
