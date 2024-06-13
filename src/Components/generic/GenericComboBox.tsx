"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import StateContext from "@/Context/StateContext";
import { cn } from "@/lib/utils";
import { CommandList } from "cmdk";
import GenericComboBoxProps from "../types/GenericComboBoxProps";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function GenericComboBox({
  data,
  title,
  duration,
  salary,
  postingdate,
  workExp,
  employement,
}: GenericComboBoxProps) {
  const [open, setOpen] = React.useState<boolean>(false);

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

  return (
    <>
      <div
        className={cn(
          " max-[700px]:flex max-[700px]:flex-wrap grid grid-cols-4 gap-x-24 max-lg:flex max-lg:gap-x-2 max-lg:justify-center max-lg:items-center"
        )}
      >
        <div>
          <Popover open={open2} onOpenChange={setOpen2}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open2}
                className="w-[200px] max-lg:w-28 justify-between max-sm:text-[13px]"
              >
                {durations
                  ? duration.find((item) => item.value === durations)?.label
                  : title[1]}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] h-48 p-0 shadow-xl">
              <Command>
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
                            durations === item.value
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
          </Popover>
        </div>

        <div>
          <Popover open={open3} onOpenChange={setOpen3}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open3}
                className="w-[200px] max-lg:w-24 justify-between  max-sm:text-[13px]"
              >
                {salaries
                  ? salary.find((item) => item.value === salaries)?.label
                  : title[2]}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] h-48 p-0 shadow-xl">
              <Command>
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
                            salaries === item.value
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
          </Popover>
        </div>

        <div className=" max-[533px]:mt-3">
          <Popover open={open5} onOpenChange={setOpen5}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open5}
                className="w-[200px] max-lg:w-40 justify-between max-sm:text-[13px]"
              >
                {workExps
                  ? workExp.find((item) => item.value === workExps)?.label
                  : title[4]}
                <CaretSortIcon className="ml-2 max-lg:ml-0 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] h-48 p-0 shadow-xl">
              <Command>
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
                            workExps === item.value
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
          </Popover>
        </div>

        <div className=" max-[700px]:mt-3">
          <Popover open={open6} onOpenChange={setOpen6}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open6}
                className="w-[200px] max-lg:w-44 justify-between  max-sm:text-[13px]"
              >
                {emps
                  ? employement.find((item) => item.value === emps)?.label
                  : title[5]}
                <CaretSortIcon className="ml-2 max-lg:ml-0 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] h-48 p-0 shadow-xl">
              <Command>
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
        </div>
      </div>
    </>
  );
}
