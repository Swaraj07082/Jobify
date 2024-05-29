"use client";
import FormDataContext from "@/Context/FormDataContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../Components/ui/table";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FormDataType } from "@/Context/FormDataContextProvider";
import { useSession } from "next-auth/react";
import db from "@/lib/db";
import { Edit } from "./Edit";
import { Delete } from "./Delete";

const invoices = [
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
    EDIT: (
      <Button
        onClick={() => {
          console.log("clicked");
        }}
      >
        Edit
      </Button>
    ),
    DELETE: <Button>Delete</Button>,
  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
    EDIT: <Button>Edit</Button>,
    DELETE: <Button>Delete</Button>,
  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
    EDIT: <Button>Edit</Button>,
    DELETE: <Button>Delete</Button>,
  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
    EDIT: <Button>Edit</Button>,
    DELETE: <Button>Delete</Button>,
  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
    EDIT: <Button>Edit</Button>,
    DELETE: <Button>Delete</Button>,
  },
];

interface FormData {
  Formdata: {
    jobTitle: string;
    companyName: string;
    salary: string;
    salaryType: string;
    jobLocation: string;
    experienceLevel: string;
    skillset: string;
    employmentType: string;
    description: string;
    companyLogo: string;
    email: string;
    Edit: ReactNode;
    Delete: ReactNode;
  };
}
const GetJobs = async () => {
  const myjobs = await fetch("/api/myjobs");
  const data = await myjobs.json();
  return data;
  // console.log(data);
  // setMyjobs(data);
};

// export function MyJobTable({Formdata}:FormData) {

interface MyJobTableProps {
  query: string;
}

export function MyJobTable({ query }: MyJobTableProps) {
  // console.log(Formdata)
  // prisma methods findmany and stuff works in routes only
  // Prisma methods cannot be used directly in client components. Prisma is designed to be used in a server-side environment due to the need to securely connect to your database. Client-side code runs in the user's browser, and exposing your database credentials and direct database access in the client is a significant security risk.
  // console.log(Formdata)

  // const session = useSession();
  // console.log(session.data?.user?.email)
  // const UserEmail = session.data?.user?.email;

  // console.log(UserEmail);

  // const GetJobs = async () => {
  //   if (!UserEmail) {
  //     console.error("User email is null or undefined");
  //     return; // Return undefined if UserEmail is not defined
  //   }

  //   try {
  //     const myjobs = await db.job.findMany({
  //       where: {
  //         UserEmail: UserEmail,
  //       },
  //     });

  //     return myjobs; // Return the jobs found
  //   } catch (error) {
  //     console.error("Error fetching jobs:", error);
  //     throw error; // Throw the error for handling elsewhere if needed
  //   }
  // };

  // // Call GetJobs and handle the returned promise
  // GetJobs()
  //   .then((jobs) => {
  //     console.log("Jobs:", jobs); // Output the jobs retrieved
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error); // Handle any errors that occur
  //   });
  const [Myjobs, setMyjobs] = useState<Array<FormDataType>>([]);
  const [id, setid] = useState<string>("");
  // const data = await GetJobs()
  // console.log(data)

  useEffect(() => {
    const fetchJobs = async () => {
      const jobs = await GetJobs();
      setMyjobs(jobs);
    };

    fetchJobs();
  }, []);

  // console.log(Myjobs)

  //
  // Empty dependency array ensures this runs only once on mount

  // console.log will be infinite times cause GetJobs function called inside the component , call it inside useEffect

  const filtereddata = (Myjobs: Array<FormDataType>) => {
    console.log(Myjobs);

   return Myjobs.filter((item) =>
      item.companyName
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(query.toLowerCase().split(" ").join(""))
    );
  };

  

  
  return (
    <Table className=" w-[850px]">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-32 text-center">NO.</TableHead>
          <TableHead className=" w-32 text-center">TITLE</TableHead>
          <TableHead className=" w-64 text-center">COMPANY NAME</TableHead>
          <TableHead className=" w-32 text-center">SALARY</TableHead>
          <TableHead className=" w-32 text-center">EDIT</TableHead>
          <TableHead className="w-32 text-center">DELETE</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtereddata(Myjobs)?.map((invoice, index) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium text-center">
              {invoice.id}
            </TableCell>
            <TableCell className="text-center">{invoice.jobTitle}</TableCell>
            <TableCell className="text-center">{invoice.companyName}</TableCell>
            <TableCell className=" text-center">{invoice.salary}</TableCell>
            <TableCell
              className=" text-center"
              onClick={(e) => {
                console.log(invoice.id);
                console.log(
                  e.currentTarget.parentElement?.innerHTML.slice(129, 153)
                );
                invoice.id ===
                e.currentTarget.parentElement?.innerHTML.slice(129, 153) ? (
                  setid(invoice.id)
                ) : (
                  <></>
                );
              }}
            >
              <Edit id={id} />
            </TableCell>
            <TableCell
              className=" text-center"
              onClick={(e) => {
                console.log(invoice.id);
                console.log(
                  e.currentTarget.parentElement?.innerHTML.slice(129, 153)
                );
                invoice.id ===
                e.currentTarget.parentElement?.innerHTML.slice(129, 153) ? (
                  setid(invoice.id)
                ) : (
                  <></>
                );
              }}
            >
              <Delete id={id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
