import  { useEffect } from "react";
import {  useNavigate } from "react-router-dom";

const CheckoutSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating order placement success
    setTimeout(() => {
      // Redirect to the stories page after 3 seconds
      navigate("/user");
    }, 3000);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Redirecting to stories page...
      </p>
      {/* You can add a loading spinner or animation here if desired */}
    </div>
  );
};

export default CheckoutSuccessPage;
