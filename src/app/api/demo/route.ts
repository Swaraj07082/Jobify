'use server'
import db from "../../../lib/db";
import { NextResponse } from "next/server";
import { FormDataType } from "@/Context/FormDataContextProvider";
import { z } from "zod";
import { formSchema } from "@/Components/Form";
import { NextApiRequest } from "next";



export const GET = async ()=>{
    try{
    const idk = await db.job.findMany();

    return new NextResponse(JSON.stringify(idk), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 })
    ;
  }

}

export const POST = async(searchParams:{ [key: string]: string | string[] | undefined }
) => {
  console.log(searchParams)
  try {
    const demo = await db.job.create({
      data: {
        jobTitle: "dkdkdkdkd",
        companyName: "effdf",
        salary: "eegeeererw",
        salaryType: "dfbbewd",
        jobLocation: "vbrebefe",
        experienceLevel: "bbrfewd",
        skillset: "ebfewwww",
        employmentType: "bbfeee",
        description: "bgwwww",
        companyLogo: "https://dfger",
        email: "cwefreg@gmail.com",
      },
    });
    return new NextResponse(JSON.stringify(demo), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 })
    ;
  }
};
