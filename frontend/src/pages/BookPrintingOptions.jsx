import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
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
import InputNumberIcon from "@/components/InputNumberIcon";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addBookPrintingOrder } from "@/redux/features/bookPrintingSlice";
import { useDispatch } from "react-redux";

const BookPrintingOptions = () => {
  const [value, setValue] = useState(5);

  const handleChange = (e) => {
    setValue(parseInt(e.target.value) || 0);
    const newValue = parseInt(e.target.value) || 0;
    setValue(newValue >= 0 ? newValue : 0);
  };

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  //  const dispatch = useDispatch();
  //  const [orderDetails, setOrderDetails] = useState({
  //    story_book_id: "",
  //    user_id: "",
  //    binding_name: "",
  //    title_size: "",
  //    quantity: "",
  //    country: "",
  //    city_region: "",
  //    delivery_address: "",
  //    postal_code: "",
  //    item_total: "",
  //    discount: "",
  //    shipping_amount: "",
  //    payment_method: "",
  //  });

  //  const handleInputChange = (event) => {
  //    setOrderDetails({
  //      ...orderDetails,
  //      [event.target.name]: event.target.value,
  //    });
  //  };

  //  const handleSubmit = (event) => {
  //    event.preventDefault();
  //    dispatch(addBookPrintingOrder(orderDetails));
  //  };

  const form = useForm();

  return (
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
        <h1 className="text-primary1-blue text-center lg:mt-2 text-2xl lg:text-5xl md:text-4xl  arvo-bold leading-[59px] w-full   ">
          Book Printing Options
        </h1>
        <div className="flex flex-col justify-center  lg:flex-row  gap-8 mt-10 w-full">
          <div className="lg:w-1/2 w-full flex lg:flex justify-center items-center lg:items-start lg:justify-start ">
            <div className="lg:w-[580px] lg:h-[652px] md:w-[400px] md:h-[400px]  w-[300px] h-[300px]  relative ">
              <img
                src={storyImage}
                alt="story image"
                className="object-cover	object-center  w-full h-full rounded-3xl"
              />
            </div>
          </div>
          <div>
            {" "}
            <div className="  flex flex-col justify-center w-full ">
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col w-full  ">
                  <div className="flex flex-col mb-8 text-center lg:text-start">
                    <h1 className="text-primary1-blue  text-2xl lg:text-5xl md:text-4xl arvo-bold leading-[59px] w-full    ">
                      The Journey Of Dreams
                    </h1>
                    <h3 className=" text-xl lg:text-[28px] leading-8 raleway-medium md:mt-8 mt-2  w-full">
                      By:{" "}
                      <span className="text-primary1-pink raleway-medium">
                        John Doe
                      </span>
                    </h3>
                  </div>

                  <div className="flex w-full flex-col">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit()}
                        className=" space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="select-binding"
                          render={({ field }) => (
                            <FormItem>
                              <FormItem className="flex justify-between items-center">
                                <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                                  Select Your Binding
                                </FormLabel>
                              </FormItem>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl className="  px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Perfect Bound" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="raleway-semibold text-xl">
                                  <SelectItem value="Spanish">
                                    Random
                                  </SelectItem>
                                  <SelectItem value="German">Random</SelectItem>
                                  <SelectItem value="Arabic">Random</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="select-title-size"
                          render={({ field }) => (
                            <FormItem>
                              <FormItem className="flex justify-between items-center">
                                <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                                  Select Title Size
                                </FormLabel>
                              </FormItem>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl className=" w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Standard" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="raleway-semibold text-xl">
                                  <SelectItem value="Spanish">
                                    Random
                                  </SelectItem>
                                  <SelectItem value="German">Random</SelectItem>
                                  <SelectItem value="Arabic">Random</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

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
                                <Input
                                  placeholder="05"
                                  {...field}
                                  type="number"
                                  className="block w-full px-4 py-3  h-[50px] rounded-[40px] raleway-semibold text-xl  "
                                  value={value}
                                  onChange={handleChange}
                                  icon={
                                    <InputNumberIcon
                                      onIncrement={handleIncrement}
                                      onDecrement={handleDecrement}
                                      py="py-[10px]"
                                    />
                                  }
                                />
                              </FormControl>
                              <FormDescription className="text-end space-x-2">
                                <span className=" text-primary1-blue raleway-medium">
                                  $11.36
                                </span>
                                <span>$0.4 / unit</span>
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="select-country"
                          render={({ field }) => (
                            <FormItem>
                              <FormItem className="flex justify-between items-center">
                                <FormLabel className="text-xl mt-[-20px] lg:text-2xl arvo-bold ">
                                  Select Country
                                </FormLabel>
                              </FormItem>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl className=" w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl ">
                                  <SelectTrigger>
                                    <SelectValue placeholder="United Kingdom" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="raleway-semibold text-xl">
                                  <SelectItem value="United States">
                                    United States
                                  </SelectItem>
                                  <SelectItem value="Germany">
                                    Germany
                                  </SelectItem>
                                  <SelectItem value="Iceland">
                                    Iceland
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="select-city"
                          render={({ field }) => (
                            <FormItem>
                              <FormItem className="flex justify-between items-center">
                                <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                                  Select City/Region
                                </FormLabel>
                              </FormItem>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl className=" w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl ">
                                  <SelectTrigger>
                                    <SelectValue placeholder="United Kingdom" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="raleway-semibold text-xl">
                                  <SelectItem value="United States">
                                    United States
                                  </SelectItem>
                                  <SelectItem value="Germany">
                                    Germany
                                  </SelectItem>
                                  <SelectItem value="Iceland">
                                    Iceland
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormItem className="flex justify-between items-center">
                                <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                                  Delivery Address
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
                        <NavLink
                          to="/dashboard/order"
                          className="flex justify-center"
                        >
                          <Button className="bg-[#F15084] lg:w-[357px] lg:h-[64px] rounded-[32px] lg:px-[88px] w-[300px] h-[50px] px-[60px] hover:bg-transparent hover:text-primary1-pink hover:border hover:border-primary1-pink text-2xl leading-7 mt-6 arvo-regular">
                            Place Order
                          </Button>
                        </NavLink>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BookPrintingOptions;
