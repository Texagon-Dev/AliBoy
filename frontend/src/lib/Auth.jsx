import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "./supabase";
import { setIsLoading, setSession } from "@/redux/features/userSlice";
import Loading from "@/components/shared/Loading/Loading";

function Auth() {
  const dispatch = useDispatch();
   const isLoading = useSelector((state) => state.user.isLoading);
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
   return <Loading />;
 }
}
export default Auth;
