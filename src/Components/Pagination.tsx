import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface PaginationProps {
  page: number;
  no_of_jobs: number;
}

export function PaginationDemo({ page, no_of_jobs }: PaginationProps) {
  const job_per_page = 5;
  const hasNext = job_per_page * (page - 1) + job_per_page < no_of_jobs;
  const hasPrev = job_per_page * (page - 1) > 0;
  console.log(hasNext , page , no_of_jobs)

  const router = useRouter();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={() => {
              router.push(`?page=${page - 1}`);
            }}
            disabled={!hasPrev}
          >
            <PaginationPrevious />
          </Button>
        </PaginationItem>
        {/* <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <Button
            onClick={() => {
              router.push(`?page=${page + 1}`);
            }}
            disabled={!hasNext}
          >
            <PaginationNext />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
