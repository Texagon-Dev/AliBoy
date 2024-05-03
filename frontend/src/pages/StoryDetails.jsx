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
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import play from "../assets/Images/play.png";
import upload from "../assets/Images/upload.png";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { setStoryDetails } from "@/redux/features/storySlice";
import { useDispatch, useSelector } from "react-redux";

const StoryDetails = () => {
  const currentStory = useSelector((state) => state.stories.currentStory);
  const [selectedValue, setSelectedValue] = useState("option-one");
  console.log(selectedValue, "selectedValue");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    console.log(acceptedFiles, "Accepted files: ");
    if (fileRejections.length > 0) {
      setError(
        "Invalid file type or file too large. Please upload a PNG or JPEG image within 5MB."
      );
    } else {
      const newFile = acceptedFiles[0];
      if (newFile.type === "image/jpeg" || newFile.type === "image/png") {
        setError("");
        setFile(newFile);
      } else {
        setError("Only PNG or JPEG files are allowed.");
        setFile(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxFiles: 1,
    maxSize: 5242880, // 5MB
  });

  const onSubmit = (data) => {
    dispatch(
      setStoryDetails({
        storyBookId: Date.now().toString(),
        story_explanation: data.story_explanation,
        character_explanations: data.character_explanation,
        story_length: selectedValue,
        image: file ? URL.createObjectURL(file) : undefined,
      })
    );
    navigate("/create/generate");
  };

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file);
      }
    };
  }, [file]);
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      story_explanation: currentStory.storyDetails.story_explanation || "",
      character_explanation:
        currentStory.storyDetails.character_explanations || "",
      radio_group: "Standard",
      file: file ? URL.createObjectURL(file) : undefined,
    },
  });

  const storyExplanation = form.watch("story_explanation");
  const characterExplanation = form.watch("character_explanation");

  const handleStoryChange = (event) => {
    const text = event.target.value;
    if (text.length <= 3000) {
      // Only update if within limit
      form.setValue("story_explanation", text);
    }
  };

  const handleCharacterChange = (event) => {
    const text = event.target.value;
    if (text.length <= 1000) {
      // Only update if within limit
      form.setValue("character_explanation", text);
    }
  };

  // Helper function to determine what message to display
  const getCharacterFeedback = () => {
    const length = storyExplanation.length;
    if (length > 2950 && length <= 3000) {
      return "You are reaching the character limit.";
    } else if (length > 3000) {
      return "Characters cannot be more than 3000.";
    }
    return ""; // No message if under the limit
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Update the Redux store whenever form values change
    const subscription = form.watch((value, { name, type }) => {
      dispatch(setStoryDetails(value));
    });
    return () => subscription.unsubscribe();
  }, [form.watch, dispatch]);

  return (
    <section className="container mx-auto  mb-10 lg:mt-[120px] md:mt-[100px] mt-[80px]">
      <div className="w-full flex justify-center items-center text-4xl text-center flex-col lg:text-[64px] lg:leading-[58px] font-bold mb-10">
        <div className="w-full  mb-8">
          <h1 className="text-primary1-blue text-3xl lg:text-5xl md:text-4xl arvo-bold leading-[59px] ">
            Craft Your Story
          </h1>
          <p className=" text-xl lg:text-[28px] leading-8 text-[#6B6D6E] lg:w-[80%] raleway-medium py-4 mx-auto">
            Enter your story prompt below, providing a brief description or
            theme. (e.g., 'Write a story about a mysterious island' or 'Create a
            romantic tale set in Paris')
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="lg:w-[68%] w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="story_explanation"
              render={({ field }) => (
                <FormItem>
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                      Story Explanation
                    </FormLabel>
                    <div className="flex justify-center ">
                      <Dialog>
                        <DialogTrigger className="arvo-bold  flex justify-center items-center">
                          Watch Video
                          <div className="bg-transparent p-0 lg:mr-[-150px] text-black border-none shadow-none hover:bg-transparent font-bold">
                            <img src={play} alt="play icon" />
                          </div>
                        </DialogTrigger>

                        <DialogContent className=" flex justify-center p-10 ">
                          <iframe
                            src="https://www.youtube.com/watch?v=gmn8tacmiys"
                            origin="https://www.youtube.com"
                            style={{
                              borderRadius: "24px",
                              width: "1040px",
                              height: "576px",
                            }}
                          ></iframe>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Enter prompt here"
                      className="resize-none  rounded-lg "
                      {...field}
                      onChange={handleStoryChange}
                      value={storyExplanation}
                    />
                  </FormControl>
                  <FormDescription>
                    <div className="flex justify-between items-center text-center gap-2 mt-1 ">
                      <div className="flex text-center gap-4">
                        <p className="text-[#9D8780] lg:text-[16px] raleway-medium">
                          Suggestions:
                        </p>
                        <span className="border border-primary1-pink px-2 rounded-lg lg:text-[12px] text-primary1-pink">
                          Lorem ipsum delour ...
                        </span>
                        <span className="hidden lg:flex border border-primary1-pink px-2 rounded-lg lg:text-[12px] text-primary1-pink">
                          Lorem ipsum delour ...
                        </span>
                        <span className=" hidden lg:flex border border-primary1-pink px-2 rounded-lg lg:text-[12px] text-primary1-pink">
                          Lorem ipsum delour ...
                        </span>
                      </div>
                      <div>
                        <p className="text-red-500">{getCharacterFeedback()}</p>
                        <span className="text-[#C7C8CC] lg:text-[16px] raleway-medium">
                          {storyExplanation.length}/3000
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
              name="character_explanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl lg:text-2xl arvo-bold  ">
                    Character Explanation
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter prompt here "
                      className="resize-none min-h-[102px] rounded-lg "
                      {...field}
                      onChange={handleCharacterChange}
                      value={characterExplanation}
                    />
                  </FormControl>
                  <FormDescription>
                    <div className="flex justify-between items-center text-center gap-2 mt-1 ">
                      <div className="flex text-center gap-4">
                        <p className="text-[#9D8780] lg:text-[16px] raleway-medium">
                          Suggestions:
                        </p>
                        <span className="  border border-primary1-pink px-2 rounded-lg lg:text-[12px]   text-primary1-pink">
                          Lorem ipsum delour ...
                        </span>
                        <span className="hidden lg:flex border border-primary1-pink px-2 rounded-lg text-[12px] text-primary1-pink">
                          Lorem ipsum delour ...
                        </span>
                        <span className="hidden lg:flex border border-primary1-pink px-2 rounded-lg text-[12px] text-primary1-pink">
                          Lorem ipsum delour ...
                        </span>
                      </div>
                      <div>
                        <span className="text-[#C7C8CC] lg:text-[16px] raleway-medium">
                          {characterExplanation.length}/1000
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
              name="radio_group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl lg:text-2xl arvo-bold  ">
                    Story Length
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="grid gap-x-10 grid-cols-1 lg:grid-cols-3"
                      defaultValue="Standard"
                      value={selectedValue}
                    >
                      <div
                        className={`flex items-center space-x-2 border   rounded-[32px] h-[58px] w-[278px] px-5 ${
                          selectedValue === "Standard"
                            ? "bg-[#F15084] text-white"
                            : "border-[#FAC0D3] "
                        }`}
                      >
                        <RadioGroupItem
                          value="Standard"
                          id="Standard"
                          onClick={() => {
                            setSelectedValue("Standard");
                          }}
                        />
                        <Label
                          className="text-xl raleway-semibold"
                          htmlFor="Standard"
                        >
                          Standard
                        </Label>
                      </div>
                      <div
                        className={`flex items-center space-x-2 border  rounded-[32px] h-[58px] w-[278px] px-5 ${
                          selectedValue === "Medium"
                            ? "bg-[#F15084] text-white"
                            : "border-[#FAC0D3] "
                        }`}
                      >
                        <RadioGroupItem
                          value="Medium"
                          id="Medium"
                          onClick={() => {
                            setSelectedValue("Medium");
                          }}
                        />
                        <Label
                          className="text-xl raleway-semibold"
                          htmlFor="Medium"
                        >
                          Medium
                        </Label>
                      </div>
                      <div
                        className={`flex items-center space-x-2 border   rounded-[32px] h-[58px] w-[278px] px-5 ${
                          selectedValue === "Long"
                            ? "bg-[#F15084] text-white"
                            : "border-[#FAC0D3] "
                        }`}
                      >
                        <RadioGroupItem
                          value="Long"
                          id="option-three"
                          onClick={() => {
                            setSelectedValue("Long");
                          }}
                        />
                        <Label
                          className="text-xl raleway-semibold"
                          htmlFor="Long"
                        >
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
                  <FormLabel className="text-xl lg:text-2xl arvo-bold ">
                    Upload Photo
                    <span className="text-[#C7C8CC] text-xs raleway-regular">
                      (Optional)
                    </span>
                  </FormLabel>
                  <div
                    {...getRootProps()}
                    className="min-h-[102px] border-[#FAC0D3]  border-solid border-2 rounded-lg flex items-center justify-center cursor-pointer"
                  >
                    <Input {...getInputProps()} />
                    {error ? (
                      <div className="text-red-700 md:w-full w-1/2 text-center raleway-medium text-xs md:text-[18px]  mx-auto">
                        {error}
                      </div>
                    ) : file ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Uploaded"
                        className="max-h-full max-w-full w-[200px] h-[200px] p-4 "
                      />
                    ) : (
                      <div className="flex justify-center items-center gap-2 lg:text-xl raleway-regular">
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
                  <div className="flex justify-between text-[#C7C8CC] lg:text-[16px] raleway-medium">
                    <p>File Supported: PNG,JPG</p>
                    <p>Max Size: 5mb</p>
                  </div>
                  <FormMessage name="file" />
                </FormItem>
              )}
            />
            {/* <NavLink to="/create/generate" className="flex justify-center"> */}
            <div className="flex justify-center">
              <Button className="bg-primary1-pink w-[232px] h-[56px] rounded-full hover:bg-[bg-[#F15084]] text-2xl leading-7 mt-6 arvo-regular">
                Next
              </Button>
            </div>
            {/* </NavLink> */}
          </form>
        </Form>
      </div>
    </section>
  );
};
export default StoryDetails;
