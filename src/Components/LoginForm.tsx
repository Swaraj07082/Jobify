"use client";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

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

import { signIn } from "next-auth/react";
import { useToast  } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "../Components/ui/toast";

const formSchema = z.object({
  email: z.string().email().min(1, {
    message: "This field has to be filled.",
  }),
  password: z.string().min(1, {
    message: "This field has to be filled.",
  }),
});

export default function LoginForm() {
  const [ViewPass, SetViewPass] = useState<Boolean>(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { reset } = form;

  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const LoginData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    // console.log(LoginData)

    if (LoginData?.error) {
      // console.log(LoginData.error);
      toast({
        duration : 2100 ,
        variant : 'destructive',
        title:
          "Either the email or password you are trying to log in with are incorrect.",
      });
    } else {
      router.push("/");
      toast({
        duration : 2100 ,
        title: "Logged In successfully",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-full max-w-sm max-sm:w-80 max-[375px]:w-72">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                This is your public display name.
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
              <Input id="password" type="password" required /> */}
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
                          className=" absolute right-3 "
                        />
                      ) : (
                        <FaEyeSlash
                          onClick={() => {
                            SetViewPass(!ViewPass);
                          }}
                          className=" absolute right-3 "
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
                This is your public display name.
              </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Log in
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
