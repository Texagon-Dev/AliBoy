import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import edit from "@/assets/Images/edit.png";
import { Textarea } from "./ui/textarea";

const StoryEdit = ({
  updateRegeneratedText,
  handleTextEditing,
  editedText,
}) => {
  return (
    <Dialog className="bg-white">
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer ml-2">
          {" "}
      
            <img src={edit} alt="Edit story" className="h-5 w-5" />
          
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:w-[485px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit story</DialogTitle>
          <DialogDescription>
            Make changes to your story here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
           
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Story
            </Label>
            <Textarea
              id="username"
         
              className="col-span-3"
              onChange={handleTextEditing}
              value={editedText}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={updateRegeneratedText}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StoryEdit;
