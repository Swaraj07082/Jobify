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
import { get } from "http";

interface QueryObject {
  [key: string]: string;
}

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.url ? new URL(req.url) : null;
  let searchParams;

  if (url) {
    searchParams = url.searchParams;
    // Your logic using searchParams
  } else {
    // Handle the case where req.url is undefined
    console.error("req.url is undefined");
  }

  const page = searchParams?.get("page") || 1;
  console.log(page);

  const jobs_per_page = 5;

  const jobsPerPage = Number(jobs_per_page);
  const currentPage = Number(page);

  const query = {
    take: jobsPerPage,
    skip: jobsPerPage * (currentPage - 1),
  };

  try {
    const [jobs , idk, count] = await db.$transaction([
      db.job.findMany(),
      db.job.findMany(query),
      db.job.count(),
    ]);

    return new NextResponse(JSON.stringify({ jobs ,idk, count }), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export const POST = async (req: Request, res: NextApiResponse) => {
  // const session = await getServerSession();
  // console.log(session?.user?.email);

  // const UserEmail = session?.user?.email as string;
  // const headerList = headers();
  // const referer = headerList.get("referer");
  // console.log(referer);
  // console.log(req.headers.entries())

  // const url = new URL(req.url)
  // const searchParams = new URLSearchParams(url.search);
  // console.log(req.nextURL.searchParams)
  // console.log(searchParams)

  // const queryString = referer?.split("?")[1];

  // const queryParams = new URLSearchParams(queryString);
  // const queryObject: QueryObject = {};

  // queryParams.forEach((value, key) => {
  //   const trimmedKey = key.trim(); // Trim whitespace from the key
  //   queryObject[trimmedKey] = value;
  // });

  // console.log(queryObject);
  // const page = new URLSearchParams(queryString)
  // const limit = Number(new URLSearchParams(queryString))

  // console.log(page)
  // console.log(queryObject.formdata)

  // console.log(queryObject.jobLocation);
  // // console.log(req)
  // try {
  //   const demo = await db.job.create({
  //     data: {
  //       jobTitle: queryObject.jobTitle,
  //       companyName: queryObject.companyName,
  //       salary: queryObject.salary,
  //       salaryType: queryObject.salaryType,
  //       jobLocation: queryObject.jobLocation,
  //       experienceLevel: queryObject.experienceLevel,
  //       skillset: queryObject.skillset,
  //       employmentType: queryObject.employmentType,
  //       description: queryObject.description,
  //       companyLogo: queryObject.companyLogo,
  //       UserEmail: UserEmail,
  //     },
  //   });
  //   return new NextResponse(JSON.stringify(demo), { status: 200 });
  // } catch (error) {
  //   return new NextResponse(
  //     JSON.stringify({ message: "Something went wrong!" }),
  //     { status: 500 }
  //   );
  // }

  const body = await req.json();

  const { ...data } = body;
  console.log(data);

  const newJob = await db.job.create({
    data: {
      jobTitle: data.jobTitle,
      companyName: data.companyName,
      salary: data.salary,
      salaryType: data.salaryType,
      jobLocation: data.jobLocation,
      experienceLevel: data.experienceLevel,
      skillset: data.skillset,
      employmentType: data.employmentType,
      description: data.description,
      companyLogo: data.companyLogo,
      UserEmail: data.UserEmail,
    },
  });

  return new NextResponse(JSON.stringify(newJob));
};


export const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: "ID is required and must be a string" });
  }

  try {
    const deletedJob = await db.job.delete({ where: { id: String(id) } });
    return new NextResponse(JSON.stringify(deletedJob), { status: 200 });
  } catch (error) {
    console.error('Failed to delete job:', error);
    return new NextResponse(JSON.stringify({ message: "Error deleting job" }), { status: 500 });
  }      
}


export const PUT = async (req: Request, res: NextApiResponse) => {
  const body = await req.json();

  const { ...data } = body;

  console.log(data.id);

  const updatedData = db.job.update({
    where: {
      id: String(data.id),
    },
    data: {
      jobTitle: data.jobTitle,
      salary: data.salary,
      companyName: data.companyName,
    },
  });

  return new NextResponse(JSON.stringify(updatedData));
};
