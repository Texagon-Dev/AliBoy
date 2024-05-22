import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";

const StoryCard = ({ storyBookId, image, title, created_at }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };
  return (
    <Card className="h-auto">
      <CardHeader>
        <img
          src={image}
          alt="card image"
          className="h-[164px] w-[220px] rounded-[12px]"
        />
        <CardTitle className="text-[20px] text-primary1-blue arvo-bold text-center ">
          {title}
        </CardTitle>
        <CardDescription className="text-[12px] text-primary1-blue raleway-medium text-center">
          Generated on {formatDate(created_at)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-col md:justify-center md:items-center justify-center  gap-4 ">
          <NavLink to={`/dashboard/editstorybook?storyBookId=${storyBookId}`}>
            <Button className=" rounded-[40px] bg-primary1-pink  lg:w-[209px] lg:h-[40px] px-4 arvo-regular text-[16px] md:w-40 hover:bg-transparent hover:border hover:border-primary1-pink hover:text-primary1-pink">
              View Details
            </Button>
          </NavLink>
          <NavLink to={`/dashboard/bookprinting?storyBookId=${storyBookId}`}>
            <Button
              variant="outlined"
              className="rounded-[40px] border border-primary1-pink px-4 lg:w-[209px] w-full lg:h-[40px] md:w-40 text-primary1-pink hover:bg-primary1-pink hover:text-white arvo-regular text-[16px] "
            >
              Print Book
            </Button>
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
};
export default StoryCard;
