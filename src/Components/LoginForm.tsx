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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";

import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../Components/ui/form";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

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
    const LoginData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (LoginData?.error) {
      reset();

      toast({
        duration: 2100,
        variant: "destructive",
        title:
          "Either the email or password you are trying to log in with are incorrect.",
      });
    } else {
      reset();

      router.push("/");
      toast({
        duration: 2100,
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
                          placeholder="Password"
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
