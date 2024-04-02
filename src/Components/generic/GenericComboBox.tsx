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

export function GenericComboBox({
  data,
  title,
  duration,
  salary,
  postingdate,
  workExp,
  employement,
}: GenericComboBoxProps) {
  // console.log(data)
  const [open, setOpen] = React.useState<boolean>(false);
  // const [value, setValue] = React.useState<string>("");
  const [open2, setOpen2] = React.useState<boolean>(false);

  const { value, setValue } = React.useContext(StateContext);
  const { salaries, setsalaries } = React.useContext(StateContext);
  const { postingdates, setpostingdates } = React.useContext(StateContext);
  const { workExps, setworkexps } = React.useContext(StateContext);
  const { emps, setemps } = React.useContext(StateContext);
  const { durations, setdurations } = React.useContext(StateContext);

  const [open3, setOpen3] = React.useState<boolean>(false);
  const [open4, setOpen4] = React.useState<boolean>(false);
  const [open5, setOpen5] = React.useState<boolean>(false);
  const [open6, setOpen6] = React.useState<boolean>(false);

  // console.log(value);
  // console.log(durations);
  // console.log(salaries);
  // console.log(postingdates);
  // console.log(workExps);
  // console.log(emps);

  return (
    <>
      {/* <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? data.find((item) => item.value === value)?.label
              : title[0]}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] h-48 p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${title[0]}...`}
              className="h-9"
            />
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
      </Popover> */}

      <Popover open={open2} onOpenChange={setOpen2}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open2}
            className="w-[200px] justify-between"
          >
            {durations
              ? duration.find((item) => item.value === durations)?.label
              : title[1]}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] h-48 p-0">
          <Command>
            {/* <CommandInput placeholder={`Search ${title[1]}...`} className="h-9" /> */}
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {duration.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setdurations(
                        currentValue === durations ? "" : currentValue
                      );
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

      <Popover open={open3} onOpenChange={setOpen3}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open3}
            className="w-[200px] justify-between"
          >
            {salaries
              ? salary.find((item) => item.value === salaries)?.label
              : title[2]}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] h-48 p-0">
          <Command>
            {/* <CommandInput placeholder={`Search ${title[2]}...`} className="h-9" /> */}
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {salary.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setsalaries(
                        currentValue === salaries ? "" : currentValue
                      );
                      setOpen3(false);
                    }}
                  >
                    {item.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        salaries === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
{/* 
      <Popover open={open4} onOpenChange={setOpen4}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open4}
            className="w-[200px] justify-between"
          >
            {postingdates
              ? postingdate.find((item) => item.value === postingdates)?.label
              : title[3]}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] h-48 p-0">
          <Command>
            <CommandInput placeholder={`Search ${title[2]}...`} className="h-9" />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {postingdate.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setpostingdates(
                        currentValue === postingdates ? "" : currentValue
                      );
                      setOpen4(false);
                    }}
                  >
                    {item.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        postingdates === item.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover> */}

      <Popover open={open5} onOpenChange={setOpen5}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open5}
            className="w-[200px] justify-between"
          >
            {workExps
              ? workExp.find((item) => item.value === workExps)?.label
              : title[4]}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] h-48 p-0">
          <Command>
            {/* <CommandInput placeholder={`Search ${title[2]}...`} className="h-9" /> */}
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {workExp.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setworkexps(
                        currentValue === workExps ? "" : currentValue
                      );
                      setOpen5(false);
                    }}
                  >
                    {item.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        workExps === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={open6} onOpenChange={setOpen6}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open6}
            className="w-[200px] justify-between"
          >
            {emps
              ? employement.find((item) => item.value === emps)?.label
              : title[5]}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] h-48 p-0">
          <Command>
            {/* <CommandInput placeholder={`Search ${title[2]}...`} className="h-9" /> */}
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {employement.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setemps(currentValue === emps ? "" : currentValue);
                      setOpen6(false);
                    }}
                  >
                    {item.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        emps === item.value ? "opacity-100" : "opacity-0"
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
