"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Calendar } from "@/app/components/ui/calendar";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal hover:bg-transparent hover:text-[#3e888c] rounded-none",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarDays size={16} className="mr-2 hover:bg-[#3e888c]" />

          {date ? (
            format(date, "PPP")
          ) : (
            <span className="text-gray-500">Pick a date</span>
          )}
          {date && (
            <button
              onClick={() => setDate(undefined)}
              className="ml-auto text-xs text-[#3e888c] hover:underline"
            >
              Clear
            </button>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
