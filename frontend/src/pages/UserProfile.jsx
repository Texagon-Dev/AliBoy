import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { uploadAvatarToSupabase } from "../lib/functions.jsx";

import { useRef } from "react";
import { fetchUserProfile} from "@/redux/features/userSlice.jsx";
// import { fetchUser } from "@/redux/features/userSlice.jsx";

const UserProfile = () => {
  const userId = useSelector((state) => state.user.userId);
  const users = useSelector((state) => state.user.users);

  console.log("user Profile", users);


  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const form = useForm({
    defaultValues: {
      name: "",
      dob: "",
      email: "",
      password: "",
    },
    mode: "onBlur", // or "onChange"
  });

 

  // Function to format date of birth to dd/mm/yyyy format
  const formatDOB = (dob) => {
    const date = new Date(dob);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

 const defaultDob = users.length > 0 ? formatDOB(users[0].metadata.dob) : "";
  

useEffect(() => {
  console.log("Users:", users);
  if (users.length > 0) {
    const userData = users[0];
    console.log("UserData:", userData);
    const dobDate = userData.metadata.dob
      ? new Date(userData.metadata.dob)
      : null;
    console.log("DOB Date:", dobDate);
    const dobFormatted = dobDate
      ? `${dobDate.getDate()}/${
          dobDate.getMonth() + 1
        }/${dobDate.getFullYear()}`
      : "";
    console.log("Formatted DOB:", dobFormatted);
    const defaultValues = {
      name: userData.metadata.full_name || "",
      date: dobFormatted,
      email: userData.email || "",
      password: "",
    };
    form.reset(defaultValues);
  }
}, [users, form]);

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await uploadAvatarToSupabase(userId, file);
    }
  };

  const [setFormError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);
      setFormError(null);
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError(
        "An error occurred while submitting the form. Please try again."
      );
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
            {users.map((user) => (
              <div key={user.uuid}>
                <Avatar className="lg:h-[248px] lg:w-[248px] h-[200px] w-[200px]">
                  <AvatarImage
                    src={user.profile_image || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            ))}
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
                  render={({ field }) => (
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
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl lg:text-2xl arvo-bold">
                        Date of Birth
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value}
                         
                          className=" block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
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
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  rules={{ required: "Password is required" }} // Add validation rules
                  render={({ field }) => (
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
                      <FormDescription></FormDescription>
                      {/* <FormMessage>{form.errors.password?.message}</FormMessage> */}
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
