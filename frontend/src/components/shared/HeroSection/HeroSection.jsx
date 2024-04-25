import React from "react";
import "./Hero.css";
import { Button } from "@/components/ui/button";
import share from "../../../assets/Images/share.png";
import imagination from "../../../assets/Images/Imagination.png";
import receive from "../../../assets/Images/receive.png";
const HeroSection = () => {
  return (
    <>
      <section className=" lg:min-h-[1080px] md:min-h-[700px]  max-h-max  hero relative  bg-[#FBD3C4]  ">
        <div className="container  ">
          <div className="flex lg:justify-start lg:text-start justify-center text-center gap-4 items-center lg:pt-[200px] md:pt-[180px] pt-[100px] pb-[10px]  ">
            <div className="space-y-4 w-full p-2 lg:w-1/2 lg:p-4">
              <h1 className="  lg:leading-[84px] text-white  text-4xl md:text-5xl lg:text-[68px] arvo-bold">
                Unleash Your Imagination with AI Story Creation
              </h1>
              <p className=" text-[20px] md:text-[28px] leading-8 text-primary1-blue raleway-medium ">
                Experience the magic of AI-generated storytelling. Simply
                provide prompts and watch captivating tales come to life before
                your eyes.
              </p>
              <Button className="px-[40px] rounded-[48px] h-[56px] w-[256px] arvo-normal text-2xl  cursor-pointer ">
                Start Creating
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex">
          <img
            className="absolute right-0 top-4  w-3/4 md:bottom-0 md:w-1/2  "
            src="/src/assets/images/hero.png"
          />
        </div>
      </section>
      <section className="container mx-auto lg:py-40 md:py-20 py-10 ">
        <div className="w-full flex justify-center items-center  text-center flex-col   mb-10">
          <div className="w-full lg:w-[70%]">
            <h1 className="text-primary1-blue text-4xl lg:text-[64px] lg:leading-[58px] arvo-bold ">
              60 Seconds To Create Your Own Book
            </h1>
            <p className="text-2xl text-[#6B6D6E] raleway-normal py-4">
              Discover the seamless process of turning your ideas into
              beautifully crafted storybooks with our intuitive AI platform
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:z-20  items-center  relative">
          <div className="flex justify-center items-center text-center flex-col  lg:z-20">
            <img className="mb-10" src={share} alt="" />
            <h1 className="text-xl leading-5 tracking-tighter mb-4 arvo-bold">
              Receive Your Masterpiece
            </h1>
            <p className="lg:px-24 md:px-18 text-center raleway-normal text-[#6B6D6E]">
              Sit back and relax as we craft and deliver the hard copy of your
              personalized storybook right to your doorstep.
            </p>
          </div>
          <div className="flex justify-center items-center text-center flex-col  lg:z-20 ">
            <img className="mb-10" src={imagination} alt="" />
            <h1 className="text-xl mb-4  leading-5 tracking-tighter arvo-bold ">
              See Your Imagination Unfold
            </h1>
            <p className="lg:px-24 md:px-18 text-center raleway-normal text-[#6B6D6E]">
              Watch as your ideas transform into captivating stories, brought to
              life by our AI-powered platform
            </p>
          </div>
          <div className="flex justify-center items-center text-center flex-col  lg:z-20">
            <img className="mb-10" src={receive} alt="" />
            <h1 className="text-[20px] mb-4  leading-5 tracking-tighter arvo-bold">
              Receive Your Masterpiece
            </h1>
            <p className="lg:px-24 md:px-18 text-center raleway-normal text-[#6B6D6E]">
              Sit back and relax as we craft and deliver the hard copy of your
              personalized storybook right to your doorstep.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <hr className="hidden lg:flex w-[68%] px-10 lg:z-0 top-10  absolute transform translate-x-1/2  border-b-2 border-dashed border-[#D5D7DD]" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
