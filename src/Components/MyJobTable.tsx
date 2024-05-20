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
  Formdata : {
    jobTitle: string,
  companyName: string,
  salary: string,
  salaryType: string,
  jobLocation: string,
  experienceLevel: string,
  skillset: string,
  employmentType: string,
  description: string,
  companyLogo: string,
  email: string,
  Edit : ReactNode,
  Delete : ReactNode

  }
}

export function MyJobTable({Formdata}:FormData) {
  
  console.log(Formdata)
  
  
  // console.log(Formdata)
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
        {Formdata.map((invoice) => (
          <TableRow key={invoice.NO}>
            <TableCell className="font-medium text-center">
              {invoice.NO}
            </TableCell>
            <TableCell className="text-center">{Formdata.jobTitle}</TableCell>
            <TableCell className="text-center">{Formdata.companyName}</TableCell>
            <TableCell className=" text-center">{Formdata.salary}</TableCell>
            <TableCell className=" text-center">{Formdata.Edit}</TableCell>
            <TableCell className=" text-center">{Formdata.Delete}</TableCell>
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
