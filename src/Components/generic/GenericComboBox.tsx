"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CommandList } from "cmdk";
import GenericComboBoxProps from "../types/GenericComboBoxProps";
import StateContext from "@/Context/StateContext";

// const frameworks = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
// ];

export function GenericComboBox({ data, title , duration }: GenericComboBoxProps) {
  // console.log(data)
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState<string>("");
  const [open2 , setOpen2] =React.useState(false)

  const { value, setValue } = React.useContext(StateContext);
  const [ durations , setdurations] = React.useState('')

  //   console.log(frameworks)
  console.log(value) 
  console.log(durations)

  return (
    <>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? data.find((item) => item.value === value)?.label : title}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] h-48 p-0">
        <Command>
          <CommandInput placeholder={`Search ${title}...`} className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {data.slice(0, 10).map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                      )}
                      />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>





<Popover open={open2} onOpenChange={setOpen2}>
<PopoverTrigger asChild>
  <Button
    variant="outline"
    role="combobox"
    aria-expanded={open2}
    className="w-[200px] justify-between"
    >
    {durations ? duration.find((item) => item.value === durations)?.label : title}
    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  </Button>
</PopoverTrigger>
<PopoverContent className="w-[200px] h-48 p-0">
  <Command>
    <CommandInput placeholder={`Search ${title}...`} className="h-9" />
    <CommandEmpty>No framework found.</CommandEmpty>
    <CommandGroup>
      <CommandList>
        {duration.map((item) => (
          <CommandItem
          key={item.value}
          value={item.value}
          onSelect={(currentValue) => {
            setdurations(currentValue === durations ? "" : currentValue);
              setOpen2(false);
            }}
          >
            {item.label}
            <CheckIcon
              className={cn(
                "ml-auto h-4 w-4",
                durations === item.value ? "opacity-100" : "opacity-0"
              )}
              />
          </CommandItem>
        ))}
      </CommandList>
    </CommandGroup>
  </Command>
</PopoverContent>
</Popover> 
        </>
  );
}
