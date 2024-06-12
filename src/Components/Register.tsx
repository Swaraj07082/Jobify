"use client";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Button } from "../Components/ui/button";
import { useToast } from "./ui/use-toast";
import { date, z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../Components/ui/form";
import { useState } from "react";
import { useRouter } from "next/navigation";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const formSchema = z.object({
  username: z
    .string()
    .refine((value) => value.length > 0, {
      message: "Please enter your username",
    })
    .refine((value) => value.length >= 2, {
      message: "Minimum 2 characters required",
    }),
  email: z.string().email().min(1, {
    message: "This field has to be filled.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must be at most 32 characters long" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must contain at least one number",
    })
    .refine((value) => /[^A-Za-z0-9]/.test(value), {
      message: "Password must contain at least one special character",
    }),
});

export function Register() {
  const router = useRouter();
  const [ViewPass, SetViewPass] = useState<Boolean>(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const { reset } = form;
  const d = new Date();
  function getOrdinalNum(n: number) {
    return (
      n +
      (n > 0
        ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
        : "")
    );
  }
  function convertMillisecondsToIST(milliseconds: number): string {
    // Create a Date object from milliseconds
    const date = new Date(milliseconds);

    // Set timezone to IST (Indian Standard Time)
    const ISTOptions: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      hour12: true, // Use 12-hour format
      hour: "numeric", // Display hours
      minute: "numeric", // Display minutes
      second: "numeric", // Display seconds
    };

    // Format the time in IST with am/pm
    const ISTTime: string = date.toLocaleTimeString("en-IN", ISTOptions);

    return ISTTime;
  }

  // console.log(convertMillisecondsToIST(1716626085488))

  // console.log(
  //   `${days[d.getDay()]} , ${getOrdinalNum(d.getDate())} ${
  //     months[d.getMonth()]
  //   } at ${convertMillisecondsToIST(d.getTime())}`
  // );

  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    // const data = await response.json()
    // console.log(data)
    if (response.ok) {
      // alert("Submitted");
      toast({
        title: "Registered",
        description: `${days[d.getDay()]} , ${getOrdinalNum(d.getDate())} ${
          months[d.getMonth()]
        } at ${convertMillisecondsToIST(d.getTime())}`,
      });
      reset();
      router.push("/login");
    } else {
      // alert("Error");
      toast({
        duration: 2100,
        variant: "destructive",
        title:
          "Either the email or username you are trying to register with are already taken.",
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="mx-auto max-w-sm  mt-16 max-sm:w-80 max-[375px]:w-72">
            <CardHeader>
              <CardTitle className="text-xl">Register</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {/* <div className="grid grid-cols-2 gap-4"> */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Username..." {...field} />
                        </FormControl>
                        {/* <FormDescription>
                          This is your public display name.
                          </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <Label htmlFor="username">Username</Label> */}
                  {/* <Input id="username" placeholder="Max" required /> */}
                </div>
                {/* <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
              </div> */}
                {/* </div> */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email..." {...field} />
                        </FormControl>
                        {/* <FormDescription>
                          This is your public  name.
                          </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <Label htmlFor="email">Email</Label>
              <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              /> */}
                </div>
                <div className="grid gap-2">
                  {/* <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" /> */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="flex items-center relative ">
                          {ViewPass ? (
                            <FaEye
                              onClick={() => {
                                SetViewPass(!ViewPass);
                              }}
                              className="absolute right-3"
                            />
                          ) : (
                            <FaEyeSlash
                              onClick={() => {
                                SetViewPass(!ViewPass);
                              }}
                              className="absolute right-3"
                            />
                          )}

                          <FormControl>
                            <Input
                              placeholder="password..."
                              {...field}
                              type={ViewPass ? "password" : "text"}
                            />
                          </FormControl>
                        </div>

                        {/* <FormDescription>
                          This is your public  name.
                          </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
                {/* <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button> */}
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
}
