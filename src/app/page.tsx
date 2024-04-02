"use client";
import Banner from "@/Components/Banner";
import LandingPage from "@/Components/LandingPage";
// import BannerProps from "@/Components/types/BannerProps";

import React, { useEffect, useState } from "react";

import { Jobs } from "@/Components/types/BannerProps";

import Main from "@/Components/Main";
import { StateContextProvider } from "@/Context/StateContextProvider";

export default function Home() {
  useEffect(() => {
    const getdata = async () => {
      const data = await fetch("jobs.json");
      const parsedata = await data.json();
      // console.log(parsedata);
      SetJobs(parsedata);
    };
    getdata();
  }, []);

  const [Jobs, SetJobs] = useState<Jobs[]>([]);
  const [query, setquery] = useState<string>("");
  const [location, setlocation] = useState<string>("");

  console.log(location);

  // console.log(Jobs);

  // console.log(query.toLowerCase().split(" ").join(""))
  const filtereddata = Jobs.filter(
    (item) =>
      // item.jobTitle.toLocaleLowerCase().indexOf(query.toLowerCase()) !== -1
      item.jobTitle
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(query.toLowerCase().split(" ").join("")) &&
      item.jobLocation
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(location.toLowerCase().split(" ").join(""))
  );
  console.log(filtereddata);

  return (
    <>
      {/* <LandingPage/> */}
      <StateContextProvider>
        <Banner
          Jobs={Jobs}
          query={query}
          setquery={setquery}
          location={location}
          setlocation={setlocation}
        />
        <Main Jobs={Jobs} filtereddata={filtereddata} />
      </StateContextProvider>
    </>
  );
}
