import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import React from "react";

export default function Page() {
  return (
    <>
      <div className="flex flex-col mx-20 my-10">
        <Card className=" h-52 rounded-none"></Card>
        <Input className=" mt-8 mb-12" />
      </div>

      <div className="flex mx-20 my-10 gap-x-10">
        <Card className=" h-36 flex-[1] rounded-none "></Card>

        <Card className=" h-36 flex-[1]  rounded-none"></Card>
        <Card className=" h-36 flex-[1]  rounded-none"></Card>

      </div>
    </>
  );
}
