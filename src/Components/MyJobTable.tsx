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
import { ReactNode, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { FormDataType } from "@/Context/FormDataContextProvider";
import { useSession } from "next-auth/react";
import db from "@/lib/db";

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

// export function MyJobTable({Formdata}:FormData) {
export function MyJobTable() {
  // console.log(Formdata)

  // console.log(Formdata)

  const session = useSession();
  // console.log(session.data?.user?.email)
  const UserEmail = session.data?.user?.email;

console.log(UserEmail)

  const GetJobs = async () => {
    if (!UserEmail) {
      console.error("User email is null or undefined");
      return; // Return undefined if UserEmail is not defined
    }

    try {
      const myjobs = await db.job.findMany({
        where: {
          UserEmail: UserEmail,
        },
      });

      return myjobs; // Return the jobs found
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error; // Throw the error for handling elsewhere if needed
    }
  };

  // Call GetJobs and handle the returned promise
  GetJobs()
    .then((jobs) => {
      console.log("Jobs:", jobs); // Output the jobs retrieved
    })
    .catch((error) => {
      console.error("Error:", error); // Handle any errors that occur
    });





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
        {invoices.map((invoice) => (
          <TableRow key={invoice.NO}>
            <TableCell className="font-medium text-center">
              {invoice.NO}
            </TableCell>
            <TableCell className="text-center">{invoice.TITLE}</TableCell>
            <TableCell className="text-center">{invoice.COMPANYNAME}</TableCell>
            <TableCell className=" text-center">{invoice.SALARY}</TableCell>
            <TableCell className=" text-center">{invoice.EDIT}</TableCell>
            <TableCell className=" text-center">{invoice.DELETE}</TableCell>
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
