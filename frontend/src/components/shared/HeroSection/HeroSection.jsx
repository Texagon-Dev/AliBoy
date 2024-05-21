import React from "react";
import "./Hero.css";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <>
      <section className=" lg:min-h-[1080px] md:min-h-[700px]  max-h-max  hero relative  bg-[#FBD3C4]  ">
        <div className="container  ">
          <div className="flex lg:justify-start lg:text-start justify-center text-center gap-4 items-center lg:pt-[200px] md:pt-[180px] pt-[100px] pb-[10px] lg:pl-[44px]  ">
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
            className="absolute right-0 top-16  w-3/4 md:bottom-0 md:w-1/2  "
            src="/src/assets/images/hero.png"
          />
        </div>
      </section>
    
    </>
  );
};

export default HeroSection;
