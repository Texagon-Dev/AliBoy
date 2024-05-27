import { Button } from "@/components/ui/button";
import lefticon from "../assets/Images/left-icon.png";
import rectangle from "../assets/Images/rectangle.png";
import storyImage from "../assets/Images/storyImage.png";
import regenerate from "../assets/Images/refresh.png";
import edit from "../assets/Images/edit.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { pdf } from "@react-pdf/renderer";
import PdfStoryBookDocument from "@/components/pdf/PdfStoryBookDocument";
import uploadFileToSupabase from "@/lib/functions";
import {
  regenerateStorySlide,
  updateSlideText,
} from "@/redux/features/storySlice";
import StoryEdit from "@/components/StoryEdit";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

const StoryBookPdfPage = () => {
  const storyData = useSelector((state) => state.stories.items);
  console.log("StoryData", storyData);
  const userId = useSelector((state) => state.user.userId);
  const genre = useSelector((state) => state.stories.currentStory.genre.name);
  const [isEditing, setIsEditing] = useState(false);

  const [editableStoryName, setEditableStoryName] = useState(
    storyData && storyData[0]?.story_name
      ? storyData[0].story_name.replace(/"/g, "")
      : "Default Story Name"
  );

  const metadata1 = useSelector((state) => state.user.metadata);

  const navigate = useNavigate();
  const handleSave = (indexData, editedText) => {
    dispatch(
      updateSlideText({
        storyIndex: indexData.storyIndex,
        chapterIndex: indexData.chapterIndex,
        slideIndex: indexData.slideIndex,
        text: editedText,
      })
    );
  };

  const dispatch = useDispatch();

  const finalStoryName =
    editableStoryName || storyData[0]?.story_name || "Default Story Name";

  useEffect(() => {
    if (!storyData || storyData.length === 0) {
      toast.error("No story data available. Please Try Generating Story Again");
      navigate("/create/begin");
    }
  }, [storyData, navigate]);

  const generatePdfBlob = async () => {
    try {
      const blob = await pdf(
        <PdfStoryBookDocument storyData={storyData} />
      ).toBlob();
      return blob;
    } catch (error) {
      console.error("Error generating PDF blob:", error);
    }
  };

  const handleUploadFiles = async () => {
    if (!userId) {
      console.error("User not logged in");
      toast.error("Please sign in to continue.");
      navigate("/signin");
      return;
    }

    const pdfBlob = await generatePdfBlob();
    if (!pdfBlob) {
      console.error("Failed to generate PDF");
      return;
    }

    // const toBase64 = (url) => {
    //   return fetch(url)
    //     .then((response) => response.blob())
    //     .then((blob) => {
    //       return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onloadend = () => resolve(reader.result);
    //         reader.onerror = reject;
    //         reader.readAsDataURL(blob);
    //       });
    //     });
    // };

    // const imageUrl = storyData.output > 0 ? storyData.output[0].image : null;
    // console.log(imageUrl);
    // let base64Image = null;

    const image = storyImage;

    // if (image) {
    //   base64Image = await toBase64(image);
    // }

    const metadata = storyData[0].output;

    // Upload PDF and image blobs
    await uploadFileToSupabase(
      userId,
      pdfBlob,
      image,
      genre,
      finalStoryName,
      metadata, 
      totalSlides
    );
    toast.success("Story Saved Successfully. Navigating to User Home Page... ");

    navigate("/user");
  };

  const handleRegenerate = (
    originalText,
    storyIndex,
    chapterIndex,
    slideIndex
  ) => {
    dispatch(
      regenerateStorySlide({
        text: originalText,
        storyIndex,
        chapterIndex,
        slideIndex,
      })
    );
  };

  const totalSlides =
    storyData?.reduce((total, story) => {
      return (
        total +
        (story.output?.reduce((chapterTotal, chapter) => {
          return chapterTotal + (chapter.slides?.length || 0);
        }, 0) || 0)
      );
    }, 0) || 0;

  return (
    <section className="container mx-auto mt-[110px] mb-10">
      <div className="w-full flex justify-center items-center text-4xl text-center flex-col lg:text-[64px] lg:leading-[58px] font-bold mb-10 ">
        <div className="w-full  mb-8 lg:w-[1280px]">
          <Button className="bg-transparent text-primary1-blue text-sm lg:text-2xl arvo-bold hover:bg-transparent p-0 flex justify-start gap-2 ">
            <NavLink className="flex" to="/dashboard">
              <img
                className="h-[30px] w-[30px] "
                src={lefticon}
                alt="go to dashboard icon"
              />{" "}
              Go to Dashboard
            </NavLink>
          </Button>
          <div className="flex flex-col lg:flex-row lg:justify-center">
            <div className="lg:w-4/5 flex flex-col justify-center">
              {isEditing ? (
                <div className="flex justify-center">
                  <Input
                    type="text"
                    value={editableStoryName}
                    onChange={(e) => setEditableStoryName(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    className="text-primary1-blue text-xl lg:text-4xl md:text-2xl arvo-bold md:leading-[59px] w-full lg:ml-[100px] text-center flex justify-center items-center"
                  />
                </div>
              ) : (
                <>
                  <div className="text-primary1-blue text-2xl lg:text-4xl md:text-4xl arvo-bold md:leading-[59px] w-full lg:ml-[100px] cursor-pointer flex justify-center items-center  flex-wrap">
                    <h1 className="break-words w-[80%] flex items-center justify-center ">
                      {editableStoryName}
                      <img
                        src={edit}
                        alt=""
                        className="h-5 w-5 ml-2 cursor-pointer"
                        onClick={() => setIsEditing(true)}
                      />
                    </h1>
                  </div>
                </>
              )}
              <h3 className=" text-xl lg:text-[28px] leading-8 arvo-bold py-6  lg:ml-[100px] w-full">
                Created By:{" "}
                <span className="text-primary1-pink raleway-bold">
                  {metadata1.full_name}
                </span>
              </h3>
            </div>
            <div className="flex lg:flex-col justify-center items-center gap-x-2 md:flex-row md:items-center md:justify-center  ">
              <Button
                className="rounded-[40px] bg-primary1-pink lg:w-[209px] px-4 arvo-regular text-[16px] md:w-40 hover:bg-transparent hover:border hover:border-primary1-pink hover:text-primary1-pink"
                onClick={handleUploadFiles}
              >
                Save Book
              </Button>

              <NavLink to="/dashboard/bookprinting">
                <Button
                  variant="outlined"
                  className="rounded-[40px] border border-primary1-pink px-4 lg:w-[209px] md:w-40 text-primary1-pink hover:bg-primary1-pink hover:text-white arvo-regular text-[16px]  "
                >
                  Print a Book
                </Button>
              </NavLink>
            </div>
          </div>
        </div>

        <Carousel>
          <CarouselContent className="w-[1020px]">
            {storyData.map(
              (story, storyIndex) =>
                story.output &&
                story.output.map((chapterData, chapterIndex) => {
                  console.log("Processing chapter:", chapterData);
                  const slides = chapterData.slides;

                  console.log("Generated slides:", slides);

                  return slides.map((slide, slideIndex) => (
                    <CarouselItem
                      key={`${storyIndex}-${chapterIndex}-${slideIndex}`}
                    >
                      <div
                        className="relative"
                        style={{
                          backgroundImage: `url(${rectangle})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          height: "565px",
                          width: "1000px",
                          "@media (maxWidth: 1024px)": {
                            backgroundImage: `url(${rectangle})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "50vh",
                            width: "50vw",
                          },
                        }}
                      >
                        <div>
                          <img
                            src={regenerate}
                            alt="story image"
                            className="absolute top-5 left-[430px] cursor-pointer"
                          />

                          <img
                            src={/*{chapterData.image ||}*/ storyImage}
                            alt={`Chapter ${chapterData.id}`}
                            className="w-[411px] h-[348px] rounded-[16px] absolute top-20 left-14 cursor-pointer text-xs"
                          />

                          <Button className="absolute bottom-12 left-[200px] bg-transparent hover:bg-transparent border border-[#FF0000] text-[#FF0000] rounded-[32px] h-10 px-4 arvo-regular">
                            Remove Page
                          </Button>
                        </div>
                        <div>
                          <div>
                            <img
                              src={regenerate}
                              alt="chapter regenerate"
                              className="absolute top-5 right-16"
                              onClick={() =>
                                handleRegenerate(
                                  slide.originalText,
                                  storyIndex,
                                  chapterIndex,
                                  slideIndex
                                )
                              }
                            />

                            <div className="text-2xl raleway-regular w-1/3 h-[20%] text-start absolute top-[14%] right-[100px]  text-ellipsis">
                              <div>
                                <h3 className="arvo-bold mb-4">
                                  Chapter {chapterData.id} -{" "}
                                  {chapterData["chapter name"]}
                                </h3>

                                <p className="whitespace-pre-wrap">
                                  {slide.regeneratedText ||
                                    slide.originalText ||
                                    slide.editedText}
                                  <StoryEdit
                                    text={
                                      slide.regeneratedText ||
                                      slide.originalText ||
                                      slide.editedText
                                    }
                                    indexData={{
                                      storyIndex,
                                      chapterIndex,
                                      slideIndex,
                                    }}
                                    onSave={handleSave}
                                  />
                                </p>
                              </div>
                            </div>
                            <span className="absolute raleway-medium text-2xl  bottom-5 right-16">
                              {slideIndex + 1} 
                            </span>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ));
                })
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};
export default StoryBookPdfPage;
