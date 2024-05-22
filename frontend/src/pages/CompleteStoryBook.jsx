import { Button } from "@/components/ui/button";
import lefticon from "../assets/Images/left-icon.png";
import rectangle from "../assets/Images/rectangle.png";
import storyImage from "../assets/Images/storyImage.png";
import edit from "../assets/Images/edit.png";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "@/components/shared/Loading/Loading";
import { useEffect, useState } from "react";
import { fetchStories } from "@/redux/features/userStoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


// styles.js

const styles = {
  container: "container mx-auto mt-[110px] mb-10",
  titleSection:
    "w-full flex justify-center items-center text-4xl text-center flex-col lg:text-[64px] lg:leading-[58px] font-bold mb-10",
  titleWrapper: "w-full mb-8 lg:w-[1280px]",
  button:
    "bg-transparent text-primary1-blue text-sm lg:text-2xl arvo-bold hover:bg-transparent p-0 flex justify-start gap-2",
  navLink: "flex",
  icon: "h-[30px] w-[30px]",
  contentWrapper: "flex flex-col lg:flex-row lg:justify-center",
  textSection: "lg:w-4/5 flex flex-col justify-center",
  heading1:
    "text-primary1-blue text-2xl lg:text-5xl md:text-4xl arvo-bold md:leading-[59px] w-[80%] lg:ml-[185px] flex   flex-wrap",
  heading3:
    "text-xl lg:text-[28px] leading-8 arvo-bold py-6 lg:ml-[100px] w-full",
  creatorName: "text-primary1-pink raleway-bold",
  buttonWrapper: "flex lg:flex-col justify-center md:flex-row gap-4",
  addButton:
    "rounded-[40px] bg-primary1-pink lg:w-[209px] px-4 arvo-regular text-[16px] md:w-40 hover:bg-transparent hover:border hover:border-primary1-pink hover:text-primary1-pink",
  printButton:
    "rounded-[40px] border border-primary1-pink px-4 lg:w-[209px] md:w-40 text-primary1-pink hover:bg-primary1-pink hover:text-white arvo-regular text-[16px]",
  relativeWrapper: "relative",
  storyImage:
    "w-[411px] h-[348px] rounded-[16px] absolute top-24 left-14 cursor-pointer",
  storyText:
    "text-2xl raleway-regular w-1/3 h-[20%] text-start absolute top-[35%] right-[100px]",
  pageNumber: "absolute raleway-medium text-2xl bottom-5 right-16",
};



const CompleteStoryBook = () => {
    const [searchParams] = useSearchParams();
    const storyBookId = searchParams.get("storyBookId");
    console.log("myID:", storyBookId);
   const userId = useSelector((state) => state.user.userId);
   const metadata1 = useSelector((state) => state.user.metadata);
    const dispatch = useDispatch();
    const {
      details: stories,
      loading,
      error,
    } = useSelector((state) => state.userStories);

    console.log(stories);

    const [filteredStories, setFilteredStories] = useState([]);
   useEffect(() => {
     if (userId) {
       dispatch(fetchStories(userId));
     }
   }, [dispatch, userId]);

    useEffect(() => {
      if (stories && stories.length > 0) {
        const filtered = stories.filter(
          (story) => story.story_book_id === parseInt(storyBookId, 10)
        );
        console.log("filtered", filtered);
        setFilteredStories(filtered);
      }
    }, [stories, storyBookId]);

    if (loading) return <Loading />;
    if (error) return <div>Error loading stories: {error}</div>;

    if (filteredStories.length === 0) {
      return <div>Story not found</div>;
    }

    const specificStory = filteredStories[0];
    const { story_name, metadata} = specificStory || {};
  return (
    <section className={styles.container}>
      <div className={styles.titleSection}>
        <div className={styles.titleWrapper}>
          <Button className={styles.button}>
            <NavLink className={styles.navLink} to="/dashboard">
              <img
                className={styles.icon}
                src={lefticon}
                alt="go to dashboard icon"
              />{" "}
              Go to Dashboard
            </NavLink>
          </Button>
          <div className={styles.contentWrapper}>
            <div className={styles.textSection}>
              <h1 className={styles.heading1}>{story_name}</h1>
              <h3 className={styles.heading3}>
                Created By:{" "}
                <span className={styles.creatorName}>
                  {metadata1.full_name}
                </span>
              </h3>
            </div>
            <div className={styles.buttonWrapper}>
              <Button className={styles.addButton}>Add a New Page</Button>
              <Button variant="outlined" className={styles.printButton}>
                Print a Book
              </Button>
            </div>
          </div>
        </div>

        
          <div
            className={styles.relativeWrapper}
            style={{
              backgroundImage: `url(${rectangle})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "565px",
              width: "1000px",
            }}
          >
            <Carousel>
              <CarouselContent className="w-[1020px]">
                {metadata.map((chapterData, chapterIndex) => {
                  const slides = chapterData.slides;

                  return slides.map((slide, slideIndex) => (
                    <CarouselItem key={`${chapterIndex}-${slideIndex}`}>
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
                            src=/*{chapterData.image ||}*/ {storyImage}
                            alt={`Chapter ${chapterData.id}`}
                            className="w-[411px] h-[348px] rounded-[16px] absolute top-28 left-14 cursor-pointer text-xs"
                          />
                        </div>
                        <div>
                          <div className="text-2xl raleway-regular w-1/3 h-[20%] text-start absolute top-[18%] right-[100px]">
                            <div>
                              <h3 className="arvo-bold mb-4">
                                Chapter {chapterData.id} -{" "}
                                {chapterData["chapter name"]}
                              </h3>
                              <p>
                                {slide.regeneratedText ||
                                  slide.originalText ||
                                  slide.editedText}
                              </p>
                            </div>
                          </div>
                          <span className="absolute raleway-medium text-2xl bottom-5 right-16">
                            {slideIndex + 1}
                          </span>
                        </div>
                      </div>
                    </CarouselItem>
                  ));
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
  
      </div>
    </section>
  );
};
export default CompleteStoryBook;
