"use client";
import Banner from "@/Components/Banner";
import LandingPage from "@/Components/LandingPage";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [Jobs, SetJobs] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      const data = await fetch("jobs.json");
      const parsedata = await data.json();
      console.log(parsedata);
      SetJobs(parsedata);
    };
    getdata()
  }, []);

  console.log("erf");

  return (
    <>
      {/* <LandingPage/> */}
      <Banner />
    </>
  );
}
