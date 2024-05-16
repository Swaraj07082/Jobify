import db from "../../../lib/db";
import { NextResponse } from "next/server";

export const GET = async ()=>{
    try{
    const idk = await db.job.findMany();

    return new NextResponse(JSON.stringify(idk, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }

}

// export const POST = async() => {
//   try {
//     const demo = await db.job.create({
//       data: {
//         jobTitle: "ergrew",
//         companyName: "effdf",
//         salary: "eegeeererw",
//         salaryType: "dfbbewd",
//         jobLocation: "vbrebefe",
//         experienceLevel: "bbrfewd",
//         skillset: "ebfewwww",
//         employmentType: "bbfeee",
//         description: "bgwwww",
//         companyLogo: "bgbbfd",
//         email: "cwefreg@gmail.com",
//       },
//     });
//     return new NextResponse(JSON.stringify(demo, { status: 200 }));
//   } catch (error) {
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };
