"use client";

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
import { useEffect, useState } from "react";
import { toast, useToast } from "./ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
// import MultipleSelectorDemo from "./MultiSelectDemo";
// import { FancyMultiSelect } from "./ui/MultiSelect";
// import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

const formSchema = z.object({
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
  JobTitle: z.string({
    required_error: "Please select a Job Title.",
  }),
  companyname: z.string({
    required_error: "Please enter the company name.",
  }),
  salary: z.string({
    required_error: "Please select Salary",
  }),
  salarytype: z.string({
    required_error: "Please select a Salary type",
  }),
  joblocation: z.string().min(0, {
    message: "Please enter the job location.",
  }),
  experiencelevel: z.string({
    required_error: "Please enter your experience level",
  }),
  skillset: z.string({
    required_error: "Please select your skillset",
  }),
  employmenttype: z.string({
    required_error: "Please select a Employment type",
  }),
  description: z.string().min(10, {
    message: "Username must be at least 10 characters.",
  }),
  companylogo: z
    .string()
    .url({ message: "Please enter a valid URL in https:// format " })
    .refine((value) => value.startsWith("https://"), {
      message: "URL must start with 'https://'.",
    }),
  email: z.string().min(1, {
    message: "This field has to be filled.",
  }),
});

const JobTitles = [
  { value: "Admin Big Data", label: "Admin Big Data" },
  {
    value: "Ansible Operations Engineer",
    label: "Ansible Operations Engineer",
  },
  { value: "Artifactory Administrator", label: "Artifactory Administrator" },
  {
    value: "Artificial intelligence / Machine Learning Engineer",
    label: "Artificial intelligence / Machine Learning Engineer",
  },
  {
    value: "Artificial Intelligence / Machine Learning Leader",
    label: "Artificial Intelligence / Machine Learning Leader",
  },
  {
    value: "Artificial Intelligence / Machine Learning Sr.Leader",
    label: "Artificial Intelligence / Machine Learning Sr.Leader",
  },
  {
    value: "Artificial intelligence Architect",
    label: "Artificial intelligence Architect",
  },
  {
    value: "Artificial Intelligence Researcher",
    label: "Artificial Intelligence Researcher",
  },
  { value: "Big Data Architect", label: "Big Data Architect" },
  { value: "Big Data Engineer", label: "Big Data Engineer" },
  { value: "Big Data Specialist", label: "Big Data Specialist" },
  { value: "Build and Release Engineer", label: "Build and Release Engineer" },
  { value: "Build Engineer", label: "Build Engineer" },
  { value: "Chef Operations Engineer", label: "Chef Operations Engineer" },
  { value: "Data Analysts", label: "Data Analysts" },
  { value: "Data Architect", label: "Data Architect" },
  { value: "DevOps Architect", label: "DevOps Architect" },
  { value: "DevOps Engineer", label: "DevOps Engineer" },
  { value: "ELK Engineer", label: "ELK Engineer" },
  { value: "Gerrit Administrator", label: "Gerrit Administrator" },
  { value: "Jenkins Engineer", label: "Jenkins Engineer" },
  { value: "Jira Administrator", label: "Jira Administrator" },
  {
    value: "Kubernetes Operations Engineer",
    label: "Kubernetes Operations Engineer",
  },
  { value: "Machine learning Architect", label: "Machine learning Architect" },
  { value: "Machine Learning Engineer", label: "Machine Learning Engineer" },
  { value: "Operations Engineer", label: "Operations Engineer" },
  {
    value: "Principle Engineer in Artificial Intelligence",
    label: "Principle Engineer in Artificial Intelligence",
  },
  {
    value: "Principle Engineer in Big Data",
    label: "Principle Engineer in Big Data",
  },
  {
    value: "Principle Engineer in Data Analysis",
    label: "Principle Engineer in Data Analysis",
  },
  {
    value: "Principle Engineer in Machine Learning",
    label: "Principle Engineer in Machine Learning",
  },
  {
    value: "Production Support Engineer",
    label: "Production Support Engineer",
  },
  { value: "Puppet Operations Engineer", label: "Puppet Operations Engineer" },
  {
    value: "Senior Build and Release Engineer",
    label: "Senior Build and Release Engineer",
  },
  { value: "Senior Build Engineer", label: "Senior Build Engineer" },
  { value: "Senior DevOps Engineer", label: "Senior DevOps Engineer" },
  {
    value: "Senior Site reliability Engineer",
    label: "Senior Site reliability Engineer",
  },
  {
    value: "Site Reliability Engineer (Kubernetes – Docker)",
    label: "Site Reliability Engineer (Kubernetes – Docker)",
  },
  { value: "Splunk Engineer", label: "Splunk Engineer" },
  { value: ".NET Developer", label: ".NET Developer" },
  { value: "ACCESSIBILITY SPECIALIST", label: "ACCESSIBILITY SPECIALIST" },
  { value: "AGILE PROJECT MANAGER", label: "AGILE PROJECT MANAGER" },
  { value: "Android Developer", label: "Android Developer" },
  {
    value: "Ansible Automation Engineer",
    label: "Ansible Automation Engineer",
  },
  { value: "AppDynamics Engineer", label: "AppDynamics Engineer" },
  {
    value: "Application Security Engineer",
    label: "Application Security Engineer",
  },
  { value: "Artifactory Engineer", label: "Artifactory Engineer" },
  {
    value: "Artificial Intelligence (AI) / Machine Learning Engineer",
    label: "Artificial Intelligence (AI) / Machine Learning Engineer",
  },
  { value: "AWS DevOps Engineer", label: "AWS DevOps Engineer" },
  { value: "AWS Solutions Architect", label: "AWS Solutions Architect" },
  { value: "Azure DevOps Engineer", label: "Azure DevOps Engineer" },
  { value: "Bamboo Engineer", label: "Bamboo Engineer" },
  { value: "Bitbucket Engineer", label: "Bitbucket Engineer" },
  { value: "Blockchain Developer", label: "Blockchain Developer" },
  { value: "BUSINESS SYSTEMS ANALYST", label: "BUSINESS SYSTEMS ANALYST" },
  { value: "C# Developer", label: "C# Developer" },
  { value: "Chef InSpec Engineer", label: "Chef InSpec Engineer" },
  { value: "Cloud administrator", label: "Cloud administrator" },
  { value: "Cloud ARCHITECT", label: "Cloud ARCHITECT" },
  { value: "Cloud automation engineer", label: "Cloud automation engineer" },
  { value: "Cloud engineer", label: "Cloud engineer" },
  { value: "Cloud network engineer", label: "Cloud network engineer" },
  { value: "Cloud Security Engineer", label: "Cloud Security Engineer" },
  { value: "CNC Programmer", label: "CNC Programmer" },
  { value: "Coder", label: "Coder" },
  { value: "COMPUTER GRAPHICS ANIMATOR", label: "COMPUTER GRAPHICS ANIMATOR" },
  { value: "Computer Hardware Engineer", label: "Computer Hardware Engineer" },
  { value: "Computer Network Architect", label: "Computer Network Architect" },
  { value: "Computer Programmer", label: "Computer Programmer" },
  {
    value: "Computer Research Scientist",
    label: "Computer Research Scientist",
  },
  { value: "Computer Systems Analyst", label: "Computer Systems Analyst" },
  { value: "Confluence Engineer", label: "Confluence Engineer" },
  { value: "Consul Engineer", label: "Consul Engineer" },
  { value: "Coverage.py Engineer", label: "Coverage.py Engineer" },
  { value: "DATA ANALYST", label: "DATA ANALYST" },
  { value: "Data Analyst", label: "Data Analyst" },
  { value: "DATA ARCHITECT", label: "DATA ARCHITECT" },
  { value: "Data Engineer", label: "Data Engineer" },
  { value: "DATA MODELER", label: "DATA MODELER" },
  { value: "Data Scientist", label: "Data Scientist" },
  { value: "Database Administrator", label: "Database Administrator" },
  { value: "Datadog Engineer", label: "Datadog Engineer" },
  { value: "Developer", label: "Developer" },
  { value: "DevOps Engineer", label: "DevOps Engineer" },
  { value: "DevOps Engineer", label: "DevOps Engineer" },
  { value: "DEVOPS MANAGER", label: "DEVOPS MANAGER" },
  { value: "DevSecOps Architect", label: "DevSecOps Architect" },
  { value: "DevSecOps Engineer", label: "DevSecOps Engineer" },
  { value: "Director of Engineering", label: "Director of Engineering" },
  { value: "Docker Engineer", label: "Docker Engineer" },
  { value: "ELK Engineer", label: "ELK Engineer" },
  { value: "Embedded Software Engineer", label: "Embedded Software Engineer" },
  { value: "Entry Level Developer", label: "Entry Level Developer" },
  {
    value: "Entry Level Network Engineer",
    label: "Entry Level Network Engineer",
  },
  { value: "Entry Level Programmer", label: "Entry Level Programmer" },
  {
    value: "Entry Level Software Developer",
    label: "Entry Level Software Developer",
  },
  {
    value: "Entry Level Software Engineer",
    label: "Entry Level Software Engineer",
  },
  { value: "Entry Level Web Developer", label: "Entry Level Web Developer" },
  { value: "Envoy Engineer", label: "Envoy Engineer" },
  { value: "Falco Engineer", label: "Falco Engineer" },
  { value: "FluentD Engineer", label: "FluentD Engineer" },
  { value: "Fortify Engineer", label: "Fortify Engineer" },
  { value: "FRAMEWORKS SPECIALIST", label: "FRAMEWORKS SPECIALIST" },
  { value: "Front End Developer", label: "Front End Developer" },
  { value: "Front End Web Developer", label: "Front End Web Developer" },
  { value: "FRONT-END DESIGNER", label: "FRONT-END DESIGNER" },
  { value: "FRONT-END DEVELOPER", label: "FRONT-END DEVELOPER" },
  { value: "Full Stack Developer", label: "Full Stack Developer" },
  {
    value: "Full Stack JAVA Developer/Programmer/Engineer",
    label: "Full Stack JAVA Developer/Programmer/Engineer",
  },
  {
    value: "Full Stack Python Developer/Programmer/Engineer",
    label: "Full Stack Python Developer/Programmer/Engineer",
  },
  { value: "FULL-STACK DEVELOPER", label: "FULL-STACK DEVELOPER" },
  { value: "Game Developer", label: "Game Developer" },
  { value: "GAME DEVELOPER", label: "GAME DEVELOPER" },
  { value: "GCP DevOps Engineer", label: "GCP DevOps Engineer" },
  { value: "Gerrit Engineer", label: "Gerrit Engineer" },
  { value: "Git Engineer", label: "Git Engineer" },
  { value: "Github Engineer", label: "Github Engineer" },
  { value: "GitLab Engineer", label: "GitLab Engineer" },
  { value: "GitLab Engineer", label: "GitLab Engineer" },
  { value: "Gradle Engineer", label: "Gradle Engineer" },
  { value: "Grafana Engineer", label: "Grafana Engineer" },
  { value: "Groovy Engineer", label: "Groovy Engineer" },
  { value: "INFORMATION ARCHITECT", label: "INFORMATION ARCHITECT" },
  {
    value: "Information Security Analyst",
    label: "Information Security Analyst",
  },
  { value: "INTERACTION DESIGNER", label: "INTERACTION DESIGNER" },
  { value: "IOS Developer", label: "IOS Developer" },
  { value: "Istio Engineer", label: "Istio Engineer" },
  { value: "IT Manager", label: "IT Manager" },
  { value: "JaCoCO Engineer", label: "JaCoCO Engineer" },
  { value: "Java Developer", label: "Java Developer" },
  { value: "Java Developer", label: "Java Developer" },
  { value: "JavaScript Developer", label: "JavaScript Developer" },
  { value: "Jenkins Engineer", label: "Jenkins Engineer" },
  { value: "JIRA Engineer", label: "JIRA Engineer" },
  { value: "Jr Developer", label: "Jr Developer" },
  { value: "Junior Developer", label: "Junior Developer" },
  { value: "Junior Front End Developer", label: "Junior Front End Developer" },
  { value: "Junior IOS Developer", label: "Junior IOS Developer" },
  { value: "Junior Software Developer", label: "Junior Software Developer" },
  { value: "Junior Software Engineer", label: "Junior Software Engineer" },
  { value: "Junior Web Developer", label: "Junior Web Developer" },
  { value: "JUnit Engineer", label: "JUnit Engineer" },
  { value: "kubernetes Administrator", label: "kubernetes Administrator" },
  { value: "Kubernetes Engineer", label: "Kubernetes Engineer" },
  { value: "Machine Learning Engineer", label: "Machine Learning Engineer" },
  { value: "MAVEN Engineer", label: "MAVEN Engineer" },
  {
    value: "Micro services / API Lead Designer",
    label: "Micro services / API Lead Designer",
  },
  { value: "MOBILE APP DEVELOPER", label: "MOBILE APP DEVELOPER" },
  {
    value: "Mobile Application Developer",
    label: "Mobile Application Developer",
  },
  { value: "MOBILE DEVELOPER", label: "MOBILE DEVELOPER" },
  { value: "Mulesoft Developer", label: "Mulesoft Developer" },
  { value: "Nagios Engineer", label: "Nagios Engineer" },
  {
    value: "Network and Systems Administrator",
    label: "Network and Systems Administrator",
  },
  { value: "Network Engineer", label: "Network Engineer" },
  { value: "New Grad Software Engineer", label: "New Grad Software Engineer" },
  { value: "New Relic Engineer", label: "New Relic Engineer" },
  { value: "Nexus Engineer", label: "Nexus Engineer" },
  { value: "Nomad Engineer", label: "Nomad Engineer" },
  { value: "Notary Engineer", label: "Notary Engineer" },
  { value: "Octopus Deploy Engineer", label: "Octopus Deploy Engineer" },
  { value: "OpenShift Engineer", label: "OpenShift Engineer" },
  { value: "OpenStack Engineer", label: "OpenStack Engineer" },
  { value: "Oracle Developer", label: "Oracle Developer" },
  { value: "Oracle SQL Developer", label: "Oracle SQL Developer" },
  { value: "Packer Engineer", label: "Packer Engineer" },
  { value: "PHP Developer", label: "PHP Developer" },
  { value: "PHP Developer", label: "PHP Developer" },
  { value: "Powershell Engineer", label: "Powershell Engineer" },
  { value: "PRODUCT MANAGER", label: "PRODUCT MANAGER" },
  { value: "Programmer", label: "Programmer" },
  { value: "Programmer Analyst", label: "Programmer Analyst" },
  { value: "Prometheus Engineer", label: "Prometheus Engineer" },
  { value: "Puppet Engineer", label: "Puppet Engineer" },
  { value: "PyTest Engineer", label: "PyTest Engineer" },
  { value: "Python Developer", label: "Python Developer" },
  { value: "PYTHON DEVELOPER", label: "PYTHON DEVELOPER" },
  { value: "Python Developer", label: "Python Developer" },
  {
    value: "QA (QUALITY ASSURANCE) SPECIALIST",
    label: "QA (QUALITY ASSURANCE) SPECIALIST",
  },
  { value: "QA Engineer", label: "QA Engineer" },
  { value: "React Developer", label: "React Developer" },
  { value: "Robotics Engineer", label: "Robotics Engineer" },
  { value: "RUBY ON RAILS DEVELOPER", label: "RUBY ON RAILS DEVELOPER" },
  { value: "Salesforce Developer", label: "Salesforce Developer" },
  { value: "Search Engine Optimization", label: "Search Engine Optimization" },
  { value: "SECURITY SPECIALIST", label: "SECURITY SPECIALIST" },
  { value: "Selenium Engineer", label: "Selenium Engineer" },
  {
    value: "Senior Ansible Development Engineer",
    label: "Senior Ansible Development Engineer",
  },
  { value: "Senior Cloud Architect", label: "Senior Cloud Architect" },
  { value: "Senior DevOps Architect", label: "Senior DevOps Architect" },
  { value: "Senior DevOps Engineer", label: "Senior DevOps Engineer" },
  { value: "Senior DevSecOps Architect", label: "Senior DevSecOps Architect" },
  { value: "Senior DevSecOps Engineer", label: "Senior DevSecOps Engineer" },
  { value: "Senior SRE Architect", label: "Senior SRE Architect" },
  { value: "Senior SRE Engineer", label: "Senior SRE Engineer" },
  { value: "Sharepoint Developer", label: "Sharepoint Developer" },
  { value: "Software Developer", label: "Software Developer" },
  { value: "SOFTWARE DEVELOPERS", label: "SOFTWARE DEVELOPERS" },
  { value: "Software Engineer", label: "Software Engineer" },
  { value: "Software Engineer", label: "Software Engineer" },
  { value: "SonarQube Engineer", label: "SonarQube Engineer" },
  { value: "Splunk Engineer", label: "Splunk Engineer" },
  { value: "SQL Developer", label: "SQL Developer" },
  { value: "SRE Architect", label: "SRE Architect" },
  { value: "SRE Engineer", label: "SRE Engineer" },
  { value: "SYSTEMS ADMINISTRATOR", label: "SYSTEMS ADMINISTRATOR" },
  { value: "SYSTEMS ENGINEER", label: "SYSTEMS ENGINEER" },
  { value: "TeamCity Engineer", label: "TeamCity Engineer" },
  { value: "Tech Sales Engineer", label: "Tech Sales Engineer" },
  { value: "TECHNICAL ACCOUNT MANAGER", label: "TECHNICAL ACCOUNT MANAGER" },
  { value: "TECHNICAL LEAD", label: "TECHNICAL LEAD" },
  { value: "Terraform Engineer", label: "Terraform Engineer" },
  { value: "TFS Engineer", label: "TFS Engineer" },
  { value: "Twistkock Engineer", label: "Twistkock Engineer" },
  { value: "UDeploy Engineer", label: "UDeploy Engineer" },
  { value: "UI DESIGNER", label: "UI DESIGNER" },
  { value: "UI Developer", label: "UI Developer" },
  { value: "Unity Developer", label: "Unity Developer" },
  { value: "UX DESIGNER", label: "UX DESIGNER" },
  { value: "Vault Engineer", label: "Vault Engineer" },
  {
    value: "Web Designer (UI/UX Designer)",
    label: "Web Designer (UI/UX Designer)",
  },
  { value: "Web Developer", label: "Web Developer" },
  { value: "Web Developer", label: "Web Developer" },
  { value: "WordPress Developer", label: "WordPress Developer" },
  { value: "WORDPRESS DEVELOPER", label: "WORDPRESS DEVELOPER" },
  { value: "XL Deploy Engineer", label: "XL Deploy Engineer" },
  { value: "Zabbix Engineer", label: "Zabbix Engineer" },
];

