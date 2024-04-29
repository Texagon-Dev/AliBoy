import { Button } from "@/components/ui/button";
import lefticon from "../assets/Images/left-icon.png";
import rectangle from "../assets/Images/rectangle.png";
import storyImage from "../assets/Images/storyImage.png";
import regenerate from "../assets/Images/refresh.png";
import edit from "../assets/Images/edit.png";
import { NavLink } from "react-router-dom";

const StoryBookPdfPage = () => {
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
            <div className="flex lg:flex-col justify-center md:flex-row gap-4 ">
              <Button className=" rounded-[40px] bg-primary1-pink  lg:w-[209px] px-4 arvo-regular text-[16px] md:w-40 hover:bg-transparent hover:border hover:border-primary1-pink hover:text-primary1-pink">
                Add a New Page
              </Button>
              <Button
                variant="outlined"
                className="rounded-[40px] border border-primary1-pink px-4 lg:w-[209px] md:w-40 text-primary1-pink hover:bg-primary1-pink hover:text-white arvo-regular text-[16px] "
              >
                Print a Book
              </Button>
            </div>
          </div>
        </div>
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
              src={storyImage}
              alt="story image"
              className="w-[411px] h-[348px] rounded-[16px] absolute top-20 left-14 cursor-pointer"
            />
            <Button className="absolute bottom-12 left-[200px] bg-transparent hover:bg-transparent border border-[#FF0000] text-[#FF0000] rounded-[32px] h-10 px-4 arvo-regular">
              Remove Page
            </Button>
          </div>
          <div>
            <img
              src={regenerate}
              alt="story image"
              className="absolute top-5 right-16"
            />

            <p className="text-2xl raleway-regular w-1/3 h-[20%] text-start  absolute top-[40%] right-[100px]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Explicabo repellendus culpa rem nam tenetur rerum totam, itaque,
              <img
                src={edit}
                alt="edit story"
                className="cursor-pointer h-5 w-5"
              />
            </p>
            <span className="absolute raleway-medium text-2xl  bottom-5 right-16">
              01
            </span>
          </div>
        </div>
        <Button className=" mt-8 rounded-[40px] bg-primary1-pink  lg:w-[209px] px-4 arvo-regular text-[16px] md:w-40 hover:bg-transparent hover:border hover:border-primary1-pink hover:text-primary1-pink">
          Save Book
        </Button>
      </div>
    </section>
  );
};
export default StoryBookPdfPage;
