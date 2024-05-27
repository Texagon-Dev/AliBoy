import DashboardNav from "@/components/shared/Dashboard/DashboardNav";
import DashboardTable from "@/components/shared/Dashboard/DashboardTable";
import DashboardCards from "@/components/shared/Dashboard/DashboardCards";
import Loading from "@/components/shared/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "@/redux/features/userSlice";
import { fetchOrders } from "@/redux/features/customerOrdersSlice";

const Dashboard = () => {
  const isLoadingUsers = useSelector((state) => state.user.isLoading);
  const { status: OrdersStatus } = useSelector((state) => state.customerOrders);

  const [isLoading, setisLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (OrdersStatus === "idle") {
      dispatch(fetchAllUsers()).then(() => {
        dispatch(fetchOrders());
    
      });
    }
  }, [OrdersStatus, dispatch]);
 
  return (
    <>
      <DashboardNav />
      {OrdersStatus === "loading" || isLoadingUsers  ? (
        <div>
          <Loading />
        </div>
      ) : (
        <section className="container">
          <DashboardCards />
          <DashboardTable />
        </section>
      )}
    </>
  );
};

export default Dashboard;