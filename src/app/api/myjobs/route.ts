import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession();
  console.log(session?.user?.email);
  const UserEmail = session?.user?.email;

  
  if (typeof UserEmail !== "string") {
    return new NextResponse(
      JSON.stringify({ message: "User is not authenticated" }),
      { status: 401 }
    );
  }

  try {
    const myjobs = await db.job.findMany({
      where: {
        UserEmail: UserEmail,
      },
    });

    return new NextResponse(JSON.stringify(myjobs));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "something went wrong" }),
      { status: 500 }
    );
  }
};


