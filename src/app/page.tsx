"use client";
import Banner from "@/Components/Banner";
import LandingPage from "@/Components/LandingPage";
// import BannerProps from "@/Components/types/BannerProps";

import React, { useEffect, useState } from "react";

import { Jobs } from "@/Components/types/BannerProps";

import Main from "@/Components/Main";
import { StateContextProvider } from "@/Context/StateContextProvider";
import { Pagination } from "@/Components/ui/pagination";
import { PaginationDemo } from "@/Components/Pagination";

export default function Home() {
  useEffect(() => {
    const getdata = async () => {
      const data = await fetch("/api/demo");
      const parsedata = await data.json();
      console.log(parsedata);
      SetJobs(parsedata);
    };
    getdata();
  }, []);

  const [Jobs, SetJobs] = useState<Jobs[]>([]);
  const [query, setquery] = useState<string>("");
  const [location, setlocation] = useState<string>("");
  const [Page, setPage] = useState<number>(1)

  console.log(location);

  // console.log(Jobs);



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
        <Main Jobs={Jobs} query={query} setquery={setquery}  location={location}
          setlocation={setlocation} />
          <PaginationDemo Page={Page} setPage={setPage} NO_OF_JOBS ={Jobs.length}/>

      </StateContextProvider>
    </>
  );
}
