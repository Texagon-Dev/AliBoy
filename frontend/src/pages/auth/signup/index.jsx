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
  errorMessage: "text-red-600",
  rememberMeContainer: "flex items-center my-6 space-x-2",
  rememberMeLabel:
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  signUpButton: "w-full rounded-full h-[50px] text-[16px]",
  signInLink: "my-6 text-center text-muted",
};

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

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    <div className={styles.pageContainer}>
      {/* LEFT IMAGE SECTION */}
      <section className={styles.leftSection}>
        <h2 className={styles.leftSectionTitle}>LOGO</h2>
        <img
          width={612}
          height={612}
          src="/src/assets/images/signup.png"
          alt="signup"
          className={styles.leftSectionImage}
        />
      </section>

      {/* RIGHT FORM SECTION */}
      <section className={styles.rightSection}>
        <Form>
          <form onSubmit={handleSubmit(handleSignUp)} className={styles.form}>
            <div className={styles.sectionSpacing}>
              <h1 className={styles.sectionTitle}>Account Signup</h1>
              <p className={styles.sectionDescription}>
                If you are already a member you can login with your email
                address and password.
              </p>
            </div>
            <div className={styles.inputContainer}>
              <Label className={styles.inputLabel} htmlFor="fullname">
                Full Name
              </Label>
              <Input
                type="text"
                id="fullname"
                className={styles.inputField}
                {...register("fullname")}
              />
              {errors.fullname && (
                <p className={styles.errorMessage}>{errors.fullname.message}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <Label className={styles.inputLabel} htmlFor="dob">
                Date of birth
              </Label>
              <Input
                type="date"
                placeholder=""
                id="dob"
                className={styles.inputField}
                {...register("dob")}
              />
              {errors.dob && (
                <p className={styles.errorMessage}>{errors.dob.message}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <Label className={styles.inputLabel} htmlFor="email">
                Email address
              </Label>
              <Input
                type="email"
                id="email"
                className={styles.inputField}
                {...register("email")}
              />
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email.message}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <Label className={styles.inputLabel} htmlFor="password">
                Password
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                className={styles.inputField}
                {...register("password")}
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
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password.message}</p>
              )}
            </div>

            <div className={styles.rememberMeContainer}>
              <Checkbox />
              <Label htmlFor="terms" className={styles.rememberMeLabel}>
                Remember me
              </Label>
            </div>

            <Button className={styles.signUpButton} disabled={isLoading}>
              Sign Up
            </Button>

            <p className={styles.signInLink}>
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
