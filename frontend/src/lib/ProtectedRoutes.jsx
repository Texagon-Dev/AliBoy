// ProtectedRoutes Component
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsLoading, setSession } from "@/redux/features/userSlice";
import supabase from "./supabase";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(setIsLoading(true));
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error.message);
          return;
        }
        console.log("Fetched session:", data.session);

        if (data && data.session) {
          dispatch(setSession(data.session));
        }
        dispatch(setIsLoading(false));
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        dispatch(setSession(session));
      } else if (event === "SIGNED_OUT") {
        dispatch(setSession(null));
      }
    });

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
