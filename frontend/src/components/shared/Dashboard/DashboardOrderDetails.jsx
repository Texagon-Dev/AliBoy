import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
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

const DashboardOrderDetails = ({ order }) => {
  const form = useForm({
    defaultValues: {
      name: order?.user?.user_name || "",
      email: order?.user?.email || "",
    },
  });

  return (
    <>
      <DialogTrigger>View</DialogTrigger>
      <DialogContent className="bg-white ">
        <div>
          <h1 className="arvo-bold text-2xl lg:text-4xl md:text-3xl tracking-[5%]">
            Order Details
          </h1>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit()} className="space-y-6">
              <div className="flex md:justify-between md:flex-row flex-col">
                <div className="md:w-[48%] w-full">
                  <div className="flex w-full flex-col">
                    <FormField
                      control={form.control}
                      name="name"
                      autoComplete="off"
                      render={({ field }) => (
                        <FormItem>
                          <FormItem className="flex justify-between items-center">
                            <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                              User Name
                            </FormLabel>
                          </FormItem>
                          <FormControl>
                            <Input
                              placeholder={order?.user_name}
                              {...field}
                              type="name"
                              className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                              disabled
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      autoComplete="off"
                      render={({ field }) => (
                        <FormItem>
                          <FormItem className="flex justify-between items-center">
                            <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                              Email
                            </FormLabel>
                          </FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              {...field}
                              type="email"
                              className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                              disabled
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      autoComplete="off"
                      render={({ field }) => (
                        <FormItem>
                          <FormItem className="flex justify-between items-center">
                            <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                              Address
                            </FormLabel>
                          </FormItem>
                          <FormControl>
                            <Input
                              placeholder={order?.delivery_address}
                              {...field}
                              type="address"
                              className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                              disabled
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="itemTotal"
                      autoComplete="off"
                      render={({ field }) => (
                        <FormItem>
                          <FormItem className="flex justify-between items-center">
                            <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                              Item Total
                            </FormLabel>
                          </FormItem>
                          <FormControl>
                            <Input
                              placeholder={`$${order?.item_total}`}
                              {...field}
                              type="text"
                              className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                              disabled
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="orderStatus"
                      autoComplete="off"
                      render={({ field }) => (
                        <FormItem>
                          <FormItem className="flex justify-between items-center">
                            <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                              Order Status
                            </FormLabel>
                          </FormItem>
                          <FormControl>
                            <Input
                              placeholder={order?.order_status}
                              {...field}
                              type="text"
                              className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                              disabled
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="md:w-[48%] w-full">
                  <FormField
                    control={form.control}
                    name="bookTitle"
                    autoComplete="off"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem className="flex justify-between items-center">
                          <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                            Book Title
                          </FormLabel>
                        </FormItem>
                        <FormControl>
                          <Input
                            placeholder={order?.story_name}
                            {...field}
                            type="text"
                            className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                            disabled
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="titleSize"
                    autoComplete="off"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem className="flex justify-between items-center">
                          <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                            Title Size
                          </FormLabel>
                        </FormItem>
                        <FormControl>
                          <Input
                            placeholder={order?.title_size}
                            {...field}
                            type="text"
                            className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                            disabled
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="binding"
                    autoComplete="off"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem className="flex justify-between items-center">
                          <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                            Binding
                          </FormLabel>
                        </FormItem>
                        <FormControl>
                          <Input
                            placeholder={order?.binding_name}
                            {...field}
                            type="text"
                            className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                            disabled
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="printQuantity"
                    autoComplete="off"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem className="flex justify-between items-center">
                          <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                            Print Quantity
                          </FormLabel>
                        </FormItem>
                        <FormControl>
                          <Input
                            placeholder={order?.quantity}
                            {...field}
                            type="text"
                            className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                            disabled
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </>
  );
};
export default DashboardOrderDetails;
