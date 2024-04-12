import { NextResponse } from "next/server";
import db from '../../../lib/db'
export const GET = async (req, res) => {
  try {

const jobs = await db.job.findMany();

return new NextResponse(JSON.stringify(jobs , {status : 200}))


  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
