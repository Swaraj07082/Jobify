import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";

export default function ToggleMenu() {
  return (
    <Card className={cn(" h-56 m-4 flex flex-col justify-center gap-y-3")}>
      <div className={cn(" ml-3")}>
        <Link href={"/"}>Start a Search</Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link href={"/my-jobs"}>My Jobs</Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link href={"/salary-est"}>Salary Estimate</Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link href={"/post-job"}>Post a Job</Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link href={"/login"}>Login</Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link href={"/register"}>Register</Link>
      </div>
    </Card>
  );
}
