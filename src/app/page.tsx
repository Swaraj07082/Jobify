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
import { useSearchParams } from "next/navigation";
import { number } from "zod";
import { count } from "console";
import { useSession } from "next-auth/react";
import { ThreeDots } from "react-loader-spinner";

export default function Home() {
  const searchParams = useSearchParams();

  let page = parseInt(searchParams.get("page") || "1");

  const [Jobs, SetJobs] = useState<Jobs[]>([]);
  const [query, setquery] = useState<string>("");
  const [location, setlocation] = useState<string>("");
  const [jobCount, setJobCount] = useState<number>(0);
  const [isLoading, setisLoading] = useState<boolean>(false);
  // console.log(typeof(page))
  useEffect(() => {
    setisLoading(true);
    const getdata = async (page: number) => {
      const data = await fetch(`/api/demo?page=${page}`);
      const { idk, count } = await data.json();
      setJobCount(count);
      console.log(idk);
      SetJobs(idk);
      setisLoading(false);
    };
    getdata(page);
  }, [page]);

  // const [Page, setPage] = useState<number>(1)

  console.log(location);

  // console.log(Jobs);

  // const { status } = useSession();

  return (
    <>
      {/* <LandingPage/> */}

      {isLoading ? (
        <div className=" w-screen h-screen bg-[#bfbebe42] overflow-hidden flex justify-center items-center">
          <ThreeDots
            visible={true}
            height="80"
            width="150"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <StateContextProvider>
            <Banner
              Jobs={Jobs}
              query={query}
              setquery={setquery}
              location={location}
              setlocation={setlocation}
            />
            <Main
              Jobs={Jobs}
              query={query}
              setquery={setquery}
              location={location}
              setlocation={setlocation}
            />
            {/* <PaginationDemo Page={Page} setPage={setPage} NO_OF_JOBS ={Jobs.length}/> */}
            <PaginationDemo page={page} no_of_jobs={jobCount} />
          </StateContextProvider>
        </>
      )}
    </>
  );
}
