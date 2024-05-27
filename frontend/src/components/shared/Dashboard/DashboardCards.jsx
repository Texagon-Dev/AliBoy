import DatePickerForDashboard from "./DatePickerForDashboard";
import revenueicon from "../../../assets/Images/revenueicon.png";
import ordericon from "../../../assets/Images/ordericon.png";
import deliveredicon from "../../../assets/Images/deliveredicon.png";
import cancelledicon from "../../../assets/Images/cancelledicon.png";
import down from "../../../assets/Images/downtrend.png";
import up from "../../../assets/Images/uptrend1.png";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useState } from "react";
import Loading from "../Loading/Loading";

const DashboardCards = () => {
  const users = useSelector((state) => state.user.user);
  const { orders, status } = useSelector((state) => state.customerOrders);
  console.log("orders", orders);
  
  const [dateRange, setDateRange] = useState({
    from: dayjs().subtract(30, "day").startOf("day").toDate(),
    to: dayjs().endOf("day").toDate(),
  });

  const daysInRange =
    dayjs(dateRange.to).diff(dayjs(dateRange.from), "day") + 1;


  // Filter orders based on the selected date range
  const filteredOrders = orders.filter((order) => {
    const orderDate = dayjs(order.created_at);
    return (
      orderDate.isAfter(dayjs(dateRange.from)) &&
      orderDate.isBefore(dayjs(dateRange.to))
    );
  });

  // Calculate metrics for the current date range

  const getTotalRevenue = () =>
    filteredOrders.reduce((acc, order) => acc + order.item_total, 0);
  const getTotalOrders = () => filteredOrders.length;
  const getTotalDelivered = () =>
    filteredOrders.filter((order) => order.order_status === "Delivered").length;
  const getTotalCanceled = () =>
    filteredOrders.filter((order) => order.order_status === "Cancelled").length;

  // Calculate metrics for the previous 30 days
  const previousRange = {
    from: dayjs(dateRange.from).subtract(30, "day").toDate(),
    to: dayjs(dateRange.from).subtract(1, "day").endOf("day").toDate(),
  };

  const previousOrders = orders.filter((order) => {
    const orderDate = dayjs(order.created_at);
    return (
      orderDate.isAfter(dayjs(previousRange.from).subtract(1, "day")) &&
      orderDate.isBefore(dayjs(previousRange.to).add(1, "day"))
    );
  });

  // Calculate metrics for the previous equivalent period
  // const previousRange = {
  //   from: dayjs(dateRange.from).subtract(daysInRange, "day").toDate(),
  //   to: dayjs(dateRange.from).subtract(1, "day").toDate(),
  // };

  // const previousOrders = orders.filter((order) => {
  //   const orderDate = dayjs(order.date);
  //   return (
  //     orderDate.isAfter(dayjs(previousRange.from).subtract(1, "day")) &&
  //     orderDate.isBefore(dayjs(previousRange.to).add(1, "day"))
  //   );
  // });

  const getPreviousTotalRevenue = () =>
    previousOrders.reduce((acc, order) => acc + order.item_total, 0);
  const getPreviousTotalOrders = () => previousOrders.length;
  const getPreviousTotalDelivered = () =>
    previousOrders.filter((order) => order.order_status === "Delivered").length;
  const getPreviousTotalCanceled = () =>
    previousOrders.filter((order) => order.order_status === "Cancelled").length;

  // Calculate percentage changes
  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const revenueChange = calculatePercentageChange(
    getTotalRevenue(),
    getPreviousTotalRevenue()
  );
  const ordersChange = calculatePercentageChange(
    getTotalOrders(),
    getPreviousTotalOrders()
  );
  const deliveredChange = calculatePercentageChange(
    getTotalDelivered(),
    getPreviousTotalDelivered()
  );
  const canceledChange = calculatePercentageChange(
    getTotalCanceled(),
    getPreviousTotalCanceled()
  );



  return (
    <div className="md:mt-[100px] mt-[80px]">
      <div className="flex md:flex-row flex-col mb-8 md:justify-between justify-center items-center ">
        <div className="flex flex-col lg:mt-4 md:mt-0 mt-2 md:justify-start justify-center   ">
          <h1 className="arvo-bold text-[44px] leading-[54.3px]">Dashboard</h1>

          <p className="text-xl raleway-medium text-[#6B6D6E] lg:w-full md:w-2/3 md:mb-0 mb-4">
            Hi, {users.metadata.full_name.split(" ")[0]}. Welcome back to Story
            Book Admin!
          </p>
        </div>
        <div className="border w-[293px] h-[62px] rounded-[40px] border-[#FAC0D3] flex gap-2 items-center justify-center">
          <div className="flex gap-2 items-center justify-center">
            <DatePickerForDashboard
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 items-center justify-center">
        <div className="rounded-xl border bg-card border-[#FAC0D3] text-card-foreground shadow h-[164px] w-[320px]">
          <div className="p-6 flex flex-row items-center justify-center space-y-0 pb-2">
            <div>
              <img src={revenueicon} alt="total revenue icon" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-[44px] arvo-bold text-primary1-blue ">
                ${getTotalRevenue()}
              </div>
              <h5 className="leading-[18px] text-[16px] raleway-regular text-primary1-blue">
                Total Revenue
              </h5>
              <div className="flex gap-1 items-center justify-center">
                <img
                  src={revenueChange >= 0 ? up : down}
                  alt="Revenue Change"
                  className="h-4 w-4"
                />
                <p className="text-xs text-[#6B6D6E] raleway-regular">
                  {revenueChange.toFixed(0)}% ({daysInRange} days)
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
                {getTotalOrders()}
              </div>
              <h5 className="leading-[18px] text-[16px] raleway-regular text-primary1-blue">
                Total Orders
              </h5>
              <div className="flex gap-1 items-center justify-center">
                <img
                  src={ordersChange >= 0 ? up : down}
                  alt="order change"
                  className="h-4 w-4"
                />
                <p className="text-xs text-[#6B6D6E] raleway-regular">
                  {ordersChange.toFixed(0)}% ({daysInRange} days)
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
                {getTotalDelivered()}
              </div>
              <h5 className="leading-[18px] text-[16px] raleway-regular text-primary1-blue">
                Total Delivered
              </h5>
              <div className="flex gap-1 items-center justify-center">
                <img
                  src={deliveredChange >= 0 ? up : down}
                  alt="Delivered"
                  className="h-4 w-4"
                />
                <p className="text-xs text-[#6B6D6E] raleway-regular">
                  {deliveredChange.toFixed(0)}%({daysInRange} days)
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
                {getTotalCanceled()}
              </div>
              <h5 className="leading-[18px] text-[16px] raleway-regular text-primary1-blue">
                Total Cancelled
              </h5>
              <div className="flex gap-1 items-center justify-center">
                <img
                  src={canceledChange >= 0 ? up : down}
                  alt=""
                  className="h-4 w-4"
                />
                <p className="text-xs text-[#6B6D6E] raleway-regular">
                  {canceledChange.toFixed(0)}% ({daysInRange} days)
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
