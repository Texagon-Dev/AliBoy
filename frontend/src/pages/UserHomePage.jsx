import StoryCard from "@/components/StoryCard";
import { Button } from "@/components/ui/button";
import cardImage from "../assets/Images/cardimage.png";
import arrow from "../assets/Images/arrow.png";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchStories } from "@/redux/features/userStoriesSlice";
import Loading, { LoadingComp } from "@/components/shared/Loading/Loading";

const UserHomePage = () => {
  const userId = useSelector((state) => state.user.userId);
  const metadata1 = useSelector((state) => state.user.metadata);

  const dispatch = useDispatch();
  const {
    details: stories,
    loading,
    error,
  } = useSelector((state) => state.userStories);

  const [filteredStories, setFilteredStories] = useState([]); // State for filtered stories

  useEffect(() => {
    if (userId) {
      dispatch(fetchStories(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    // Filtering stories when stories or userId changes
    if (stories && stories.length > 0) {
      const filtered = stories.filter((story) => !story.is_deleted);
      setFilteredStories(filtered);
    }
  }, [stories, userId]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchStories(userId));
    }
  }, [dispatch, userId]);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading stories: {error}</div>;

  return (
    <section className="container mx-auto w-screen mt-[100px] lg:mt-[140px] mb-10  ">
      <div className="flex flex-col justify-center w-full mx-auto">
        <h1 className="w-full mx-auto text-center lg:text-start text-primary1-blue text-3xl lg:text-5xl md:text-4xl arvo-bold leading-[59px] ">
          Hello! {metadata1.full_name}
        </h1>

        <div className="flex flex-col lg:flex-row lg:justify-between mb-8 lg:text-start justify-center ">
          <p className=" text-xl lg:text-[28px] leading-8 text-[#6B6D6E] lg:w-[70%] raleway-medium py-4 md:text-left text-center ">
            Effortlessly navigate, organize, and craft your unique stories with
            our advanced AI-driven platform.
          </p>
          <div className="flex justify-center relative">
            {filteredStories.length === 0 && (
              <img
                src={arrow}
                alt="arrow"
                className="absolute hidden lg:flex -top-[-110px] right-[280px] transform translate-x-1/2"
              />
            )}
            <NavLink to="/create/begin">
              <Button className="rounded-[32px] bg-primary1-pink w-[180px] px-[60px] text-[18px] lg:w-[232px] lg:h-[50px] lg:px-[88px] arvo-regular lg:text-[24px] md:w-40 hover:bg-transparent hover:border hover:border-primary1-pink hover:text-primary1-pink shadow-md">
                Create Story
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-center md:justify-start gap-10">
          {filteredStories.length === 0 && (
            <>
              <div className="flex lg:flex-row flex-col justify-center items-center md:gap-y-[100px] gap-y-10    lg:mt-[150px] mt-[80px] ">
                <div className="border-4 border-primary1-pink  h-[150px] w-[150px] flex justify-center items-center">
                  <LoadingComp />
                </div>
                <div className="lg:space-y-4 w-full p-2 lg:w-1/2 lg:p-4">
                  <p className=" text-xl lg:text-[28px]  leading-8 text-primary1-blue raleway-medium  text-center">
                    Experience the magic of AI-generated storytelling. Simply
                    provide prompts and watch captivating tales come to life
                    before your eyes.
                  </p>
                </div>
              </div>
            </>
          )}
          <div className="w-full flex flex-wrap justify-center md:justify-start gap-10">
            {filteredStories.map((story) => (
              <StoryCard
                key={story.story_book_id}
                storyBookId={story.story_book_id}
                image={/*{story.story_picture ||}*/ cardImage}
                title={story.story_name}
                created_at={story.created_at}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default UserHomePage;
