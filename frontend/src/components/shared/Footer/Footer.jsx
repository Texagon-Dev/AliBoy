import { Input } from "@/components/ui/input";
import "./footer.css";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import fbIcon from "../../../assets/Images/Facebook.png"
import twIcon from "../../../assets/Images/Twitter.png"
import viIcon from "../../../assets/Images/Vimeo.png"
import ytIcon from "../../../assets/Images/Youtube.png"

const Footer = () => {
  return (
    <section className="back-img mt-[100px]">
      <div className="container lg:pt-20 lg:pb-10 pt-10 pb-10">
        <div className=" md:p-10 py-10  bg-primary1-pink bg-none md:rounded-[100px] rounded-[100px] md:mt-[100px] mt-[50px]">
          <div className="flex lg:justify-between align-center items-center justify-center md:flex-row flex-col flex-wrap">
            <h1 className="arvo-bold md:text-[32px]  text-[20px] text-center lg:mb-0 mb-5 text-white">
              Subscribe Newsletters
            </h1>

            <form className="md:bg-white md:flex md:items-center md:flex-row  flex flex-col justify-center items-center gap-2  rounded-[100px]  md:h-[72px] md:w-[576px] w-[280px] h-[60px] p-3  ">
              <Input
                type="text"
                className="md:w-[400px] w-[250px] outline-none border-none focus:border-none focus:outline-none focus-visible:ring-white  focus:ring-0"
                placeholder="Enter Email"
              />
              <Button className="md:ml-2 md:w-[204px] md:h-[56px] w-[120px] h-[40px] rounded-[40px] md:text-[16px] text-[14px] md:bg-primary1-pink md:text-white bg-white text-primary1-pink raleway-400 leading-4 ">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="flex justify-between md:flex-row flex-col items-center my-8 flex-wrap ">
          <div>
            <ul className="flex flex-row lg:gap-20 gap-4 arvo-regular text-[14px]">
              <li>
                <NavLink>Create Story</NavLink>
              </li>
              <li>
                <NavLink>Dashboard</NavLink>
              </li>
              <li>
                <NavLink>Pricing</NavLink>
              </li>
              <li>
                <NavLink>Blog</NavLink>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex md:flex-row  gap-10 md:mt-0 mt-4 justify-center ">
              <li>
                <NavLink>
                  <img src={fbIcon} alt="facebook" />
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <img src={twIcon} alt="twitter" />
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <img src={viIcon} alt="vimeo" />
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <img src={ytIcon} alt="youtube" />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-[#0F151B]" />
        <div className="flex md:justify-between md:flex-row justify-center  mt-8 mb-4 flex-wrap arvo-regular text-[16px] text-primary1-blue leading-5 ">
          <div>
            <h3>© 2024 Storybook. All rights reserved.</h3>
          </div>
          <div className="flex gap-4">
            <span>Terms of Service </span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Footer;
