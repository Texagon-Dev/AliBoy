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
          <div className="flex justify-between items-center ">
            <h1 className="arvo-bold text-[32px] text-white">
              Subscribe Newsletters
            </h1>

            <form className="bg-white flex  items-center rounded-[100px] h-[72px] w-[576px] p-4">
              <Input
                type="text"
                className="w-[400px] outline-none border-none focus:ring-0"
                placeholder="Enter Email"
              />
              <Button className="ml-2 w-[204px] h-[56px] rounded-[40px] text-[16px] raleway-400 leading-4">
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
            <ul className="flex flex-row gap-10 ">
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
        <div className="flex justify-between items-center mt-8 mb-4 flex-wrap ">
          <div>
            <h3>© 2024 Storybook. All rights reserved.</h3>
          </div>
          <div>
            <span>Terms of Service </span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Footer;
