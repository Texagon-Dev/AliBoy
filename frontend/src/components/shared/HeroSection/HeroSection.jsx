import React from "react";
import "./Hero.css";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <section className=" 2xl:min-h-[1080px] xl:min-h-[900px] lg:min-h-[860px] md:min-h-[600px] min-h-[500px]   hero relative  bg-[#FBD3C4]  ">
        <div className="container  ">
          <div className="flex lg:justify-start lg:text-start justify-center text-center gap-4 items-center xl:pt-[200px] lg:pt-[150px]   md:pt-[180px] pt-[100px] pb-[10px]   ">
            <div className="space-y-4 w-full p-2 lg:w-1/2 lg:p-4">
              <h1 className="  2xl:leading-[84px] xl:text-[48px] text-white  text-4xl md:text-5xl 2xl:text-[68px] lg:text-[44px] arvo-bold">
                Unleash Your Imagination with AI Story Creation
              </h1>
              <p className=" xl:text-[28px] text-[20px] lg:text-[24px] md:text-[28px] leading-8 text-primary1-blue raleway-medium ">
                Experience the magic of AI-generated storytelling. Simply
                provide prompts and watch captivating tales come to life before
                your eyes.
              </p>
                <Button className="px-[40px] rounded-[48px] h-[56px] w-[256px] arvo-normal text-2xl  cursor-pointer hover:bg-transparent hover:border hover:border-primary1-pink hover:text-primary1-pink shadow-md ">
              <NavLink to="/create/begin">
                  Start Creating
              </NavLink>
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
