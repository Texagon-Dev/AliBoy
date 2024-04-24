import DashboardNav from "@/components/shared/Dashboard/DashboardNav";
import DashboardTable from "@/components/shared/Dashboard/DashboardTable";
import DashboardCards from "@/components/shared/Dashboard/DashboardCards";

const Dashboard = () => {
  return (
    <>
      <DashboardNav />
      <section className="container">
        <DashboardCards />
        <DashboardTable />
      </section>
    </>
  );
};
export default Dashboard;
