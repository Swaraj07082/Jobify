"use client";
import React, { MouseEventHandler, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../Components/ui/menubar";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

import Link from "next/link";
import icon from "../../public/burgermenu.svg";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../Components/ui/select";

import Image from "next/image";

import jobify from "../../public/Jobify.jpg";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import ToggleMenu from "./ToggleMenu";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [Open, SetOpen] = useState<boolean>(false);

  const OnSetOpen = () => {
    SetOpen(!Open);
  };

  // console.log(Open);

  const { status } = useSession();
  const { toast } = useToast();
  return (
    <>
      <Menubar
        className={cn(
          "h-20 flex justify-around  max-lg:justify-between max-lg:pl-12 max-lg:pr-12 "
        )}
      >
        <div className={cn("flex gap-x-6 ")}>
          <MenubarMenu>
            <Image src={jobify} width={100} height={100} alt="" />
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className=" max-lg:hidden">
              <Link href={"/"}>Start a search</Link>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className=" max-lg:hidden">
              <Link
                href={status === "authenticated" ? "my-jobs" : "register"}
                onClick={() => {
                  status === "unauthenticated" ? (
                    toast({
                      duration: 2100,
                      title: "You need to Register first",
                    })
                  ) : (
                    <></>
                  );
                }}
              >
                My Jobs
              </Link>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger
              className=" max-lg:hidden"
              onClick={() => {
                status === "unauthenticated" ? (
                  toast({
                    duration: 2100,
                    title: "You need to Register first",
                  })
                ) : (
                  <></>
                );
              }}
            >
              <Link href={'/salary-est'}>
              Salary Estimate
              </Link>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger
              className=" max-lg:hidden"
              onClick={() => {
                status === "unauthenticated" ? (
                  toast({
                    duration: 2100,
                    title: "You need to Register first",
                  })
                ) : (
                  <></>
                );
              }}
            >
              <Link href={status === "authenticated" ? "post-job" : "register"}>
                Post A Job
              </Link>
            </MenubarTrigger>
          </MenubarMenu>
        </div>

        <div className={cn("flex gap-x-2")}>
          {status === "unauthenticated" ? (
            <>
              <Button className=" max-lg:hidden">
                <Link href={"/login"}>Login</Link>
              </Button>
              <Button className=" max-lg:hidden">
                <Link href={"/register"}>Register</Link>
              </Button>
            </>
          ) : (
            <Button
              className=" max-lg:hidden"
              onClick={() => {
                signOut();
                toast({
                  duration: 2500,
                  title: "Logged Out",
                });
              }}
            >
              LogOut
            </Button>
          )}
<ThemeToggle/>
          <Image
            onClick={OnSetOpen}
            className=" lg:hidden "
            src={icon}
            height={50}
            width={50}
            alt="image not found"
          />
        </div>
      </Menubar>
      {Open && <ToggleMenu />}
    </>
  );
}