const Salaries = [
  {
    value: "Any",
    label: "Any",
  },
  {
    value: "< 30000k",
    label: "< 30000k",
  },
  {
    value: "< 50000k",
    label: "< 50000k",
  },
  {
    value: "< 80000k",
    label: "< 80000k",
  },
  {
    value: "< 100000k",
    label: "< 100000k",
  },
];

const SalaryType = [
  {
    value: "Hourly",
    label: "Hourly",
  },
  {
    value: "Monthly",
    label: "Monthly",
  },
  {
    value: "Yearly",
    label: "Yearly",
  },
];

const skillset = [
  {
    value: "Javascript",
    label: "Javascript",
  },
  {
    value: "React JS",
    label: "React JS",
  },
  {
    value: "Next JS",
    label: "Next JS",
  },
];

// const jobLocation = [{
//     "value":"San Francisco",
//     "label":"San Francisco"
// }]

const experienceLevel = [
  {
    value: "Any experience",
    label: "Any experience",
  },
  {
    value: "Internship",
    label: "Internship",
  },
  {
    value: "Work remotely",
    label: "Work remotely",
  },
];

const employmenttype = [
  {
    value: "Any",
    label: "Any",
  },
  {
    value: "Full time",
    label: "Full time",
  },
  {
    value: "Temporary",
    label: "Temporary",
  },
  {
    value: "Part time",
    label: "Part time",
  },
];

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   username: "",
    // },
  });

  const [set, setset] = useState<boolean>(false);
  const { toast } = useToast();

  
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setset(!set);
    console.log(set);
    console.log(values);
  }

  return (
    <>
      <Card className={cn(" mt-16  ml-28 mr-28 mb-12 ")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            {/* <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <>
              <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
              <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
              This is your public display name.
              </FormDescription>
              <FormMessage />
              </FormItem>
              </>
            )}
            /> */}
            <div className={cn("flex justify-around mt-8 ")}>
              <div className={cn(" w-[570px] ml-6 flex flex-col gap-y-7 ")}>
                <FormField
                  control={form.control}
                  name="JobTitle"
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
                          <Command className={cn(' h-[228px]')}>
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
                                      form.setValue("JobTitle", JobTitle.value);
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
                  name="joblocation"
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
                  name="companyname"
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
                  name="experiencelevel"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Experience Level</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? experienceLevel.find(
                                    (exp) => exp.value === field.value
                                  )?.label
                                : "Select experience level"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            {/* <CommandInput
                              placeholder="Search framework..."
                              className="h-9"
                            /> */}
                            {/* <CommandEmpty>No framework found.</CommandEmpty> */}
                            <CommandGroup>
                              <CommandList>
                                {experienceLevel.map((JobTitle) => (
                                  <CommandItem
                                    value={JobTitle.label}
                                    key={JobTitle.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "experiencelevel",
                                        JobTitle.value
                                      );
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
                        This is the experience level that will be used in the
                        dashboard.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div
                className={cn(" w-[570px]  mr-6 flex flex-col gap-y-[35px]")}
              >
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Salary</FormLabel>
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
                                ? Salaries.find(
                                    (salary) => salary.value === field.value
                                  )?.label
                                : "Select salary"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            {/* <CommandInput
                              placeholder="Search framework..."
                              className="h-9"
                            />
                            <CommandEmpty>No framework found.</CommandEmpty> */}
                            <CommandGroup>
                              <CommandList>
                                {Salaries.map((salary) => (
                                  <CommandItem
                                    value={salary.label}
                                    key={salary.value}
                                    onSelect={() => {
                                      form.setValue("salary", salary.value);
                                    }}
                                  >
                                    {salary.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        salary.value === field.value
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
                        This is the salary that will be used in the dashboard.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salarytype"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Salary Type</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                " w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? SalaryType.find(
                                    (salarytype) =>
                                      salarytype.value === field.value
                                  )?.label
                                : "Select salary type"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            {/* <CommandInput
                              placeholder="Search framework..."
                              className="h-9"
                            />
                            <CommandEmpty>No framework found.</CommandEmpty> */}
                            <CommandGroup>
                              <CommandList>
                                {SalaryType.map((salarytype) => (
                                  <CommandItem
                                    value={salarytype.label}
                                    key={salarytype.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "salarytype",
                                        salarytype.value
                                      );
                                    }}
                                  >
                                    {salarytype.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        salarytype.value === field.value
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
                        This is the salary type that will be used in the
                        dashboard.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skillset"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>SkillSet</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                " w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? skillset.find(
                                    (exp) => exp.value === field.value
                                  )?.label
                                : "Select skillset"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            {/* <CommandInput
                              placeholder="Search framework..."
                              className="h-9"
                            />
                            <CommandEmpty>No framework found.</CommandEmpty> */}
                            <CommandGroup>
                              <CommandList>
                                {skillset.map((JobTitle) => (
                                  <CommandItem
                                    value={JobTitle.label}
                                    key={JobTitle.value}
                                    onSelect={() => {
                                      form.setValue("skillset", JobTitle.value);
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
                        This is the skillset that will be used in the dashboard.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employmenttype"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Employment Type</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? employmenttype.find(
                                    (exp) => exp.value === field.value
                                  )?.label
                                : "Select employment type"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            {/* <CommandInput
                              placeholder="Search framework..."
                              className="h-9"
                            />
                            <CommandEmpty>No framework found.</CommandEmpty> */}
                            <CommandGroup>
                              <CommandList>
                                {employmenttype.map((JobTitle) => (
                                  <CommandItem
                                    value={JobTitle.label}
                                    key={JobTitle.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "employmenttype",
                                        JobTitle.value
                                      );
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
                        This is the employment type that will be used in the
                        dashboard.
                      </FormDescription>
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
                name="companylogo"
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
                          required
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
