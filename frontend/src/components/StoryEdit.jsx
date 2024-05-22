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

import { Label } from "@/components/ui/label";
import edit from "@/assets/Images/edit.png";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";


const StoryEdit = ({  text, onSave, indexData }) => {
  const [editedText, setEditedText] = useState(text);
  useEffect(() => {
    setEditedText(text);
  }, [text]);

  return (
    <Dialog className="bg-white">
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer ml-2">
          {" "}
          <img src={edit} alt="Edit story" className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:w-[685px] md:h-[400px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit story</DialogTitle>
          <DialogDescription>
            Make changes to your story here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="username" className="text-start">
              Story
            </Label>
            <Textarea
              id="username"
              className="col-span-3"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={() => onSave(indexData, editedText)}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StoryEdit;
