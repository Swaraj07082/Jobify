"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Banner from "@/Components/Banner";
import Main from "@/Components/Main";
import { PaginationDemo } from "@/Components/Pagination";
import { StateContextProvider } from "@/Context/StateContextProvider";
import { ThreeDots } from "react-loader-spinner";
import { Jobs } from "@/Components/types/BannerProps";

const HomeContent = () => {
  const searchParams = useSearchParams();
  let page = parseInt(searchParams.get("page") || "1");

  const [Jobs, SetJobs] = useState<Jobs[]>([]);
  const [query, setquery] = useState<string>("");
  const [location, setlocation] = useState<string>("");
  const [jobCount, setJobCount] = useState<number>(0);
  const [isLoading, setisLoading] = useState<boolean>(false);

  useEffect(() => {
    setisLoading(true);
    const getdata = async (page: number) => {
      const data = await fetch(`/api/demo?page=${page}`);
      const { idk, count } = await data.json();
      setJobCount(count);
      SetJobs(idk);
      setisLoading(false);
    };
    getdata(page);
  }, [page]);

  if (isLoading) {
    return (
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
    );
  }

  return (
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
      <PaginationDemo page={page} no_of_jobs={jobCount} />
    </StateContextProvider>
  );
};

export default HomeContent;
