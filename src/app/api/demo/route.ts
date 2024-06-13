import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import db from "../../../lib/db";

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
  

  const jobs_per_page = 5;

  const jobsPerPage = Number(jobs_per_page);
  const currentPage = Number(page);

  const query = {
    take: jobsPerPage,
    skip: jobsPerPage * (currentPage - 1),
  };

  try {
    const [jobs, idk, count] = await db.$transaction([
      db.job.findMany(),
      db.job.findMany(query),
      db.job.count(),
    ]);

    return new NextResponse(JSON.stringify({ jobs, idk, count }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export const POST = async (req: Request, res: NextApiResponse) => {
  const body = await req.json();

  const { ...data } = body;
  
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

  if (!id || typeof id !== "string") {
    return res
      .status(400)
      .json({ message: "ID is required and must be a string" });
  }

  try {
    const deletedJob = await db.job.delete({ where: { id: String(id) } });
    return new NextResponse(JSON.stringify(deletedJob), { status: 200 });
  } catch (error) {
    console.error("Failed to delete job:", error);
    return new NextResponse(JSON.stringify({ message: "Error deleting job" }), {
      status: 500,
    });
  }
};

export const PUT = async (req: Request, res: NextApiResponse) => {
  const body = await req.json();

  const { ...data } = body;


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
