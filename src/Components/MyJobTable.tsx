"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Components/ui/table";
import { Button } from "./ui/button";

import { FormDataType } from "@/Context/FormDataContextProvider";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Delete } from "./Delete";
import { Edit } from "./Edit";

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
};

interface MyJobTableProps {
  query: string;
  isLoading: boolean;
  setisLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MyJobTable({
  query,
  isLoading,
  setisLoading,
}: MyJobTableProps) {
  const [Myjobs, setMyjobs] = useState<Array<FormDataType>>([]);
  const [id, setid] = useState<string>("");
  useEffect(() => {
    setisLoading(true);
    const fetchJobs = async () => {
      const jobs = await GetJobs();
      setMyjobs(jobs);
      setisLoading(false);
    };

    fetchJobs();
  }, [setisLoading]);

  const filtereddata = (Myjobs: Array<FormDataType>) => {
    return Myjobs.filter((item) =>
      item.companyName
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(query.toLowerCase().split(" ").join(""))
    );
  };

  const matches = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {matches ? (
        filtereddata(Myjobs).map((job, index) => (
          <div
            key={job.id}
            className="border rounded-lg mb-10 hover:shadow-custom "
          >
            <Table className=" w-[500px] max-[575px]:w-[400px] max-[500px]:w-[300px]  max-[400px]:w-[250px]">
              <TableRow>
                <TableHead>NO.</TableHead>
                <TableCell>{index + 1}</TableCell>
              </TableRow>

              <TableRow>
                <TableHead>TITLE</TableHead>
                <TableCell>{job.jobTitle}</TableCell>
              </TableRow>

              <TableRow>
                <TableHead>COMPANY NAME</TableHead>
                <TableCell>{job.salary}</TableCell>
              </TableRow>

              <TableRow>
                <TableHead>SALARY</TableHead>
                <TableCell>{job.salary}</TableCell>
              </TableRow>

              <TableRow>
                <TableHead>EDIT</TableHead>
                <TableCell>
                  <Edit id={id} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableHead>DELETE</TableHead>
                <TableCell>
                  <Delete id={id} />
                </TableCell>
              </TableRow>
            </Table>
          </div>
        ))
      ) : (
        <Table className=" w-fit max-md:text-xs  max-md:w-[300px]">
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
                <TableCell className="text-center">
                  {invoice.jobTitle}
                </TableCell>
                <TableCell className="text-center">
                  {invoice.companyName}
                </TableCell>
                <TableCell className=" text-center">{invoice.salary}</TableCell>
                <TableCell
                  className=" text-center"
                  onClick={(e) => {
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
        </Table>
      )}
      {filtereddata(Myjobs).length == 0 ? (
        <>
          <div className="flex w-full flex-col items-center justify-center gap-x-5 mt-5">
            <h2 className=" text-xl">You have no posted jobs! </h2>
            <Link href={"/post-job"}>
              <Button className=" my-7 ">Post a job</Button>
            </Link>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
