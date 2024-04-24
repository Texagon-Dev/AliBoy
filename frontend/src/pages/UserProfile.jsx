import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      dob: null,
      email: "",
      password: "",
    },
    mode: "onBlur", // or "onChange"
  });

  const [formError, setFormError] = useState(null);

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
            <Avatar className="lg:h-[248px] lg:w-[248px] h-[200px] w-[200px] ">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <NavLink className="flex items-center justify-center mt-16">
              <Button className="lg:w-[308px] lg:h-[56px] md:w-[250px] md:h-[56px]  arvo-regular rounded-[24px] text-xl w-[230px] h-[50px]  hover:bg-transparent hover:text-primary1-pink hover:border hover:border-primary1-pink">
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left rounded-[40px] raleway-semibold text-xl px-4 py-3 h-[50px] border-[#FAC0D3]",
                                !field.value && "text-black"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span className="raleway-semibold text-xl text-primary1-blue">
                                  12/12/2012
                                </span>
                              )}
                              <CalendarIcon className="ml-auto text-primary1-pink h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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
                          type="password"
                          autoComplete="current-password"
                          className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
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
