// ProtectedRoutes Component
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "@/components/shared/Loading/Loading";

const GuestRoutes = () => {
  const { session, isLoading } = useSelector((state) => state.user);
  const isAuthenticated = session?.user;
  console.log(
    "Session:",
    session,
    "Is Loading:",
    isLoading,
    "Is Authenticated:",
    isAuthenticated
  );

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/user" />;
};

export default GuestRoutes;
