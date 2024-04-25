import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AdminLoginLogo from "../assets/Images/adminloginlogo.png";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AdminLoginPage = () => {
  const form = useForm();
  return (
    <div className="bg-primary1-pink w-full h-full pb-[120px]">
      <section className="container">
        <div className="pt-[50px]">
          <div className="flex flex-col justify-center items-center gap-8 ">
            <div>
              <img src={AdminLoginLogo} alt="Admin Login" />
            </div>
            <div className="w-[500px] h-[660px] bg-white rounded-[24px] p-10">
              <div>
                <h1 className="arvo-bold text-3xl text-primary1-blue mb-4">
                  Account Login
                </h1>
                <p className="raleway-regular text-xl text-[#C7C8CC]">
                  If you are already a member you can login with your email
                  address and password.
                </p>
                <div className="mt-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit()} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="email"
                        autoComplete="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormItem className="flex justify-between items-center">
                              <FormLabel className="text-[16px] arvo-bold ">
                                Email Address
                              </FormLabel>
                            </FormItem>
                            <FormControl>
                              <Input
                                placeholder="Joe Doe"
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
                        rules={{ required: "Password is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormItem className="flex justify-between items-center">
                              <FormLabel className="text-[16px] arvo-bold ">
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
                          </FormItem>
                        )}
                      />
                      <div className="flex items-center my-6 space-x-2">
                        <Checkbox />
                        <Label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember me
                        </Label>
                      </div>

                      <Button className="w-full rounded-full">Login</Button>

                      <p className="my-6 text-center text-muted">
                        Already have an account ?{" "}
                        <Link to="/signup" className="text-primary">
                          Sign Up here
                        </Link>
                      </p>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AdminLoginPage;
