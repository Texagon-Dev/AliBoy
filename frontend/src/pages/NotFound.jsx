import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-secondary1-pink">
      <div className="text-center">
        <h1 className="text-6xl font-bold arvo-bold text-gray-800">404</h1>
        <p className="text-xl font-medium text-gray-700 ">Page not found</p>
        <p className="mt-4 md:w-full w-1/2 m-auto text-center text-md text-gray-600 raleway-medium">
          The page you are looking for does  not exist or has moved.
        </p>
        <Button
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-2 arvo-bold  text-white hover:text-primary1-pink font-semibold rounded-md hover:bg-white hover:border hover:border-primary1-pink"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
