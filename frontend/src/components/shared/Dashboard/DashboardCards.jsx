import DatePickerForDashboard from "./DatePickerForDashboard";
import revenueicon from "../../../assets/Images/revenueicon.png";
import ordericon from "../../../assets/Images/ordericon.png";
import deliveredicon from "../../../assets/Images/deliveredicon.png";
import cancelledicon from "../../../assets/Images/cancelledicon.png";
import down from "../../../assets/Images/downtrend.png";
import up from "../../../assets/Images/uptrend1.png";
const DashboardCards = () => {
  return (
    <div className="md:mt-[120px] mt-[80px]">
      <div className="flex md:flex-row flex-col mb-8 md:justify-between  ">
        <div className="flex flex-col mt-4 ">
          <h1 className="arvo-bold text-[44px] leading-[54.3px]">Dashboard</h1>
          <p className="text-xl raleway-medium text-[#6B6D6E]">
            Hi, Samantha. Welcome back to Story Book Admin!
          </p>
        </div>
        <div className="border w-[293px] h-[62px] rounded-[40px] border-[#FAC0D3] flex gap-2 items-center justify-center">
          <div className="flex gap-2 items-center justify-center">
            <DatePickerForDashboard />
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card border-[#FAC0D3] text-card-foreground shadow h-[164px] w-[320px]">
          <div className="p-6 flex flex-row items-center justify-center space-y-0 pb-2">
            <div>
              <img src={revenueicon} alt="total revenue icon" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-[44px] arvo-bold text-primary1-blue ">
                $128
              </div>
              <h5 className="leading-[18px] text-[16px] raleway-regular text-primary1-blue">
                Total Revenue
              </h5>
              <div className="flex gap-1 items-center justify-center">
                <img src={down} alt="" className="h-4 w-4" />
                <p className="text-xs text-[#6B6D6E] raleway-regular">
                  12% (30 days)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card border-[#FAC0D3] text-card-foreground shadow h-[164px] w-[320px]">
          <div className="p-6 flex flex-row items-center justify-center space-y-0 pb-2">
            <div>
              <img src={ordericon} alt="total revenue" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-[44px] arvo-bold text-primary1-blue ">
                75
              </div>
              <h5 className="leading-[18px] text-[16px] raleway-regular text-primary1-blue">
                Total Orders
              </h5>
              <div className="flex gap-1 items-center justify-center">
                <img src={up} alt="" className="h-4 w-4" />
                <p className="text-xs text-[#6B6D6E] raleway-regular">
                  4% (30 days)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card border-[#FAC0D3] text-card-foreground shadow h-[164px] w-[320px]">
          <div className="p-6 flex flex-row items-center justify-center space-y-0 pb-2">
            <div>
              <img src={deliveredicon} alt="total revenue" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-[44px] arvo-bold text-primary1-blue ">
                357
              </div>
              <h5 className="leading-[18px] text-[16px] raleway-regular text-primary1-blue">
                Total Delivered
              </h5>
              <div className="flex gap-1 items-center justify-center">
                <img src={up} alt="" className="h-4 w-4" />
                <p className="text-xs text-[#6B6D6E] raleway-regular">
                  4% (30 days)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card border-[#FAC0D3] text-card-foreground shadow h-[164px] w-[320px]">
          <div className="p-6 flex flex-row items-center justify-center space-y-0 pb-2">
            <div>
              <img src={cancelledicon} alt="total revenue" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-[44px] arvo-bold text-primary1-blue ">
                65
              </div>
              <h5 className="leading-[18px] text-[16px] raleway-regular text-primary1-blue">
                Total Cancelled
              </h5>
              <div className="flex gap-1 items-center justify-center">
                <img src={down} alt="" className="h-4 w-4" />
                <p className="text-xs text-[#6B6D6E] raleway-regular">
                  25% (30 days)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardCards;
