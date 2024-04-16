import StoryCard from "@/components/StoryCard";
import { Button } from "@/components/ui/button";
import cardImage from "../assets/Images/cardimage.png";

const UserHomePage = () => {
	return (
    <section className="container mx-auto w-full mt-[100px] lg:mt-[140px] mb-10 lg:w-[1280px] ">
      <div className="flex flex-col justify-center w-full mx-auto">
        <h1 className="w-full mx-auto text-center lg:text-start text-primary1-blue text-3xl lg:text-5xl md:text-4xl arvo-bold leading-[59px] ">
          Hello! John
        </h1>
        <div className="flex flex-col lg:flex-row lg:justify-between mb-8 lg:text-start justify-center ">
          <p className=" text-xl lg:text-[28px] leading-8 text-[#6B6D6E] lg:w-[70%] raleway-medium py-4 ">
            Effortlessly navigate, organize, and craft your unique stories with
            our advanced AI-driven platform
          </p>
          <div className="flex justify-center">
            <Button className=" rounded-[32px] bg-primary1-pink w-[180px] px-[60px] text-[18px] lg:w-[232px] lg:h-[50px] lg:px-[88px] arvo-regular lg:text-[24px] md:w-40 hover:bg-transparent hover:border hover:border-primary1-pink hover:text-primary1-pink shadow-md ">
              Create Story
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-center gap-10  ">
          <StoryCard
            image={cardImage}
            title={"Ocean Odyssey"}
            button1={"View Details"}
            button2={"Print Book"}
          />
          <StoryCard
            image={cardImage}
            title={"Ocean Odyssey"}
            button1={"View Details"}
            button2={"Print Book"}
          />
          <StoryCard
            image={cardImage}
            title={"Ocean Odyssey"}
            button1={"View Details"}
            button2={"Print Book"}
          />
          <StoryCard
            image={cardImage}
            title={"Ocean Odyssey"}
            button1={"View Details"}
            button2={"Print Book"}
          />
        </div>
      </div>
    </section>
  );
}
export default UserHomePage