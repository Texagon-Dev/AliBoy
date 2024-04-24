import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { useState } from "react";
import priceicon from "../assets/Images/pricing.png";
import checkcircle from "../assets/Images/checkcircle.png";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <section className="container mx-auto mt-[120px] mb-10">
      <div className="w-full flex justify-center items-center text-4xl text-center flex-col lg:text-[64px] lg:leading-[58px] font-bold mb-10">
        <div className="w-full  mb-8">
          <h1 className="text-primary1-blue text-3xl lg:text-5xl md:text-4xl arvo-bold leading-[59px] ">
            Affordable Pricing Plans
          </h1>
          <p className=" text-xl lg:text-[28px] leading-8 text-[#6B6D6E] lg:w-[80%] raleway-medium py-4 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id arcu,
            convallis est sed. Proin nulla eu a vitae lectus leo suscipit.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center w-[80%] mx-auto">
        <Tabs
          defaultValue="basic"
          className="w-[80%] flex flex-col justify-center items-center  "
        >
          <TabsList>
            <TabsTrigger
              value="free"
              className="w-full rounded-l-[32px] flex items-center justify-center gap-1"
              onClick={() => setActiveTab("free")}
            >
              {activeTab === "free" && (
                <Check className="h-[16px] w-[16px] text-white" />
              )}
              Free
            </TabsTrigger>
            <TabsTrigger
              value="basic"
              className="w-full flex items-center justify-center gap-1"
              onClick={() => setActiveTab("basic")}
            >
              {activeTab === "basic" && <Check className="h-[16px] w-[16px]" />}
              Basic
            </TabsTrigger>
            <TabsTrigger
              value="pro"
              className="w-full rounded-r-[32px] flex items-center justify-center gap-1"
              onClick={() => setActiveTab("pro")}
            >
              {activeTab === "pro" && <Check className="h-[16px] w-[16px]" />}
              Pro
            </TabsTrigger>
          </TabsList>
          <div className="mt-10">
            <TabsContent value="free">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
            </TabsContent>
            <TabsContent value="basic">
              <div className="w-full ">
                <div className="lg:w-[800px] lg:h-[448px] md:w-[97%] md:mx-auto flex md:flex-row flex-col w-[80%] mx-auto md:justify-center md:items-center  border border-[#EFF0F6] rounded-[24px]">
                  <div className="md:w-1/2 w-full h-full md:p-14 p-10">
                    <div className="flex gap-4">
                      <img src={priceicon} alt="price-icon" />
                      <div className="">
                        <span className="text-[20px] raleway-medium leading-5 text-[#6B6D6E]">
                          For Individuals
                        </span>
                        <h1 className="arvo-bold text-2xl text-[#170F49]">
                          Basic
                        </h1>
                      </div>
                    </div>
                    <p className="mt-5 text-[20px] raleway-medium leading-[30px] text-primary1-blue">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="flex  gap-4 mt-8">
                      <h1 className="arvo-bold text-[56px] leading-[35px] text-[#170F49]">
                        $99
                      </h1>
                      <p className="text-[20px] raleway-medium leading-5 text-[#6B6D6E] flex items-end">
                        /monthly
                      </p>
                    </div>
                    <NavLink className="flex items-center justify-center mt-16">
                      <Button className="md:w-[308px] md:h-[56px]  arvo-regular rounded-[24px] text-xl w-[300px] h-[50px]  hover:bg-transparent hover:text-primary1-pink hover:border hover:border-primary1-pink">
                        Get Started
                      </Button>
                    </NavLink>
                  </div>
                  <div className="md:w-1/2 w-full h-full rounded-l-none rounded-[24px] p-14 bg-[#FAC0D3] ">
                    <div className="mt-16">
                      <h1 className="arvo-bold text-2xl text-primary1-blue">
                        What's Included
                      </h1>
                      <div className=" mt-5">
                        <div className="flex gap-2 mt-2">
                          <img
                            src={checkcircle}
                            alt="check circle icon"
                            className="h-[26px] w-[26px]"
                          />
                          <p className="text-[20px] raleway-medium leading-[30px] text-primary1-blue">
                            Lorem, ipsum dolor.
                          </p>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <img
                            src={checkcircle}
                            alt="check circle icon"
                            className="h-[26px] w-[26px]"
                          />
                          <p className="text-[20px] raleway-medium leading-[30px] text-primary1-blue">
                            Lorem, ipsum dolor.
                          </p>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <img
                            src={checkcircle}
                            alt="check circle icon"
                            className="h-[26px] w-[26px]"
                          />
                          <p className="text-[20px] raleway-medium leading-[30px] text-primary1-blue">
                            Lorem, ipsum dolor.
                          </p>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <img
                            src={checkcircle}
                            alt="check circle icon"
                            className="h-[26px] w-[26px]"
                          />
                          <p className="text-[20px] raleway-medium leading-[30px] text-primary1-blue">
                            Lorem, ipsum dolor.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="pro">Change your password here.</TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};
export default Pricing;
