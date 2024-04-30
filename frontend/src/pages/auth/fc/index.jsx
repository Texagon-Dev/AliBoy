import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";

const ResetPassword = () => {

	const form = useForm();
	return (
    <section className="container flex flex-col items-start justify-center col-span-2 text-left size-full md:col-span-1 mt-[120px] ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit()}
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
                  <FormLabel className=" arvo-bold ">
                    Confirm your email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@email.com"
                      {...field}
                      type="email"
                      className=" p-2 border rounded-full "
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
}
export default ResetPassword