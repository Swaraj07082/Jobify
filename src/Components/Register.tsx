"use client";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../Components/ui/form";
import { useToast } from "./ui/use-toast";

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
    const date = new Date(milliseconds);

    const ISTOptions: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const ISTTime: string = date.toLocaleTimeString("en-IN", ISTOptions);

    return ISTTime;
  }

  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      toast({
        title: "Registered",
        description: `${days[d.getDay()]} , ${getOrdinalNum(d.getDate())} ${
          months[d.getMonth()]
        } at ${convertMillisecondsToIST(d.getTime())}`,
      });
      reset();
      router.push("/login");
    } else {
      reset();
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

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
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

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
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
