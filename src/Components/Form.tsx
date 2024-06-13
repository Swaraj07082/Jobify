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
import { useRouter } from "next/navigation";
import { POST } from "@/app/api/demo/route";
import { getSession, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { ThreeDots } from "react-loader-spinner";

// in client components u can use the hooke useSearchParams , but for server components u get it as a prop as searchParams

export const formSchema = z.object({
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
    })
    // .refine((value) => !/\d/.test(value), {
    //   message: "URL must not contain numbers",
    // }),
  // email: z.string().email().min(1, {
  //   message: "This field has to be filled.",
  // }),
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
      // email: "",
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

  // console.log(Formdata.companyName)
  // const postdata = async () => {
  //   const data = await fetch("/api/demo", {
  //     method: "POST",
  //     body: JSON.stringify({
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
  //       UserEmail: Formdata.UserEmail,
  //     }),
  //   });
  // };
  // console.log(data)
  // console.log(Formdata.companyName)
  // const parsedata = await data.json();

  // console.log(parsedata);
  const router = useRouter();
  // useEffect(() => {
  //   // window.history.pushState(null, " ", `?formdata=${Formdata}`);

  //   router.push(`?jobTitle=${Formdata.jobTitle}`),
  //     {
  //       scroll: false,
  //     };
  // }, [Formdata, router]);

  // 2. Define a submit handler.

  const { data } = useSession();

  console.log(data?.user?.email);
  const UserEmail = data?.user?.email;
  console.log(UserEmail);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values.jobTitle);

    // toast({
    //   duration: 2100,
    //   title: "Form Submitted",
    // });
    // reset();
    // console.log(values);
    // SetFormdata(values);

    const respone = await fetch("/api/demo", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
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
        UserEmail: UserEmail,
      }),
    });

    if (respone.ok) {
      toast({
        title: "You submitted the following values:",
        duration: 2100,
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "Error",
      });
    }

    // let data = (JSON.stringify(values))
    // POST()
    // router.push(`?jobTitle=${values.jobTitle}&companyName=${values.companyName}&
    // salary=${values.salary}&
    // salaryType= ${values.salaryType}&
    // jobLocation= ${values.jobLocation}&
    // experienceLevel= ${values.experienceLevel}&
    // skillset=${values.skillset}&
    // employmentType= ${values.employmentType}&
    // description=${values.description}&
    // companyLogo= ${values.companyLogo}&
    // email=${values.email}`),
    //   {
    //     scroll: false,
    //   };

    // router.push(`?jobTitle=${values.jobTitle}&companyName=${values.companyName}&
    //  salary=${values.salary}&
    //  salaryType= ${values.salaryType}&
    //  jobLocation= ${values.jobLocation}&
    //  experienceLevel= ${values.experienceLevel}&
    //  skillset=${values.skillset}&
    //  employmentType= ${values.employmentType}&
    //  description=${values.description}&
    //  companyLogo= ${values.companyLogo}`);
    // postdata();
  }

  const { status } = useSession();
  console.log(status);
  return (
    <>
      {status === "loading" ? (
        <div className=" w-screen h-screen bg-[#bfbebe42] overflow-hidden flex justify-center items-center">
          <ThreeDots
            visible={true}
            height="80"
            width="150"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <></>
      )}
      <Card className={cn(" mt-16  mx-28 max-md:mx-16 max-sm:mx-10 mb-12 ")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div
              className={cn(
                "grid grid-cols-2 mx-5 gap-x-5 gap-y-5 justify-around mt-8 max-md:grid-cols-1 "
              )}
            >
              {/* <div
                className={cn(
                  " w-[570px] ml-6 mt-[10px]  flex flex-col gap-y-7 "
                )}
              > */}
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
                      This is the Job Title that will be used in the dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Experience Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} >
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
              {/* </div> */}

              {/* <div
                className={cn(
                  " w-[570px]   mx-6 flex flex-col gap-y-14"
                )}
              > */}
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
              {/* </div> */}
            </div>

            <div className={cn(" ml-6 mr-16 flex flex-col gap-y-7")}>
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

              {/* <FormField
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
                  </> */}
              {/* )}
              /> */}

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
                      button?.style.animation == null?"" : "";
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
