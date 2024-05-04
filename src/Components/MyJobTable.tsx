'use client'
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

const invoices = [
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
    EDIT:<Button onClick={()=>{console.log("clicked")}} >Edit</Button>,
    DELETE:<Button>Delete</Button>

  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
    EDIT:<Button>Edit</Button>,
    DELETE:<Button>Delete</Button>
  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
    EDIT:<Button>Edit</Button>,
    DELETE:<Button>Delete</Button>

  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
    EDIT:<Button>Edit</Button>,
    DELETE:<Button>Delete</Button>

  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
    EDIT:<Button>Edit</Button>,
    DELETE:<Button>Delete</Button>

  }
];

export function MyJobTable() {
  return (
    <Table className=" w-[800px]">
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
            <TableCell className="font-medium text-center">{invoice.NO}</TableCell>
            <TableCell className="text-center">{invoice.TITLE}</TableCell>
            <TableCell className="text-center">{invoice.COMPANYNAME}</TableCell>
            <TableCell className=" text-center" >{invoice.SALARY}</TableCell>
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
