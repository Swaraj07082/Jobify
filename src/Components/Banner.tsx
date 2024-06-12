import React, { SetStateAction, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
// import BannerProps from "./types/BannerProps";
// import { BannerProps } from "./types/BannerProps";
// import { JobsArray } from "./types/BannerProps";
import { Jobs } from "./types/BannerProps";
// import { query } from "./types/BannerProps";
import { BannerProps } from "./types/BannerProps";
import { FaPen } from "react-icons/fa";
import { MaskContainer } from "./ui/svg-mask-effect";

export default function Banner({
  Jobs,
  query,
  setquery,
  location,
  setlocation,
}: BannerProps) {
  // console.log(Jobs)

  const onsetquery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setquery(e.target.value);
  };

  const onsetlocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlocation(e.target.value);
  };

  //   console.log(query);

  return (
    <div
      className={cn(
        "    ml-48 mr-48 mt-20  text-left max-lg:ml-16 max-lg:mr-16"
      )}
    >
      <div className={cn("text-[54px] text-center max-[375px]:text-[48px] max-sm:leading-[52px] max-sm:mb-8")}>
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
        {/* <Button className={cn(" w-44 max-md:w-auto")}>Search</Button> */}
      </div>
    </div>
  );
}
