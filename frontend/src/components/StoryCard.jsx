import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import cardImage from "../assets/Images/cardimage.png"
import { Button } from "./ui/button";

const StoryCard = ({image, title, description, button1, button2 }) => {
  return (
    <Card>
      <CardHeader>
        <img
          src={image}
          alt="card image"
          className="h-[164px] w-[220px] rounded-[12px]"
        />
        <CardTitle className="text-[20px] text-primary1-blue arvo-bold text-center ">
          Oceeyan Odyss
        </CardTitle>
        <CardDescription className="text-[12px] text-primary1-blue raleway-medium text-center ">
          Generated on 12/04/2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-col justify-center md:flex-row gap-4 ">
          <Button className=" rounded-[40px] bg-primary1-pink  lg:w-[209px] lg:h-[40px] px-4 arvo-regular text-[16px] md:w-40 hover:bg-transparent hover:border hover:border-primary1-pink hover:text-primary1-pink">
            View Details
          </Button>
          <Button
            variant="outlined"
            className="rounded-[40px] border border-primary1-pink px-4 lg:w-[209px] lg:h-[40px] md:w-40 text-primary1-pink hover:bg-primary1-pink hover:text-white arvo-regular text-[16px] "
          >
            Print a Book
          </Button>
        </div>
      </CardContent>
    </Card>
  );

};
export default StoryCard;
