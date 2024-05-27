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
import { Link, NavLink, useSearchParams } from "react-router-dom";
import supabase from "@/lib/supabase";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react";

const styles = {
  pageContainer: "grid h-screen grid-cols-2",
  leftSection:
    "relative hidden px-12 md:grid bg-primary size-full place-content-center",
  leftSectionTitle:
    "absolute text-3xl text-white arvo-bold top-5 left-5 md:text-4xl",
  leftSectionImage: "object-contain m-auto",
  rightSection:
    "container flex flex-col items-start justify-center col-span-2 text-left size-full md:col-span-1",
  form: "w-full max-w-lg mx-auto my-12 md:my-auto",
  sectionSpacing: "mb-8 space-y-4 leading-relaxed",
  sectionTitle: "text-4xl arvo-bold",
  sectionDescription: "text-xl text-muted",
  inputContainer: "my-6",
  inputLabel: "text-xl arvo-bold",
  inputField:
    "block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl",
  checkboxContainer: "flex justify-between items-center",
  checkboxLabel:
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  forgotPasswordLink: "text-gray-400 raleway-medium text-[14px] cursor-pointer",
  loginButton: "w-full rounded-full h-[50px] text-[16px]",
  signUpLink: "my-6 text-center text-muted",
};

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const to = searchParams.get("to") || "";

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

   const [showPassword, setShowPassword] = useState(false);
   const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
   };

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      console.log(data);
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
    <div className={styles.pageContainer}>
      {/* LEFT IMAGE SECTION */}
      <section className={styles.leftSection}>
        <h2 className={styles.leftSectionTitle}>LOGO</h2>
        <img
          width={612}
          height={612}
          src="/src/assets/images/login.png"
          alt="signup"
          className={styles.leftSectionImage}
        />
      </section>

      {/* RIGHT FORM SECTION */}
      <section className={styles.rightSection}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className={styles.form}
          >
            <div className={styles.sectionSpacing}>
              <h1 className={styles.sectionTitle}>Account Login</h1>
              <p className={styles.sectionDescription}>
                If you are already a member you can login with your email
                address and password.
              </p>
            </div>
            <div className={styles.inputContainer}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={styles.inputLabel}>
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className={styles.inputField}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className={styles.inputContainer}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={styles.inputLabel}>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className={styles.inputField}
                        icon={
                          <div
                            onClick={togglePasswordVisibility}
                            className="cursor-pointer"
                          >
                            {showPassword ? (
                              <EyeIcon size={20} color="#F15084" />
                            ) : (
                              <EyeOff size={20} color="#F15084" />
                            )}
                          </div>
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className={styles.checkboxContainer}>
              <div className="flex items-center my-6 space-x-2">
                <Checkbox />
                <Label htmlFor="terms" className={styles.checkboxLabel}>
                  Remember me
                </Label>
              </div>
              <NavLink to="/reset-password">
                <div className={styles.forgotPasswordLink}>
                  Forgot Password?
                </div>
              </NavLink>
            </div>

            <Button
              disabled={isLoading}
              className={styles.loginButton}
              type="submit"
            >
              Login
            </Button>

            <p className={styles.signUpLink}>
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
