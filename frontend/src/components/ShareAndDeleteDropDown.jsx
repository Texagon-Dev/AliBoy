import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import dots from "../assets/Images/threedots.png";
import { toast } from "react-toastify";

const ShareAndDeletePopover = ({ handleDelete, urlToShare }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check this out!",
          url: urlToShare,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      // Fallback for browsers that do not support the Web Share API
      copyToClipboard(urlToShare);
      toast("URL copied to clipboard");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text:", error);
      });
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <img
            src={dots}
            alt="share or delete story"
            className="cursor-pointer text-center  "
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-transparent border border-[#FAC0D3]  !important">
          <DropdownMenuItem onClick={handleShare}>Share</DropdownMenuItem>
          <DropdownMenuSeparator className="w-[80%] mx-auto bg-primary1-pink" />
          <DropdownMenuItem
            className="text-[#FF0000] raleway-medium text-center hover:bg-primary1-pink"
            onClick={handleDelete}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default ShareAndDeletePopover;
