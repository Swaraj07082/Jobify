"use client"

import * as React from "react"
import { z } from "zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"

import JobTitles from "../../public/JobTitles.json"
import { location } from "./types/GenericComboBoxProps"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// const frameworks = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js",
//   },
//   {
//     value: "remix",
//     label: "Remix",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ]

interface ComboBoxProps{
  data : location[]
  title : string
}


// JobTitles.map((v)=>console.log(v.value))


 
const formSchema = z.object({
  salary: z.string({
    required_error: "Please select Salary",
  }),
 
  username: z.string().min(2).max(50),

})





export function Combobox({data , title} :ComboBoxProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data.find((framework) => framework.value === value)?.label
            : `Select ${title}...`}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>

          <CommandInput placeholder={`Search ${title}...`} className="h-9" />
          <CommandEmpty>No {title} found.</CommandEmpty>
          <CommandGroup>
            {data.map((framework) => (
              <CommandItem
              key={framework.value}
              value={framework.value}
              onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
                >
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                  />
              </CommandItem>
            ))}
          </CommandGroup>
            </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
