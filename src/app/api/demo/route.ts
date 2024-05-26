"use server";
import db from "../../../lib/db";
import { NextResponse } from "next/server";
import { FormDataType } from "@/Context/FormDataContextProvider";
import { z } from "zod";
import { formSchema } from "@/Components/Form";
import { NextApiRequest, NextApiResponse } from "next";
import { ReadonlyURLSearchParams } from "next/navigation";
import { headers } from "next/headers";
import { connect } from "http2";
import { getServerSession } from "next-auth";

interface QueryObject {
  [key: string]: string;
}

export const GET = async () => {
  try {
    const idk = await db.job.findMany();

    return new NextResponse(JSON.stringify(idk), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export const POST = async (req: Request, res: NextApiResponse) => {
  const session = await getServerSession();
  console.log(session?.user?.email);

  const UserEmail = session?.user?.email as string;
  const headerList = headers();
  const referer = headerList.get("referer");
  console.log(referer);
  // console.log(req.headers.entries())

  // const url = new URL(req.url)
  // const searchParams = new URLSearchParams(url.search);
  // console.log(req.nextURL.searchParams)
  // console.log(searchParams)

  const queryString = referer?.split("?")[1];

  const queryParams = new URLSearchParams(queryString);
  const queryObject: QueryObject = {};

  queryParams.forEach((value, key) => {
    const trimmedKey = key.trim(); // Trim whitespace from the key
    queryObject[trimmedKey] = value;
  });

  console.log(queryObject);
  // const page = new URLSearchParams(queryString)
  // const limit = Number(new URLSearchParams(queryString))

  // console.log(page)
  // console.log(queryObject.formdata)

  console.log(queryObject.jobLocation);
  // console.log(req)
  try {
    const demo = await db.job.create({
      data: {
        jobTitle: queryObject.jobTitle,
        companyName: queryObject.companyName,
        salary: queryObject.salary,
        salaryType: queryObject.salaryType,
        jobLocation: queryObject.jobLocation,
        experienceLevel: queryObject.experienceLevel,
        skillset: queryObject.skillset,
        employmentType: queryObject.employmentType,
        description: queryObject.description,
        companyLogo: queryObject.companyLogo,
        UserEmail: UserEmail,
      },
    });
    return new NextResponse(JSON.stringify(demo), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};



 export async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const {id} = req.query
    console.log(id);
    try {
      // Delete the job from the database
      const deleteJob = await db.job.delete({
        where: {
          id: String(id), // Convert id to string if necessary
        },
      });
      // res.status(200).json({ message: 'Job deleted', deleteJob });
      return new NextResponse(JSON.stringify(deleteJob), { status: 200 });
    } catch (error) {
      return new NextResponse(JSON.stringify({ message: "Error" }), {
        status: 500,
      });
    }
   } else {
     res.setHeader("Allow", ["DELETE"]);
     res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};



