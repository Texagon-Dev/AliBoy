import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const handleSubmitEmail = async (data) => {
      const { email } = data;

    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `http://localhost:5173/update-password`,
      });

      toast.success("Check your email for updating your password");
      form.reset();
    } catch (error) {
      console.error(`Error resetting password:, ${error.message}`);
      toast.error(`Error resetting password:, ${error.message}`);
    }
  };

  return (
    <section className="container flex flex-col items-start justify-center col-span-2 text-left size-full md:col-span-1 mt-[120px] ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitEmail)}
          className="w-full max-w-lg mx-auto my-12 md:my-auto "
        >
          <div className="mb-8 space-y-4 leading-relaxed">
            <h1 className="text-4xl arvo-bold">Reset Password</h1>
            <p className="text-xl text-muted">
              Forget Password? Please enter your email to update your password.
            </p>
          </div>
          <div className="my-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl arvo-bold ">
                    Confirm your email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                    />
                  </FormControl>
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
export default ResetPassword;
