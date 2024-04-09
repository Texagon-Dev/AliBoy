import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import play from "../assets/Images/play.png";
import upload from "../assets/Images/upload.png";
import { NavLink } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const StoryDetails = () => {
  const [selectedValue, setSelectedValue] = useState("option-one");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });
  const form = useForm();
  return (
    <section className="container mx-auto mt-[140px] mb-10">
      <div className="w-full flex justify-center items-center text-4xl text-center flex-col lg:text-[64px] lg:leading-[58px] font-bold mb-10">
        <div className="w-full  mb-8">
          <h1 className="text-primary1-blue text-5xl arvo-bold leading-[59px] ">
            Craft Your Story
          </h1>
          <p className="text-[28px] leading-8 text-[#6B6D6E] font-thin py-4">
            Enter your story prompt below, providing a brief description or
            theme. (e.g., 'Write a story about a mysterious island' or 'Create a
            romantic tale set in Paris')
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit()}
            className="lg:w-[80%] w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="story-explanation"
              render={({ field }) => (
                <FormItem>
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-2xl font-bold ">
                      Story Explanation
                    </FormLabel>
                    <div className="flex justify-center ">
                      <Dialog>
                        <DialogTrigger className="font-bold flex justify-center items-center">
                          Watch Video
                          <div className="bg-transparent p-0 lg:mr-[-150px] text-black border-none shadow-none hover:bg-transparent font-bold">
                            <img src={play} alt="play icon" />
                          </div>
                        </DialogTrigger>

                        <DialogContent className=" flex justify-center p-10">
                          <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/watch?v=gmn8tacmiys"
                            origin="https://www.youtube.com"
                          ></iframe>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Enter prompt here"
                      className="resize-none border-[#FAC0D3] border-solid border-2 rounded-lg "
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    <div className="flex justify-between items-center text-center gap-2 mt-1 ">
                      <div className="flex text-center gap-4">
                        <p className="text-[#9D8780]">Suggestions:</p>
                        <span className="border border-primary1-pink px-2 rounded-lg text-[12px] text-primary1-pink">
                          Lorem ipsum delour ...
                        </span>
                        <span className="border border-primary1-pink px-2 rounded-lg text-[12px] text-primary1-pink">
                          Lorem ipsum delour ...
                        </span>
                        <span className="border border-primary1-pink px-2 rounded-lg text-[12px] text-primary1-pink">
                          Lorem ipsum delour ...
                        </span>
                      </div>
                      <div>
                        <span className="text-[#C7C8CC] text-[16px]">
                          0/3000
                        </span>
                      </div>
                    </div>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="character-explanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl font-bold ">
                    Character Explanation
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none min-h-[100px] border-[#FAC0D3] border-solid border-2 rounded-lg "
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    <div className="flex justify-between items-center text-center gap-2 mt-1 ">
                      <div className="flex text-center gap-4">
                        <p className="text-[#9D8780]">Suggestions:</p>
                        <span className="border border-primary1-pink px-2 rounded-lg lg:text-[12px]   text-primary1-pink">
                          Lorem ipsum delour ...
                        </span>
                        <span className="border border-primary1-pink px-2 rounded-lg text-[12px] text-primary1-pink">
                          Lorem ipsum delour ...
                        </span>
                        <span className="border border-primary1-pink px-2 rounded-lg text-[12px] text-primary1-pink">
                          Lorem ipsum delour ...
                        </span>
                      </div>
                      <div>
                        <span className="text-[#C7C8CC] text-[16px]">
                          0/1000
                        </span>
                      </div>
                    </div>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="radio-group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl font-bold ">
                    Story Length
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="grid gap-x-10 grid-cols-3"
                      value={selectedValue}
                      onClick={handleChange}
                    >
                      <div
                        className={`flex items-center space-x-2 border lg:w-[80%] rounded-3xl px-1 lg:p-4 ${
                          selectedValue === "option-one"
                            ? "bg-[#F15084] text-white"
                            : "border-[#F15084]"
                        }`}
                      >
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label className="text-xl" htmlFor="option-one">
                          Standard
                        </Label>
                      </div>
                      <div
                        className={`flex items-center space-x-2 border lg:w-[80%] rounded-3xl h-14 lg:p-5 ${
                          selectedValue === "option-two"
                            ? "bg-[#F15084] text-white"
                            : "border-[#F15084]"
                        }`}
                      >
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label className="text-xl" htmlFor="option-two">
                          Medium
                        </Label>
                      </div>
                      <div
                        className={`flex items-center space-x-2 border lg:w-[80%] rounded-3xl h-14 p-4 ${
                          selectedValue === "option-three"
                            ? "bg-[#F15084] text-white"
                            : "border-[#F15084]"
                        }`}
                      >
                        <RadioGroupItem
                          value="option-three"
                          id="option-three"
                        />
                        <Label className="text-xl" htmlFor="option-three">
                          Long
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl font-bold">
                    Upload Photo
                    <span className="text-[#C7C8CC] text-[12px] font-normal">
                      (Optional)
                    </span>
                  </FormLabel>
                  <div
                    {...getRootProps()}
                    className="min-h-[100px] border border-[#F15084] rounded-lg flex items-center justify-center"
                  >
                    <Input {...getInputProps()} />
                    {file ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Uploaded"
                        className="max-h-full max-w-full"
                      />
                    ) : (
                      <div className="flex justify-center items-center gap-2">
                        <span>
                          <img src={upload} alt="upload icon" />
                        </span>
                        <p>
                          Drag & drop files here, or{" "}
                          <span className="text-primary1-pink underline">
                            choose files
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <NavLink to="" className="flex justify-center">
              <Button className="bg-[#F15084] w-[232px] h-[56px] rounded-full hover:bg-[bg-[#F15084]] text-2xl leading-7 mt-6 arvo">
                Next
              </Button>
            </NavLink>
          </form>
        </Form>
      </div>
    </section>
  );
};
export default StoryDetails;
