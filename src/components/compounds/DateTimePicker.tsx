"use client";

import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, ClockIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

type Props = {
  date: Date | undefined;
  time: string;
  onSelectDate: (date: Date | undefined) => void;
  onSelectTime: (time: string) => void;
};

export function DateTimePicker({
  date,
  time,
  onSelectDate,
  onSelectTime,
}: Props) {
  return (
    <div className="flex gap-2">
      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? (
              format(date, "PPP", { locale: ptBR })
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onSelectDate}
            initialFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>

      {/* Time Picker */}
      <div className="flex items-center gap-2">
        <Input
          type="time"
          value={time}
          onChange={(e) => onSelectTime(e.target.value)}
        />
      </div>
    </div>
  );
}
