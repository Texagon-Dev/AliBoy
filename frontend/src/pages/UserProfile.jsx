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
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
	const form = useForm();
  return (
    <section className="container mx-auto mt-[120px] mb-10">
      <div className="w-full flex justify-center items-center text-4xl text-center flex-col lg:text-[64px] lg:leading-[58px] font-bold mb-10">
        <div className="w-full  mb-8">
          <h1 className="text-primary1-blue text-3xl lg:text-5xl md:text-4xl arvo-bold leading-[59px] ">
            User Profile
          </h1>
        </div>
      </div>
     
        <div className="flex">
          <div className="w-[40%] mx-auto">
            <div className="flex items-center justify-center flex-col">
              <Avatar className="h-[248px] w-[248px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <NavLink className="flex items-center justify-center mt-16">
                <Button className="md:w-[308px] md:h-[56px]  arvo-regular rounded-[24px] text-xl w-[300px] h-[50px]  hover:bg-transparent hover:text-primary1-pink hover:border hover:border-primary1-pink">
                  Change
                </Button>
              </NavLink>
            </div>
          </div>
          <div className="w-[60%]">
            <div className="flex w-full flex-col">
              <Form {...form}>
                <form onSubmit={form.handleSubmit()} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
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
                    name="Email"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem className="flex justify-between items-center">
                          <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                            Email
                          </FormLabel>
                        </FormItem>
                        <FormControl>
                          <Input
                            placeholder="xyz@yopmail.com"
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
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem className="flex justify-between items-center">
                          <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                            Postcode/AreaCode
                          </FormLabel>
                        </FormItem>
                        <FormControl>
                          <Input
                            placeholder="Example"
                            {...field}
                            type="text"
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
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem className="flex justify-between items-center">
                          <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                            Postcode/AreaCode
                          </FormLabel>
                        </FormItem>
                        <FormControl>
                          <Input
                            placeholder="Example"
                            {...field}
                            type="text"
                            className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
        </div>
      
    </section>
  );
};
export default UserProfile;
