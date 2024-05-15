import { NextResponse } from "next/server";
import db from "../../../lib/db";
import FormDataContext from '../../../Context/FormDataContext'
import { useContext } from "react";



export const GET = async (req, res) => {
  try {
// console.log(req.status)

    const jobs = await db.job.findMany();

    return new NextResponse(JSON.stringify(jobs, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// const {Formdata , SetFormdata} = useContext(FormDataContext);

// consol.log(Formdata)
export const POST = async(req) =>{
  try{
const demo = await db.job.create({
  data : {jobTitle : "Hope this works"}
});

return new NextResponse(JSON.stringify(demo , { status: 200 }));
} catch (err) {
  console.log(err);
  return new NextResponse(
    JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
  );
}

}