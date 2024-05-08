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
      <div className="container pt-20 pb-10">
        <div className=" p-10 bg-primary1-pink rounded-[100px] mt-[100px]">
          <div className="flex justify-between items-center text-center flex-wrap">
            <h1 className="arvo-bold md:text-[32px] text-[24px]  text-white">
              Subscribe Newsletters
            </h1>

            <form className="bg-white flex items-center  rounded-[100px] md:h-[72px] md:w-[576px] w-full  p-3  ">
              <Input
                type="text"
                className="md:w-[400px] w-full outline-none border-none focus:ring-0"
                placeholder="Enter Email"
              />
              <Button className="ml-2 md:w-[204px] md:h-[56px] w-[120px] h-[40px] rounded-[40px] md:text-[16px] text-[14px] raleway-400 leading-4 ">
                Subscribe Now
              </Button>
            </form>
          </div>
        </div>
        <div className="flex justify-between items-center my-8 flex-wrap ">
          <div>
            <ul className="flex flex-row lg:gap-20 gap-8 arvo-regular">
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
            <ul className="flex flex-row gap-10 md:mt-0 mt-4 ">
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
        <hr />
        <div className="flex justify-between items-center mt-8 mb-4 flex-wrap arvo-regular text-[16px] text-primary1-blue leading-5 ">
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
