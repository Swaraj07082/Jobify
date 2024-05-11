"use client";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "../Components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../Components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { CommandList } from "cmdk";
import { Card } from "./ui/card";
import { useContext, useEffect, useState } from "react";
import { toast, useToast } from "./ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
// import MultipleSelectorDemo from "./MultiSelectDemo";
// import { FancyMultiSelect } from "./ui/MultiSelect";
// import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import JobTitles from "../../public/JobTitles.json";
import Salaries from "../../public/Salaries.json";
import SalaryType from "../../public/SalaryType.json";
import skillset from "../../public/skillset.json";
import employmenttype from "../../public/employmenttype.json";
import experienceLevel from "../../public/experienceLevel.json";
import FormDataContext from "@/Context/FormDataContext";
import db from "@/lib/db";
import { Sub } from "@radix-ui/react-menubar";
import { error } from "console";

const formSchema = z.object({
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
  jobTitle: z.string({
    required_error: "Please select a Job Title.",
  }),
  companyName: z.string().min(1, {
    message: "Please enter the company name.",
  }),
  salary: z.string({
    required_error: "Please select Salary",
  }),
  salaryType: z.string({
    required_error: "Please select a Salary type",
  }),
  jobLocation: z.string().min(1, {
    message: "Please enter the job location.",
  }),
  experienceLevel: z.string().min(1, {
    message: "Please enter your experience level",
  }),
  skillset: z.string({
    required_error: "Please select your skillset",
  }),
  employmentType: z.string({
    required_error: "Please select a Employment type",
  }),
  description: z.string().min(10, {
    message: "Username must be at least 10 characters.",
  }),
  companyLogo: z
    .string()
    .url({ message: "Please enter a valid URL in https:// format " })
    .refine((value) => value.startsWith("https://"), {
      message: "URL must start with 'https://'.",
    }),
  email: z.string().email().min(1, {
    message: "This field has to be filled.",
  }),
});

// const jobLocation = [{
//     "value":"San Francisco",
//     "label":"San Francisco"
// }]

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobLocation: "",
      companyName: "",
      experienceLevel: "",
      description: "",
      companyLogo: "",
      email: "",
      salary: "",
      salaryType: "",
      skillset: "",
      employmentType: "",
    },
  });

  const { reset } = form;

  // const [Formdata, SetFormdata] = useState({})
  const { Formdata, SetFormdata } = useContext(FormDataContext);

  console.log(Formdata);


  // const postdata = async () => {
  //   const res = await fetch("/api/jobs", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       jobTitle : Formdata.jobTitle,
  //     }),
  //   });

  //   console.log(res);
  // };

  // const postdata = async () => {
  //    await db.job.create({
  //     data: {
  //       jobTitle: Formdata.jobTitle,
  //       companyName: Formdata.companyName,
  //       salary: Formdata.salary,
  //       salaryType: Formdata.salaryType,
  //       jobLocation: Formdata.jobLocation,
  //       experienceLevel: Formdata.experienceLevel,
  //       skillset: Formdata.skillset,
  //       employmentType: Formdata.employmentType,
  //       description: Formdata.description,
  //       companyLogo: Formdata.companyLogo,
  //       email: Formdata.email,
  //     },
  //   });
  // };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values.jobTitle)
    try{
      await db.job.create({
        data: {
          jobTitle: values.jobTitle,
          companyName: values.companyName,
          salary: values.salary,
          salaryType: values.salaryType,
          jobLocation: values.jobLocation,
          experienceLevel: values.experienceLevel,
          skillset: values.skillset,
          employmentType: values.employmentType,
          description: values.description,
          companyLogo: values.companyLogo,
          email: values.email,
        },
      });
  
      alert("Form Submitted");
      reset();
      console.log(values);
      SetFormdata(values);
    } catch {
      console.error('Error submitting form:');
      alert('An error occurred. Please try again later.');
    }
    // console.log(values.description)

    // const res = await fetch("/api/jobs", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     jobTitle: values.jobTitle,
    //     companyName: values.companyName,
    //     salary: values.salary,
    //     salaryType: values.salaryType,
    //     jobLocation: values.jobLocation,
    //     experienceLevel: values.experienceLevel,
    //     skillset: values.skillset,
    //     employmentType: values.employmentType,
    //     description: values.description,
    //     companyLogo: values.companyLogo,
    //     email: values.email,
    //   }),
    // });

    // const res = await fetch("/api/jobs", {
    //   method: "POST",
    //   body: JSON.stringify(
    //   values)
    // });
    // // const data = await res.json();
    // console.log(res);

    // postdata();
  }

  return (
    <>
      <Card className={cn(" mt-16  ml-28 mr-28 mb-12 ")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div className={cn("flex justify-around mt-8 ")}>
              <div
                className={cn(
                  " w-[570px] ml-6 mt-[10px] flex flex-col gap-y-7 "
                )}
              >
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Job Title</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                " justify-between w-full",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? JobTitles.find(
                                    (JobTitle) => JobTitle.value === field.value
                                  )?.label
                                : "Select a Job Title"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command className={cn(" h-[228px]")}>
                            <CommandInput
                              placeholder="Search Job Title..."
                              className="h-9"
                            />
                            <CommandEmpty>No Job Title found.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {JobTitles.map((JobTitle) => (
                                  <CommandItem
                                    value={JobTitle.label}
                                    key={JobTitle.value}
                                    onSelect={() => {
                                      form.setValue("jobTitle", JobTitle.value);
                                    }}
                                  >
                                    {JobTitle.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        JobTitle.value === field.value
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
                      <FormDescription>
                        This is the Job Title that will be used in the
                        dashboard.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobLocation"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Job Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Job location"
                            {...field}
                            className={cn(" w-full ")}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your Job Location.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your company name"
                            {...field}
                            className={cn("w-full")}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your company name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {experienceLevel.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className={cn(" w-[570px]  mr-6 flex flex-col gap-y-14")}>
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Salary..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Salaries.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salaryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Salary Type..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SalaryType.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="skillset"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skillset</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Skillset..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {skillset.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Employment Type..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employmenttype.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className={cn(" ml-11 mr-11 flex flex-col gap-y-7")}>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Description"
                          {...field}
                          className={cn("w-full")}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your description.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="companyLogo"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Company Logo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter company logo URL"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your company logo.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormDescription>This is your email.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <Button
                type="submit"
                className={cn(
                  "button w-36 self-center justify-self-center mb-7"
                )}
                id="button"
                onClick={function () {
                  var button = document.getElementById("button");
                  if (button) {
                    button.style.animation = "clickAnimation 0.2s";
                    setTimeout(function () {
                      button.style.animation = "";
                    }, 200);
                  }

                  // handleclick
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
}
