import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import lefticon from "../assets/Images/left-icon.png";
import storyImage from "../assets/Images/storyImage1.png";
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
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { createCustomerOrder } from "@/redux/features/customerOrdersSlice";
import { useEffect, useState } from "react";
import { setPrintingOrder } from "@/redux/features/bookPrintingSlice";
import calculateOrderPricing from "@/lib/calculateOrderPricing";

const CheckoutPage = () => {
  const dispatch = useDispatch();

  const order = useSelector((state) => state.bookPrintingOrders.order);

  const form = useForm({
    defaultValues: order,
  });

  const [orderPricing, setOrderPricing] = useState(
    calculateOrderPricing(form.getValues())
  );
  const watchQuantity = form.watch("quantity");
  useEffect(() => {
    setOrderPricing(calculateOrderPricing(form.getValues()));
  }, [form, watchQuantity]);

  const { unitPrice, subTotal, grandTotal, discountPrice, shippingPrice } =
    orderPricing;

  const navigate = useNavigate();
  const onSubmit = (confirmedOrder) => {
    console.log(confirmedOrder);
    dispatch(createCustomerOrder(confirmedOrder));
    dispatch(setPrintingOrder(null));
    navigate("/dashboard");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="container mx-auto w-full mt-[80px] lg:mt-[120px] mb-10 lg:w-[1280px]">
          <div className="w-full  mb-8 ">
            <div>
              <Button className="bg-transparent text-primary1-blue text-sm lg:text-2xl arvo-bold hover:bg-transparent p-0 flex justify-start items-center gap-2 ">
                <NavLink className="flex" to="/dashboard">
                  <img
                    className="lg:h-[30px] lg:w-[30px] h-6 w-6  "
                    src={lefticon}
                    alt="go to dashboard icon"
                  />{" "}
                  Go to Dashboard
                </NavLink>
              </Button>
            </div>
            <div className="md-mt-8 mt-2">
              <h1 className="text-primary1-blue text-center lg:mt-2 mt-0 text-3xl lg:text-[64px] md:text-4xl  arvo-bold leading-[79px] w-full   ">
                My Order
              </h1>
            </div>
            <div className="lg:flex lg:flex-row md:flex-col  gap-2 md:mt-16 mt-6">
              <div className="lg:w-2/3">
                <div className="flex gap-5 w-full justify-center mb-8">
                  <div className="lg:w-[30%] w-full hidden lg:flex mb-4">
                    <div className="lg:w-[244px] lg:h-[396px] md:w-[200px] md:h-[200px]  w-[150px] h-[150px]  relative ">
                      <img
                        src={storyImage}
                        alt="story image"
                        className="object-cover	object-center  w-full h-full rounded-3xl"
                      />
                    </div>
                  </div>

                  <div className="md:w-[70%] md:ml-4 md:flex md:flex-col md:justify-center w-full">
                    <h1 className="md:text-[32px] md:leading-[39px] text-2xl arvo-bold">
                      {" "}
                      The Journey Of Dreams
                    </h1>
                    <div className="flex justify-center items-center w-full mt-8 mb-1">
                      <div className="w-full flex justify-between items-center">
                        <div className="lg:w-[70%]  space-y-6">
                          <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                              <FormItem>
                                <FormItem className="flex justify-between items-center">
                                  <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                                    Quantity
                                  </FormLabel>
                                </FormItem>
                                <FormControl>
                                  <div className="md:w-[292px]">
                                    <Input
                                      {...field}
                                      type="number"
                                      className="block w-full  h-[40px] rounded-[40px] raleway-semibold text-xl  "
                                    />
                                  </div>
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className=" text-[16px] underline arvo-regular text-center text-[#FF0000] mt-5 w-[30%]">
                          Remove
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-4 mb-1">
                      <div className="w-3/4">
                        <div className="text-xl lg:text-2xl arvo-bold ">
                          Selected Options
                        </div>
                      </div>
                      <div className="w-1/4 flex items-center justify-center ">
                        <span className="w-[24px] h-[24px] ">
                          {order ? (
                            order.binding_name
                          ) : (
                            <Plus className="text-primary1-blue" />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-4 mb-1">
                      <div className="w-3/4">
                        <h2 className="text-xl lg:text-2xl arvo-bold">
                          Items Total
                        </h2>
                      </div>
                      <div className="w-1/4 flex flex-col items-center justify-center mt-4 ">
                        <span className=" text-primary1-blue raleway-medium text-2xl ">
                          ${subTotal}
                        </span>
                        <span className="text-[12px] text-[#9D8780]">
                          ${unitPrice} / unit
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-4 mb-1">
                      <div className="w-3/4">
                        <div className="w-[70%] space-y-6">
                          <FormField
                            control={form.control}
                            name="payment_method"
                            render={({ field }) => (
                              <FormItem>
                                <FormItem className="flex justify-between items-center">
                                  <FormLabel className="text-xl lg:text-2xl arvo-bold md:w-[350px]">
                                    Payment Method
                                  </FormLabel>
                                </FormItem>
                                <div className="md:w-[292px]">
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl className="   h-[40px] rounded-[40px] raleway-semibold text-xl">
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select One" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="raleway-semibold text-xl">
                                      <SelectItem value="Payment-1">
                                        Payment-1
                                      </SelectItem>
                                      <SelectItem value="Payment-2">
                                        Payment-2
                                      </SelectItem>
                                      <SelectItem value="Payment-3">
                                        Payment-3
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <FormDescription></FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-1/4 flex flex-col items-center justify-center ">
                        <p className="arvo-medium mt-4 text-[16px]"> PayPal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mb-8 w-full ">
                <div className="md:w-[468px] md:h-[396px] w-[350px] h-[380px] bg-secondary1-pink rounded-[24px] ">
                  <div className="p-6">
                    <h1 className="text-[32px] leading-[39px] arvo-bold">
                      {" "}
                      Order Summary
                    </h1>
                    <div className="mt-4">
                      <div className="flex justify-between py-2">
                        <p className="text-[#6B6D6E] raleway-medium text-xl">
                          Subtotal
                        </p>
                        <span className="text-primary1-blue raleway-bold text-xl">
                          ${subTotal}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <p className="text-[#6B6D6E] raleway-medium text-xl">
                          Discount
                        </p>
                        <span className="text-primary1-blue raleway-bold text-xl">
                          ${discountPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <p className="text-[#6B6D6E] raleway-medium text-xl">
                          Shipping
                        </p>
                        <span className="text-primary1-blue raleway-bold text-xl">
                          ${shippingPrice.toFixed(2)}
                        </span>
                      </div>
                      <hr className="bg-white border-1 my-2" />
                      <div className="flex justify-between py-4">
                        <p className="text-[#404040] text-[25px] leading-[30px] arvo-bold">
                          Total
                        </p>
                        <span className="text-[#404040] text-[25px] leading-[30px] arvo-bold">
                          {grandTotal}
                        </span>
                      </div>
                      <div className="flex items-center justify-center mt-4">
                        <Button className="md:w-[356px] md:h-[64px]  arvo-regular rounded-[88px] text-2xl w-[300px] h-[50px]  hover:bg-transparent hover:text-primary1-pink hover:border hover:border-primary1-pink">
                          Check Out
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </Form>
  );
};
export default CheckoutPage;
