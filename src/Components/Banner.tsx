import { cn } from "@/lib/utils";
import React from "react";
import { Input } from "./ui/input";
import { BannerProps } from "./types/BannerProps";

export default function Banner({
  Jobs,
  query,
  setquery,
  location,
  setlocation,
}: BannerProps) {
  const onsetquery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setquery(e.target.value);
  };

  const onsetlocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlocation(e.target.value);
  };

  return (
    <div
      className={cn(
        "    ml-48 mr-48 mt-20  text-left max-lg:ml-16 max-lg:mr-16"
      )}
    >
      <div
        className={cn(
          "text-[54px] text-center max-[375px]:text-[48px] max-sm:leading-[52px] max-sm:mb-8"
        )}
      >
        Find your <p className=" inline text-[#0066FF]">new job</p> today
      </div>

      <div className={cn(" text-center text-xl")}>
        Thousands of jobs in computer , engineering and technology sectors are
        waiting for you.
      </div>

      <div className={cn("flex gap-x-1 mt-8 max-md:flex-col max-md:gap-y-3")}>
        <Input
          className={cn(" w-[800px] max-md:w-auto")}
          value={query}
          onChange={onsetquery}
          placeholder="✏️ What position are you looking for?"
          type="text"
          shadow={true}
        />
        <Input
          className={cn("w-[600px] max-md:w-auto")}
          placeholder="📍 Location"
          value={location}
          onChange={onsetlocation}
          type="text"
          shadow={true}
        />
      </div>
    </div>
  );
}
