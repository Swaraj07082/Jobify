"use client";
import { Suspense } from "react";
import HomeContent from "@/Components/HomeContent";
import { ThreeDots } from "react-loader-spinner";

export default function Home() {
  return (
    <Suspense fallback={
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
    }>
      <HomeContent />
    </Suspense>
  );
}
