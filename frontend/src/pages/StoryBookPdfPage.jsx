import { Button } from "@/components/ui/button";
import lefticon from "../assets/Images/left-icon.png";
import rectangle from "../assets/Images/rectangle.png";
import storyImage from "../assets/Images/storyImage.png";
import regenerate from "../assets/Images/refresh.png";
import edit from "../assets/Images/edit.png";
import { NavLink } from "react-router-dom";
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
  setSlideText,
} from "@/redux/features/storySlice";
import StoryEdit from "@/components/StoryEdit";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

const SlideEditDialog = ({ open, onClose, slide, onSave }) => {
  const [editedText, setEditedText] = useState("");

  React.useEffect(() => {
    if (slide) {
      setEditedText(slide.regeneratedText || slide.originalText);
    }
  }, [slide]);

  const handleSave = () => {
    onSave(editedText);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Slide</DialogTitle>
      <DialogContent>
        <textarea
          className="w-full h-24 rounded-md border-gray-300 focus:ring-primary1-blue focus:border-primary1-blue sm:text-sm"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      </DialogContent>

      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSave} color="primary">
        Save
      </Button>
    </Dialog>
  );
};

const StoryBookPdfPage = () => {
  const storyData = useSelector((state) => state.stories.items);
  const userId = useSelector((state) => state.user.userId);
  const genre = useSelector((state) => state.stories.currentStory.genre.name);
  const [editSlideIndex, setEditSlideIndex] = useState(null);

  const dispatch = useDispatch();
  const storyName = "SciFi";

  if (!storyData || storyData.length === 0) {
    return <div>Loading or no data available...</div>;
  }

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
      return;
    }

    const pdfBlob = await generatePdfBlob();
    if (!pdfBlob) {
      console.error("Failed to generate PDF");
      return;
    }

    const imageUrl =
      storyData.length > 0 && storyData[0].output.length > 0
        ? storyData[0].output[0].image
        : null;

    // Upload PDF and image blobs
    await uploadFileToSupabase(userId, pdfBlob, imageUrl, genre, storyName);
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

  const handleEditSlide = (slideIndex) => {
    setEditSlideIndex(slideIndex);
  };

  const handleSaveEditedSlide = (
    editedText,
    storyIndex,
    chapterIndex,
    slideIndex
  ) => {
    dispatch(
      setSlideText({ editedText, storyIndex, chapterIndex, slideIndex })
    );
  };

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
              <h1 className="text-primary1-blue text-3xl lg:text-5xl md:text-4xl arvo-bold leading-[59px] w-full lg:ml-[100px]   ">
                Ocean Odyssey
              </h1>
              <h3 className=" text-xl lg:text-[28px] leading-8 arvo-bold py-6  lg:ml-[100px] w-full">
                Created By:{" "}
                <span className="text-primary1-pink raleway-bold">
                  John Doe
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
                            src={chapterData.image}
                            alt={`Chapter ${chapterData.id}`}
                            className="w-[411px] h-[348px] rounded-[16px] absolute top-20 left-14 cursor-pointer"
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

                            <div className="text-2xl raleway-regular w-1/3 h-[20%] text-start absolute top-[20%] right-[100px]">
                              <div>
                                <h3 className="arvo-bold mb-4">
                                  Chapter {chapterData.id} - Part{" "}
                                  {slideIndex + 1}
                                </h3>

                                <p>
                                  {slide.regeneratedText || slide.originalText}
                                  {/* <StoryEdit /> */}
                                  <Button
                                    onClick={() => handleEditSlide(slideIndex)}
                                  >
                                    Edit
                                  </Button>
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

        {/* <Button className=" mt-8 rounded-[40px] bg-primary1-pink  lg:w-[209px] px-4 arvo-regular text-[16px] md:w-40 hover:bg-transparent hover:border hover:border-primary1-pink hover:text-primary1-pink">
          Save Book
        </Button> */}
      </div>

      <SlideEditDialog
        open={editSlideIndex !== null}
        onClose={() => setEditSlideIndex(null)}
        slide={editSlideIndex !== null ? slides[editSlideIndex] : null}
        onSave={(editedText) =>
          handleSaveEditedSlide(
            editedText,
            storyIndex,
            chapterIndex,
            editSlideIndex
          )
        }
      />
    </section>
  );
};
export default StoryBookPdfPage;
