import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserPassword,
  updateUserProfile,
  uploadAvatarToSupabase,
} from "../lib/functions.jsx";
import * as yup from "yup";
import { useRef } from "react";
import { fetchUserProfile } from "@/redux/features/userSlice.jsx";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

const UserProfile = () => {
  const userId = useSelector((state) => state.user.userId);
  const users = useSelector((state) => state.user.user);
  const avatarUrl = useSelector((state) => state.user.avatarUrl);
  const [inputType, setInputType] = useState("text");
  const handleFocus = () => setInputType("date");
  const handleBlur = () => setInputType("text");

  console.log("user Profile", users);

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5, "Name must be at least 5 characters")
      .required("Name is required"),
    dob: yup.string().required("Date of Birth is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      dob: "",
      email: "",
      password: "",
    },
    mode: "onBlur", // or "onChange"
  });

  useEffect(() => {
    console.log("Users:", users);

    const formattedDob = users.metadata.dob || "";

    const defaultValues = {
      name: users.metadata.full_name || "",
      dob: formattedDob,
      email: users.email || "",
      password: users.password || "",
    };
    form.reset(defaultValues);
  }, [users, form]);

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await uploadAvatarToSupabase(userId, file, dispatch);
    }
    dispatch(fetchUserProfile(userId));
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);

      if (data.password) {
        const passwordResult = await updateUserPassword(userId, data.password);
        if (!passwordResult.success) {
          throw new Error(passwordResult.error.message);
        }
      }

      const profileResult = await updateUserProfile(userId, data);
      if (!profileResult.success) {
        throw new Error(profileResult.error.message);
      }

      // If everything is successful, you can handle any additional logic here
      toast("Profile updated successfully");
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Form submission error:", error.message);
      toast(`Form submission error: ${error.message}`);
    }
  };

  const handleUpdateClick = () => {
    form.handleSubmit(onSubmit)();
  };
  return (
    <section className="container mx-auto mt-[120px] mb-10">
      <div className="w-full flex justify-center items-center text-4xl text-center flex-col lg:text-[64px] lg:leading-[58px] font-bold mb-10">
        <div className="w-full  mb-8">
          <h1 className="text-primary1-blue text-3xl lg:text-5xl md:text-4xl arvo-bold leading-[59px] ">
            User Profile
          </h1>
        </div>
      </div>

      <div className="flex md:flex-row flex-col">
        <div className="w-[40%] mx-auto">
          <div className="flex items-center justify-center flex-col mb-10">
            <Avatar className="lg:h-[248px] lg:w-[248px] h-[200px] w-[200px]">
              <AvatarImage src={avatarUrl || "https://github.com/shadcn.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
              ref={fileInputRef} // You'll define this ref
              id="avatar-upload"
            />

            <NavLink className="flex items-center justify-center mt-16">
              <Button
                className="lg:w-[308px] lg:h-[56px] md:w-[250px] md:h-[56px] arvo-regular rounded-[24px] text-xl w-[230px] h-[50px] hover:bg-transparent hover:text-primary1-pink hover:border hover:border-primary1-pink"
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              >
                Change
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="md:w-[60%] w-full">
          <div className="flex w-full flex-col">
            <Form {...form}>
              <form onSubmit={form.handleSubmit()} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  autoComplete="username"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormItem className="flex justify-between items-center">
                        <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                          Name
                        </FormLabel>
                      </FormItem>
                      <FormControl>
                        <Input
                          placeholder="Joe Doe"
                          {...field}
                          type="name"
                          className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                        />
                      </FormControl>
                      {error && <FormMessage>{error.message}</FormMessage>}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormLabel className="text-xl lg:text-2xl arvo-bold">
                        Date of Birth
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={inputType}
                          value={field.value}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          className=" block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl"
                          {...field}
                        />
                      </FormControl>
                      {error && <FormMessage>{error.message}</FormMessage>}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormItem className="flex justify-between items-center">
                        <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                          Email
                        </FormLabel>
                      </FormItem>
                      <FormControl>
                        <Input
                          placeholder="xyz@gmail.com"
                          {...field}
                          type="email"
                          className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                        />
                      </FormControl>
                      {error && <FormMessage>{error.message}</FormMessage>}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormItem className="flex justify-between items-center">
                        <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                          Password
                        </FormLabel>
                      </FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter Password"
                          {...field}
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                          icon={
                            <div
                              onClick={togglePasswordVisibility}
                              className="cursor-pointer"
                            >
                              {showPassword ? (
                                <EyeIcon size={20} color="#FBD3C4" />
                              ) : (
                                <EyeOff size={20} color="#FBD3C4" />
                              )}
                            </div>
                          }
                        />
                      </FormControl>

                      {error && <FormMessage>{error.message}</FormMessage>}
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <NavLink className="flex items-center justify-center mt-16">
          <Button
            onClick={handleUpdateClick}
            className="lg:w-[400px] lg:h-[56px] md:w-[250px] md:h-[56px]    arvo-regular rounded-[24px] text-xl w-[300px] h-[50px]  hover:bg-transparent hover:text-primary1-pink hover:border hover:border-primary1-pink"
          >
            Update
          </Button>
        </NavLink>
        <NavLink className="flex items-center justify-center mt-8">
          <Button className="lg:w-[400px] lg:h-[56px] md:w-[250px] md:h-[56px]   arvo-regular rounded-[24px] text-xl w-[300px] h-[50px]  bg-transparent text-primary1-pink border border-primary1-pink">
            Stripe Dashboard
          </Button>
        </NavLink>
      </div>
    </section>
  );
};
export default UserProfile;
