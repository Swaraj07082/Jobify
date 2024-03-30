"use client";
import Banner from "@/Components/Banner";
import LandingPage from "@/Components/LandingPage";
// import BannerProps from "@/Components/types/BannerProps";

import React, { useEffect, useState } from "react";

import { Jobs } from "@/Components/types/BannerProps";
import { JobsArray } from "@/Components/types/BannerProps";
import Main from "@/Components/Main";

export default function Home() {
  const [Jobs, SetJobs] = useState<Jobs[]>([]);

  useEffect(() => {
    const getdata = async () => {
      const data = await fetch("jobs.json");
      const parsedata = await data.json();
      console.log(parsedata);
      SetJobs(parsedata);
    };
    getdata();
  }, []);

  console.log(Jobs);

  return (
    <>
      {/* <LandingPage/> */}
      <Banner Jobs={Jobs} />
      <Main/>
    </>
  );
}
