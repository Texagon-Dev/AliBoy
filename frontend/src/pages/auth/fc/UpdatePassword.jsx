import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/supabase";
import { yupResolver } from "@hookform/resolvers/yup";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const UpdatePassword = () => {
	const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
	};
	const navigate = useNavigate()
	
	const handleUpdatePassword = async (data) => {
    const newPassword = data.password;
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error("Failed to update password:", error.message);
      toast.error(`Failed to update password: ${error.message}`);
    } else {
      toast.success("Password updated successfully!");
      navigate("/user");
    }
  };
  return (
    <section className="container flex flex-col items-start justify-center col-span-2 text-left size-full md:col-span-1 mt-[120px] ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdatePassword)}
          className="w-full max-w-lg mx-auto my-12 md:my-auto "
        >
          <div className="mb-8 space-y-4 leading-relaxed">
            <h1 className="text-4xl arvo-bold">Reset Password</h1>
            <p className="text-xl text-muted">Please update your password.</p>
          </div>
          <div className="my-6">
            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Password is required" }} // Add validation rules
              render={({ field }) => (
                <FormItem>
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-xl arvo-bold ">
                      Enter New Password
                    </FormLabel>
                  </FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      autoComplete="off"
                      className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
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
                  <FormDescription>
                    {form.formState.errors.password?.message}
                  </FormDescription>
                  {/* <FormMessage>{form.errors.password?.message}</FormMessage> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              rules={{ required: "Password is required" }} // Add validation rules
              render={({ field }) => (
                <FormItem>
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-xl arvo-bold ">
                      Confirm Password
                    </FormLabel>
                  </FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="off"
                      className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                      icon={
                        <div
                          onClick={toggleConfirmPasswordVisibility}
                          className="cursor-pointer"
                        >
                          {showConfirmPassword ? (
                            <EyeIcon size={20} color="#F15084" />
                          ) : (
                            <EyeOff size={20} color="#F15084" />
                          )}
                        </div>
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    {form.formState.errors.confirmPassword?.message}
                  </FormDescription>
                  {/* <FormMessage>{form.errors.password?.message}</FormMessage> */}
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full cursor-pointer arvo-bold">Submit</Button>
        </form>
      </Form>
    </section>
  );
};
export default UpdatePassword;
