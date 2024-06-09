"use client";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import React, { useState } from "react";
import salaries from "../../../public/salary-est.json";
import { string } from "zod";
import { useSession } from "next-auth/react";
import { ThreeDots } from "react-loader-spinner";
interface Salary {
  id: number;
  title: string;
  salary: string;
  status: string;
  skills: string;
}



export default function Page() {
  const [Searchtext, setSearchtext] = useState<string>("");
  console.log(Searchtext);

  const filtereddata = (salaries: Array<Salary>) => {
    return salaries.filter((item) =>
      item.title
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(Searchtext.toLowerCase().split(" ").join(""))
    );
  };

  const {status} = useSession()
  return (
    <>
    {status === "loading" ? (
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
          <></>
        )}
      <div className="flex flex-col mx-20 mt-10">
        <Card className=" h-52 rounded-none"></Card>
        <Input
          className=" mt-8"
          placeholder="Search by JobTitle..."
          value={Searchtext}
          onChange={(e) => {
            setSearchtext(e.target.value);
          }}
        />
      </div>

      <div className="grid grid-cols-4 mx-20 gap-x-10 max-[1100px]:grid-cols-3  max-md:grid-cols-2 max-sm:grid-cols-1" >
        {filtereddata(salaries).map((item) => (
          <Card
            key={item.id}
            className=" h-32 flex flex-col pl-5 pt-5 rounded-none mt-8 max-[321px]:h-fit max-[321px]:pt-1 max-md:pt-3 max-md:h-24 max-sm:h-20 max-sm:pt-3 max-sm:pl-3 "
          >
            <h1 className=" font-semibold max-md:text-[14px]">{item.title}</h1>
            <div className=" mt-2 text-blue-600 max-md:text-[14px] max-sm:mt-0">{item.salary}</div>
          </Card>
        ))}
        {/* 
        <Card className=" h-36   rounded-none mt-8"></Card>
        <Card className=" h-36   rounded-none mt-8"></Card>
        <Card className=" h-36   rounded-none mt-8"></Card>
        <Card className=" h-36  rounded-none mt-8"></Card>

        <Card className=" h-36   rounded-none mt-8"></Card>
        <Card className=" h-36   rounded-none mt-8"></Card>
        <Card className=" h-36   rounded-none mt-8"></Card> */}
      </div>
    </>
  );
}
