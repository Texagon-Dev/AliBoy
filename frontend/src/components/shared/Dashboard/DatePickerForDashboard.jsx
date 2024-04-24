"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import calenderimg from "../../../assets/Images/calender.png";
import dropdash from "../../../assets/Images/dropdowndash.png";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerForDashboard({ className }) {
  const [date, setDate] = React.useState({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={cn("flex gap-2 items-center justify-center", className)}
        >
          <img src={calenderimg} alt="" className="w-[36px] h-[36px]" />
          <div className="flex justify-start items-start flex-col">
            <h1 className="arvo-regular text-[18px]">Filter Period</h1>

            <div
              id="date"
              className={cn(
                "border-none w-[151px] bg-transparent h-[20px] text-[] text-center raleway-regular text-xs p-0 ",
                !date && "text-muted-foreground"
              )}
            >
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </div>
          </div>
          <div>
            <img src={dropdash} alt="" className="h-5 w-5 ml-5" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto mt-4" align="center">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePickerForDashboard;
