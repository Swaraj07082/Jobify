"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "../Components/ui/menubar";
import { Button } from "./ui/button";

import Link from "next/link";
import icon from "../../public/burgermenu.svg";

import Image from "next/image";

import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import jobify from "../../public/work.png";
import DarkHamburgerMenu from "./DarkHamburgerMenu";
import { ThemeToggle } from "./ThemeToggle";
import ToggleMenu from "./ToggleMenu";
import { useToast } from "./ui/use-toast";

export default function Navbar() {
  const [Open, SetOpen] = useState<boolean>(false);

  const OnSetOpen = () => {
    SetOpen(!Open);
  };

  const { status } = useSession();
  const { toast } = useToast();

  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Menubar
        className={cn(
          "h-20 flex justify-around   max-lg:justify-between max-lg:pl-12 max-lg:pr-12 shadow-lg "
        )}
      >
        <div className={cn("flex gap-x-6 ")}>
          <MenubarMenu>
            <Link className="flex items-center gap-1" href={"/"}>
              <Image
                src={jobify}
                width={45}
                height={45}
                className="font-bold"
                alt=""
              />
              <div className="flex text-xl font-bold ">JOBIFY</div>
            </Link>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger
              className={clsx(" max-lg:hidden ", {
                effect: theme == "light",
              })}
            >
              <Link href={"/"}>Start a search</Link>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger
              className={clsx(" max-lg:hidden ", {
                effect: theme == "light",
              })}
            >
              <Link
                href={status === "authenticated" ? "/my-jobs" : "/register"}
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
              className={clsx(" max-lg:hidden ", {
                effect: theme == "light",
              })}
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
              <Link
                className=""
                href={status === "authenticated" ? "/salary-est" : "/register"}
              >
                Salary Estimate
              </Link>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger
              className={clsx(" max-lg:hidden ", {
                effect: theme == "light",
              })}
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
              <Link
                className=""
                href={status === "authenticated" ? "/post-job" : "/register"}
              >
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
              className="max-lg:hidden box"
              variant={theme === "light" ? "light" : "default"}
              onClick={() => {
                signOut();
                toast({
                  duration: 2500,
                  title: "Logged Out",
                });
              }}
            >
              Log Out
            </Button>
          )}
          <div className=" max-lg:mt-2">
            <ThemeToggle />
          </div>
          {theme === "light" ? (
            <Image
              onClick={OnSetOpen}
              className=" lg:hidden "
              src={icon}
              height={50}
              width={50}
              alt="image not found"
            />
          ) : (
            <Link href={""} className=" lg:hidden " onClick={OnSetOpen}>
              <DarkHamburgerMenu />
            </Link>
          )}
        </div>
      </Menubar>
      {Open && <ToggleMenu status={status} />}
    </>
  );
}
