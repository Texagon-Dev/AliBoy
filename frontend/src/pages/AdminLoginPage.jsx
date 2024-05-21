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

const styles = {
  pageContainer: "bg-primary1-pink h-screen overflow-hidden",
  sectionContainer: "container",
  mainWrapper: "flex justify-center items-center h-screen",
  contentWrapper: "flex flex-col justify-center items-center gap-8",
  logoContainer: "md:h-[124px] md:w-[124px] h-[80px] w-[80px]",
  formContainer:
    "md:w-[500px] md:h-[600px] bg-white rounded-[24px] p-10 h-[70%] w-[95vw]",
  title: "arvo-bold text-3xl text-primary1-blue mb-4",
  description: "raleway-regular md:text-xl text-[16px] text-[#C7C8CC]",
  form: "mt-4 space-y-10",
  input:
    "block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl input-placeholder",
  rememberMeContainer: "flex items-center my-6 space-x-2",
  rememberMeLabel:
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  loginButton: "w-full rounded-full h-[50px] text-[16px]",
  signUpLink:
    "md:my-6 my-2 text-center text-muted md:text-[16px] text-[14px] ",
};

const AdminLoginPage = () => {
  const form = useForm();
  return (
    <div className={styles.pageContainer}>
      <section className={styles.sectionContainer}>
        <div className={styles.mainWrapper}>
          <div className={styles.contentWrapper}>
            <div>
              <img
                src={AdminLoginLogo}
                alt="Admin Login"
                className={styles.logoContainer}
              />
            </div>

            <div className={styles.formContainer}>
              <div>
                <h1 className={styles.title}>Account Login</h1>
                <p className={styles.description}>
                  If you are already a member you can login with your email
                  address and password.
                </p>
                <div className={styles.form}>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit()}
                      className={styles.form}
                    >
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
                                {...field}
                                type="email"
                                className={styles.input}
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
                                {...field}
                                type="password"
                                autoComplete="current-password"
                                className={styles.input}
                              />
                            </FormControl>
                            <FormDescription></FormDescription>
                          </FormItem>
                        )}
                      />
                      <div className={styles.rememberMeContainer}>
                        <Checkbox />
                        <Label
                          htmlFor="terms"
                          className={styles.rememberMeLabel}
                        >
                          Remember me
                        </Label>
                      </div>

                      <Button className={styles.loginButton}>Login</Button>

                      <p className={styles.signUpLink}>
                        Already have an account ?{" "}
                        <Link to="/signup" className="text-primary">Sign Up here</Link>
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
