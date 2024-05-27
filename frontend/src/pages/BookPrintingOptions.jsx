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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  setPrintingOrder,
  setTotalSlides,
} from "@/redux/features/bookPrintingSlice";
import calculateOrderPricing from "@/lib/calculateOrderPricing";
import Loading from "@/components/shared/Loading/Loading";
import { fetchStories } from "@/redux/features/userStoriesSlice";


const BookPrintingOptions = () => {
  const [searchParams] = useSearchParams();
  const storyBookId = searchParams.get("storyBookId");
  const orderDetails = useSelector((state) => state.bookPrintingOrders.order);
  const totalSlides = useSelector(
    (state) => state.bookPrintingOrders.totalSlides
  );
  const userId = useSelector((state) => state.user.userId);
  const metadata1 = useSelector((state) => state.user.metadata);

  const form = useForm({
    mode: "onChange", // to enable re-validation on input change
    defaultValues: {
      story_book_id: storyBookId,
      uuid: userId,
      binding_name: orderDetails?.binding_name,
      title_size: orderDetails?.title_size,
      quantity: orderDetails?.quantity || 1,
      country: orderDetails?.country,
      city_region: orderDetails?.city_region,
      delivery_address: orderDetails?.delivery_address,
      postal_code: orderDetails?.postal_code,
      item_total: orderDetails?.item_total || 0,
      discount: orderDetails?.discount || 0,
      shipping_amount: orderDetails?.shipping_amount || 0,
      payment_method: orderDetails?.payment_method,
      order_status: "Pending",
    },
  });



  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
    watch,
  } = form;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderPricing, setOrderPricing] = useState(
    calculateOrderPricing(form.getValues(), totalSlides)
  );
  const watchQuantity = watch("quantity");
  useEffect(() => {
    setOrderPricing(calculateOrderPricing(form.getValues(), totalSlides));
  }, [form, watchQuantity, totalSlides]);

  const { unitPrice, subTotal } = orderPricing;



  const onSubmit = (orderDetails) => {
    dispatch(setPrintingOrder(orderDetails));
    navigate(`/dashboard/checkout?storyBookId=${storyBookId}`);
  };

  const {
    details: stories,
    loading,
    error,
  } = useSelector((state) => state.userStories);

  useEffect(() => {
    if (userId) {
      dispatch(fetchStories(userId));
    }
  }, [dispatch, userId]);

  const [filteredStories, setFilteredStories] = useState([]);
  useEffect(() => {
    if (stories && stories.length > 0) {
      const filtered = stories.filter(
        (story) => story.story_book_id === parseInt(storyBookId, 10)
      );
      setFilteredStories(filtered);
    }
  }, [stories, storyBookId]);

  if (loading) return <Loading />;
  if (error) return <div>Error loading stories: {error}</div>;
  if (filteredStories.length === 0) return <div>Story not found</div>;

  const specificStory = filteredStories[0];
  const { story_name, total_slides } = specificStory || {};

  dispatch(setTotalSlides(total_slides))

  return (
    <section className="container mx-auto w-full mt-[80px] lg:mt-[120px] mb-10 ">
      <div className="w-full mb-8">
        <div>
          <Button className="bg-transparent text-primary1-blue text-sm lg:text-2xl arvo-bold hover:bg-transparent p-0 flex justify-start items-center gap-2">
            <NavLink className="flex" to="/dashboard">
              <img
                className="lg:h-[30px] lg:w-[30px] h-6 w-6"
                src={lefticon}
                alt="go to dashboard icon"
              />
              Go to Dashboard
            </NavLink>
          </Button>
        </div>
        <h1 className="text-primary1-blue text-center lg:mt-2 text-2xl lg:text-5xl md:text-4xl arvo-bold leading-[59px] w-full">
          Book Printing Options
        </h1>
        <div className="flex flex-col justify-center lg:flex-row gap-8 mt-10 w-full">
          <div className="lg:w-[600px] w-full flex lg:flex justify-center items-center lg:items-start lg:justify-start">
            <div className="lg:w-[630px] lg:h-[652px] md:w-[400px] md:h-[400px] w-[300px] h-[300px] relative">
              <img
                src={storyImage}
                alt="story image"
                className="object-cover object-center w-full h-full rounded-3xl"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col justify-center w-full ">
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col w-full">
                  <div className="flex flex-col mb-8 text-center lg:text-start">
                    <h1 className="text-primary1-blue text-2xl lg:text-5xl md:text-4xl arvo-bold lg:leading-[59px] w-full">
                      {story_name}
                    </h1>
                    <h3 className="text-xl lg:text-[28px] leading-8 raleway-medium md:mt-8 mt-2 w-full">
                      By:{" "}
                      <span className="text-primary1-pink raleway-medium">
                        {metadata1.full_name}
                      </span>
                    </h3>
                  </div>
                  <div className="flex w-full flex-col">
                    <Form {...form}>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <FormField
                          control={control}
                          name="binding_name"
                          rules={{ required: "Binding is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xl lg:text-2xl arvo-bold">
                                Select Your Binding
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl className="px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Perfect Bound" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="raleway-semibold text-xl">
                                  <SelectItem value="Perfect Bound">
                                    Perfect Bound
                                  </SelectItem>
                                  <SelectItem value="Spiral Binding">
                                    Spiral Binding
                                  </SelectItem>
                                  <SelectItem value="Case Binding">
                                    Case Binding
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage>
                                {errors.binding_name &&
                                  errors.binding_name.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="title_size"
                          rules={{ required: "Title size is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xl lg:text-2xl arvo-bold">
                                Select Title Size
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl className="w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Standard" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="raleway-semibold text-xl">
                                  <SelectItem value="Standard">
                                    Standard
                                  </SelectItem>
                                  <SelectItem value="Medium">Medium</SelectItem>
                                  <SelectItem value="Small">Small</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage>
                                {errors.title_size && errors.title_size.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="quantity"
                          rules={{
                            required: "Quantity is required",
                            min: { value: 1, message: "Minimum quantity is 1" },
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xl lg:text-2xl arvo-bold">
                                Quantity
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl"
                                  min="1"
                                />
                              </FormControl>
                              <FormDescription className="text-end space-x-2">
                                <span className="text-primary1-blue raleway-medium">
                                  {subTotal}
                                </span>
                                <span>{unitPrice}</span>
                              </FormDescription>
                              <FormMessage>
                                {errors.quantity && errors.quantity.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="country"
                          rules={{ required: "Country is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <div className="mt-[-20px]">
                                <FormLabel className="text-xl lg:text-2xl arvo-bold">
                                  Select Country
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl className="w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl">
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
                                <FormMessage>
                                  {errors.country && errors.country.message}
                                </FormMessage>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="city_region"
                          rules={{ required: "City/Region is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xl lg:text-2xl arvo-bold">
                                Select City/Region
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl className="w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Region" />
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
                              <FormMessage>
                                {errors.city_region &&
                                  errors.city_region.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="delivery_address"
                          rules={{ required: "Delivery address is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xl lg:text-2xl arvo-bold">
                                Delivery Address
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Example"
                                  {...field}
                                  type="text"
                                  className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl"
                                />
                              </FormControl>
                              <FormMessage>
                                {errors.delivery_address &&
                                  errors.delivery_address.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="postal_code"
                          rules={{ required: "Postal code is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xl lg:text-2xl arvo-bold">
                                Postcode/AreaCode
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Example"
                                  {...field}
                                  type="text"
                                  className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl"
                                />
                              </FormControl>
                              <FormMessage>
                                {errors.postal_code &&
                                  errors.postal_code.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                        <div className="text-center">
                          <Button
                            className={`bg-[#F15084] lg:w-[357px] lg:h-[64px] rounded-[32px] lg:px-[88px] w-[300px] h-[50px] px-[60px] text-2xl leading-7 mt-6 arvo-regular ${
                              !isValid ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            type="submit"
                            disabled={!isValid}
                          >
                            Place Order
                          </Button>
                        </div>
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
