import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export default function ToggleMenu() {
  return (
    <Card className={cn(" h-56 m-4 flex flex-col justify-center gap-y-3 shadow-lg ")}>
      <div className={cn(" ml-3")}>
        <Link href={"/"} className=" hover:text-[#0066FF]">Start a Search</Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link href={"/my-jobs"} className=" hover:text-[#0066FF]">
          My Jobs
        </Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link className=" hover:text-[#0066FF]" href={"/salary-est"}>
          Salary Estimate
        </Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link href={"/post-job"} className=" hover:text-[#0066FF]">
          Post a Job
        </Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link href={"/login"} className=" hover:text-[#0066FF]">
          Login
        </Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link href={"/register"} className=" hover:text-[#0066FF]">
          Register
        </Link>
      </div>
    </Card>
  );
}
