import StoryCard from "@/components/StoryCard";
import { Button } from "@/components/ui/button";
import cardImage from "../assets/Images/cardimage.png";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { fetchStories } from "@/redux/features/userStoriesSlice";

const UserHomePage = () => {
  const { session } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    details: stories,
    loading,
    error,
  } = useSelector((state) => state.userStories);

  useEffect(() => {
    if (session && session.user) {
      dispatch(fetchStories(session.user.id));
    }
  }, [dispatch, session]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading stories: {error}</div>;

  return (
    <section className="container mx-auto w-screen mt-[100px] lg:mt-[140px] mb-10 lg:w-[1280px] ">
      <div className="flex flex-col justify-center w-full mx-auto">
        <h1 className="w-full mx-auto text-center lg:text-start text-primary1-blue text-3xl lg:text-5xl md:text-4xl arvo-bold leading-[59px] ">
          Hello! {session.user.user_metadata.full_name}
        </h1>
        <div className="flex flex-col lg:flex-row lg:justify-between mb-8 lg:text-start justify-center ">
          <p className=" text-xl lg:text-[28px] leading-8 text-[#6B6D6E] lg:w-[70%] raleway-medium py-4 ">
            Effortlessly navigate, organize, and craft your unique stories with
            our advanced AI-driven platform
          </p>
          <div className="flex justify-center">
            <NavLink to="/create/begin">
              <Button className=" rounded-[32px] bg-primary1-pink w-[180px] px-[60px] text-[18px] lg:w-[232px] lg:h-[50px] lg:px-[88px] arvo-regular lg:text-[24px] md:w-40 hover:bg-transparent hover:border hover:border-primary1-pink hover:text-primary1-pink shadow-md ">
                Create Story
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-center md:justify-start gap-10">
          {stories.length === 0 && (
            <div className="flex justify-center items-center w-full h-full">
              <h1 className="text-2xl text-primary1-blue ">
                Start Creating Stories
              </h1>
            </div>
          )}
          <div className="w-full flex flex-wrap justify-center md:justify-start gap-10">
            {stories.map((story) => (
              <StoryCard
                key={story.story_book_id}
                storyBookId={story.story_book_id}
                image={story.story_picture || cardImage}
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
