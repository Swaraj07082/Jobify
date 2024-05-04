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

const invoices = [
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
  },
  {
    NO: "INV001",
    TITLE: "Paid",
    COMPANYNAME: "$250.00",
    SALARY: "Credit Card",
  },
];

export function MyJobTable() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">NO.</TableHead>
          <TableHead className="text-center">TITLE</TableHead>
          <TableHead className="text-center">COMPANY NAME</TableHead>
          <TableHead className="text-center">SALARY</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.NO}>
            <TableCell className="font-medium text-center">{invoice.NO}</TableCell>
            <TableCell className="text-center">{invoice.TITLE}</TableCell>
            <TableCell className="text-center">{invoice.COMPANYNAME}</TableCell>
            <TableCell className=" text-center">{invoice.SALARY}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {/* <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell> */}
        </TableRow>
      </TableFooter>
    </Table>
  );
}
