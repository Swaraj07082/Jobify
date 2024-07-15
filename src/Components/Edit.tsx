import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import JobTitles from "../../public/JobTitles.json";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/Components/ui/form";
import salaries from "../../public/Salaries.json";

import { toast } from "@/Components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const title = ["Title", "Salary"];
const FormSchema = z.object({
  jobTitle: z.string({
    required_error: "Please select a JobTitle.",
  }),
  salary: z.string({
    required_error: "Please select a salary.",
  }),
  companyName: z.string({
    required_error: "Please enter the company name.",
  }),
});

interface String {
  id: string;
}

export function Edit({ id }: String) {
  const { data } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await fetch("/api/demo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobTitle: data.jobTitle,
        salary: data.salary,
        companyName: data.companyName,
        id: id,
      }),
    });

    toast({
      title: "You submitted the following values:",
      duration: 2100,
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  useEffect(() => {
    form.reset();
  }, [form]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="light" className="max-md:text-xs" onClick={() => {}}>
          Edit
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" w-[340px] max-sm:w-[270px] ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 max-sm:text-xs">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">MyJobs</h4>
                <p className="text-sm text-muted-foreground">Edit</p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">{title[0]}</Label>

                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-[200px] justify-between max-sm:w-fit",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? JobTitles.find(
                                      (language) =>
                                        language.value === field.value
                                    )?.label
                                  : "Select jobTitle"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandList>
                                <CommandInput
                                  placeholder="Search jobTitle..."
                                  className="h-9"
                                />
                                <CommandEmpty>No JobTitle found.</CommandEmpty>
                                <CommandGroup>
                                  {JobTitles.map((language) => (
                                    <CommandItem
                                      value={language.label}
                                      key={language.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "jobTitle",
                                          language.value
                                        );
                                      }}
                                    >
                                      {language.label}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          language.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">{title[1]}</Label>

                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-[200px] justify-between max-sm:w-fit",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? salaries.find(
                                      (language) =>
                                        language.value === field.value
                                    )?.label
                                  : "Select language"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandList>
                                <CommandInput
                                  placeholder="Search framework..."
                                  className="h-9"
                                />
                                <CommandEmpty>No salary found.</CommandEmpty>
                                <CommandGroup>
                                  {salaries.map((language) => (
                                    <CommandItem
                                      value={language.label}
                                      key={language.value}
                                      onSelect={() => {
                                        form.setValue("salary", language.value);
                                      }}
                                    >
                                      {language.label}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          language.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4 max-sm:text-xs">
                  <Label htmlFor="Company-Name">Company Name</Label>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
