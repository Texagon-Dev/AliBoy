import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import dots from "../assets/Images/threedots.png";

const ShareAndDeletePopover = () => {
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
          <DropdownMenuItem>Share</DropdownMenuItem>
          <DropdownMenuSeparator className="w-[80%] mx-auto bg-primary1-pink" />
          <DropdownMenuItem className="text-[#FF0000] raleway-medium text-center hover:bg-primary1-pink">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default ShareAndDeletePopover;
