import { Button } from "@/components/ui/button";
import lefticon from "../assets/Images/left-icon.png";

const GeneratedStoryPage = () => {
  return (
    <section className="container mx-auto mt-[80px] mb-10">
      <div className="w-full flex justify-center items-center text-4xl text-center flex-col lg:text-[64px] lg:leading-[58px] font-bold mb-10">
        <div className="w-full  mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-start">
            <Button className="bg-transparent text-primary1-blue text-sm lg:text-2xl arvo-bold hover:bg-transparent p-0">
              <img
                className="h-[20px] w-[20px] lg:h-full lg:w-full"
                src={lefticon}
                alt="go to dashboard icon"
              />{" "}
              Go to Dashboard
            </Button>
            <h1 className="text-primary1-blue text-3xl lg:text-5xl md:text-4xl arvo-bold leading-[59px] w-full lg:w-[58%]  ">
              Ocean Odyssey
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-end">
            <h3 className=" text-xl lg:text-[28px] leading-8 arvo-bold py-6 lg:w-[77%] lg:ml-10 w-full">
              Created By:{" "}
              <span className="text-primary1-pink raleway-bold">John Doe</span>
            </h3>
            <div className="flex lg:flex-col justify-center md:flex-row gap-4 ">
              <Button className=" rounded-[40px] bg-primary1-pink lg:w-[209px] px-4 arvo-regular text-[16px] md:w-40 hover:bg-transparent hover:border hover:border-primary1-pink hover:text-primary1-pink">
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
      </div>
    </section>
  );
};
export default GeneratedStoryPage;
