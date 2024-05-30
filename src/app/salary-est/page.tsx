"use client";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import React, { useState } from "react";
import salaries from "../../../public/salary-est.json";
import { string } from "zod";

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
  return (
    <>
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

      <div className="grid grid-cols-4 mx-20 gap-x-10">
        {filtereddata(salaries).map((item) => (
          <Card
            key={item.id}
            className=" h-32 flex flex-col pl-5 pt-5 rounded-none mt-8"
          >
            <h1 className=" font-semibold">{item.title}</h1>
            <div className=" mt-2 text-blue-600">{item.salary}</div>
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
