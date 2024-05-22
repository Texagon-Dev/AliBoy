import { Button } from "@/components/ui/button";
import lefticon from "../assets/Images/left-icon.png";
import storyImage from "../assets/Images/cardimage.png";
import regenerate from "../assets/Images/refresh1.png";
import edit from "../assets/Images/edit1.png";
import tags from "../assets/Images/tags.png";
import ShareAndDeleteDropDown from "@/components/ShareAndDeleteDropDown";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/shared/Loading/Loading";
import { fetchStories } from "@/redux/features/userStoriesSlice";
import { useEffect, useState } from "react";
import { deleteUserStoryBook } from "@/lib/functions";
import { toast } from "react-toastify";

const EditAndShareStoryPage = () => {
  const [searchParams] = useSearchParams();
  const storyBookId = searchParams.get("storyBookId");
  console.log("myID:", storyBookId);
  const userId = useSelector((state) => state.user.userId);
     const metadata1 = useSelector((state) => state.user.metadata);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const { story_name, metadata, tags: storyTags, created_at } = specificStory || {};

  console.log("filteredStories", specificStory);

  const handleDelete = async () => {
    try {
      await deleteUserStoryBook(storyBookId);
      toast.success("Your story has been deleted.");
      navigate("/user");
    } catch (error) {
      console.error("Error deleting user story book:", error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  const urlToShare = window.location.href;

  

  return (
    <section className="container mx-auto w-full mt-[100px] lg:mt-[140px] mb-10 lg:w-[1280px]">
      <div className="w-full  mb-8 ">
        <div>
          <Button className="bg-transparent text-primary1-blue text-sm lg:text-2xl arvo-bold hover:bg-transparent p-0 flex justify-start gap-2 ">
            <NavLink className="flex" to="/dashboard">
              <img
                className="md:h-[30px] md:w-[30px] h-6 w-6  "
                src={lefticon}
                alt="go to dashboard icon"
              />{" "}
              Go to Dashboard
            </NavLink>
          </Button>
        </div>
        <div className="flex flex-col justify-center  lg:flex-row  gap-8 mt-10 w-full">
          <div className="w-1/2">
            <div className="lg:w-[525px] lg:h-[507px] md:w-[400px] md:h-[400px]  w-[300px] h-[300px]  relative ">
              <img
                src={storyImage}
                alt="story image"
                className="object-cover	object-center  w-full h-full rounded-3xl"
              />
              {/* <img
                src={regenerate}
                alt="story image"
                className="absolute  top-5 right-5 cursor-pointer lg:h-[48px] lg:w-[48px]  md:h-[36px] md:w-[36px] h-[30px] w-[30px] "
              /> */}
            </div>
          </div>
          <div>
            {" "}
            <div className="  flex flex-col justify-center  ">
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center justify-center ">
                  <h1 className="text-primary1-blue text-2xl lg:text-5xl md:text-4xl arvo-bold leading-[59px] w-full    ">
                    {story_name}
                  </h1>
                  {/* <img
                    src={edit}
                    alt="edit story"
                    className="cursor-pointer h-6 w-6 md:h-10 md:w-10"
                  /> */}
                </div>
                <div>
                  <span className="text-center">
                    <ShareAndDeleteDropDown
                      handleDelete={handleDelete}
                      urlToShare={urlToShare}
                    />
                  </span>
                </div>
              </div>
              <h3 className=" text-xl lg:text-[28px] leading-8 raleway-medium md:mt-8 mt-4  w-full">
                By:{" "}
                <span className="text-primary1-pink raleway-medium">
                  {metadata1.full_name}
                </span>
              </h3>
              <p className="lg:text-3xl md:text-2xl text-xl text-[#C7C8CC] raleway-medium mt-4">
                {" "}
                Generated on {formatDate(created_at)}
              </p>
              <div className="raleway-medium lg:text-3xl md:text-2xl text-xl leading-8 text-primary1-blue mt-6 mb-8">
                {metadata && metadata.length > 0 ? (
                  metadata.slice(0, 1).map((chapter) => (
                    <div key={chapter.id}>
                      <h2 className="text-2xl lg:text-3xl font-bold">
                        Chapter {chapter.id} - {chapter["chapter name"]}
                      </h2>

                      {chapter.slides.length > 0 && (
                        <div key={chapter.slides[0].slideId}>
                          {chapter.slides[0].originalText ||
                          chapter.slides[0].regeneratedText ? (
                            (chapter.slides[0].originalText
                              ? chapter.slides[0].originalText
                              : chapter.slides[0].regeneratedText
                            )
                              .split("\n")
                              .slice(0, 5)
                              .map((line, index) => (
                                <p key={index}>{line}....</p>
                              ))
                          ) : (
                            <p>No text available for this slide.</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No story data available.</p>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <img
                  src={tags}
                  alt="edit story"
                  className="cursor-pointer h-6 w-6 md:h-10 md:w-10"
                />
                <p className="raleway-medium lg:text-3xl text-2xl  leading-8 text-primary1-blue">
                  Tags:
                </p>
                {storyTags &&
                  storyTags.split(",").map((tag, index) => (
                    <Button
                      key={index}
                      className="bg-transparent text-primary1-pink border border-primary1-pink hover:bg-primary1-pink hover:text-white w-[92px] h-[40px] px-4 rounded-[32px] arvo-regular text-[16px] ml-1"
                    >
                      {tag.trim()}
                    </Button>
                  ))}
              </div>
                 {metadata && metadata.length > 0 ? (
                <NavLink
                  to={`/dashboard/completestorybook?storyBookId=${storyBookId}`}
                >
                  <Button className="bg-primary1-pink w-[250px] h-[46px]  md:w-[303px] md:h-[56px] rounded-[32px] hover:bg-transparent hover:border hover:text-primary1-pink hover:border-primary1-pink md:text-2xl text-xl leading-7 mt-[60px] arvo-regular px-[88px] ">
                    Read More
                  </Button>
                </NavLink>
              ) : (
                <NavLink to="/user">
                  <Button className="bg-primary1-pink w-[250px] h-[46px]  md:w-[303px] md:h-[56px] rounded-[32px] hover:bg-transparent hover:border hover:text-primary1-pink hover:border-primary1-pink md:text-2xl text-xl leading-7 mt-[60px] arvo-regular px-[88px] ">
                    Go Back to Stories
                  </Button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default EditAndShareStoryPage;
