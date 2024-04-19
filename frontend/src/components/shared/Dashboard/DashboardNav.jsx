import { Input } from "../../ui/input";
import logo from "../../../assets/Images/Ellipse.png";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

const DashboardNav = () => {
  return (
    <nav className="fixed w-full bg-transparent top-0 z-20 py-3  backdrop-blur-lg">
      <div className="container lg:w-[1440px] px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center md:gap-10 gap-4">
            <img
              className="md:w-[60px] md:h-[60px] h-[40px] w-[40px] md:mr-2 "
              src={logo}
              alt="Logo"
            />

            <Input
              className="flex h-9 w-full lg:w-[549px] lg:h-[56px] rounded-[40px] border border-[#FAC0D3] bg-transparent px-[20px] py-[14px] text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium  placeholder:text-primary1-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAC0D3] focus-visible:border-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-full "
              placeholder="Search..."
              type="search"
              icon={
                <Search className="lg:w-7 lg:h-7 h-4 w-4 text-primary1-blue" />
              }
            />
          </div>
          <div className=" border-l-2 py-1 ml-4 ">
            <div className="ml-4 flex gap-4 items-center justify-center">
              <h4 className="raleway-medium md:text-[16px] text-[12px]">
                Hello, <span className="font-bold">Samantha</span>
              </h4>
              <Avatar className="lg:h-[56px] lg:w-[56px] md:h-[48px] md:w-[48px] h-[36px] w-[36px] ">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default DashboardNav;
