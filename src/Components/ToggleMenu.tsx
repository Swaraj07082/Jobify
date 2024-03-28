import { cn } from "@/lib/utils";
import React from "react";

export default function ToggleMenu() {
  return (
    <div className={cn(" h-56 m-4 bg-black flex flex-col justify-center gap-y-3")}>
      <div className={cn("text-white ml-3")}>Start a Search</div>

      <div className={cn("text-white ml-3")}>My Jobs</div>

      <div className={cn("text-white ml-3")}>Salary Estimate</div>

      <div className={cn("text-white ml-3")}>Post a Job</div>

      <div className={cn("text-white ml-3")}>Login</div>

      <div className={cn("text-white ml-3")}>Register</div>

    </div>
  );
}
