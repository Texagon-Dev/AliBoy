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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StoryGenerationLoading from "./StoryGenerationLoading";
import { useDispatch, useSelector } from "react-redux";
import {
  addStoryToHistory,
  resetCurrentStory,
  sendStoryData,
  setGenerationOptions,
} from "@/redux/features/storySlice";

const StoryGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
   const currentStory = useSelector((state) => state.stories.currentStory);

  const dispatch = useDispatch();
  const handleGenerate = () => {
    const formData = {
      total_chapters: form.getValues("chapters"),
      imageStyle: form.getValues("select-image-style"),
      language: form.getValues("select-story-language"),
    };

    dispatch(setGenerationOptions(formData)); // Sets local state
    dispatch(sendStoryData(currentStory)); // Sends data to API
    console.log(formData);
    dispatch(addStoryToHistory(currentStory));
   
    setIsLoading(true);
    setTimeout(() => {
      navigate("/dashboard/storypage");
    }, 5000);
  };

  const form = useForm({
    defaultValues: {
      chapters: 1,
    },
  });

  return (
    <>
      {isLoading ? (
        <StoryGenerationLoading />
      ) : (
        <section className="container mx-auto lg:mt-[120px] md:mt-[100px] mt-[80px] mb-10">
          <div className="w-full flex justify-center items-center text-4xl text-center flex-col lg:text-[64px] lg:leading-[58px] font-bold mb-10">
            <div className="w-full  mb-8">
              <h1 className="text-primary1-blue text-3xl lg:text-5xl md:text-4xl arvo-bold leading-[59px] ">
                Craft Your Story
              </h1>
              <p className=" text-xl lg:text-[28px] leading-8 text-[#6B6D6E] lg:w-[80%] raleway-medium py-4 mx-auto">
                Enter your story prompt below, providing a brief description or
                theme. (e.g., 'Write a story about a mysterious island' or
                'Create a romantic tale set in Paris')
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit()}
                className="lg:w-[68%] w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="chapters"
                  render={({ field }) => (
                    <FormItem>
                      <FormItem className="flex justify-between items-center">
                        <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                          Chapters
                        </FormLabel>
                      </FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="block w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl  "
                          min="1"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="select-image-style"
                  render={({ field }) => (
                    <FormItem>
                      <FormItem className="flex justify-between items-center">
                        <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                          Select Image Style
                        </FormLabel>
                      </FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className=" w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl">
                          <SelectTrigger>
                            <SelectValue placeholder="Auto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="raleway-semibold text-xl">
                          <SelectItem value="Surrealist">Surrealist</SelectItem>
                          <SelectItem value="Abstract">Abstract</SelectItem>
                          <SelectItem value="Baroque">Baroque</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="select-story-language"
                  render={({ field }) => (
                    <FormItem>
                      <FormItem className="flex justify-between items-center">
                        <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                          Select Story Language
                        </FormLabel>
                      </FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className=" w-full px-4 py-3 h-[50px] rounded-[40px] raleway-semibold text-xl ">
                          <SelectTrigger>
                            <SelectValue placeholder="English" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="raleway-semibold text-xl">
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                          <SelectItem value="Arabic">Arabic</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                  <Button
                    onClick={handleGenerate}
                    className="bg-[#F15084] w-[232px] h-[56px] rounded-full hover:bg-[bg-[#F15084]] text-2xl leading-7 mt-6 arvo-regular"
                  >
                    Generate
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      )}
    </>
  );
};
export default StoryGeneration;
