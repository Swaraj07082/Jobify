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
  console.log(hasNext, page, no_of_jobs);

  const router = useRouter();

  return (
    <Pagination className=" my-7">
      <PaginationContent className=" flex gap-x-5">
        <PaginationItem>
          <Button
            className="button w-24 max-[400px]:w-20"
            id="button"
            onClick={() => {
              router.push(`?page=${page - 1}`);
              var button = document.getElementById("button");
              if (button) {
                button.style.animation = "clickAnimation 0.2s";
                setTimeout(function () {
                  button?.style.animation == null? "" : "";
                }, 200);
              }
            }}
            disabled={!hasPrev}
            variant={"light"}
          >
            Previous
            {/* <PaginationPrevious /> */}
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
            id="button"
            onClick={() => {
              router.push(`?page=${page + 1}`);
              var button = document.getElementById("button");
              if (button) {
                button.style.animation = "clickAnimation 0.2s";
                setTimeout(function () {
                  button?.style.animation == null? "" : "";
                }, 200);
              }
            }}
            disabled={!hasNext}
            className="button w-24 max-[400px]:w-20"
          >
            Next
            {/* <PaginationNext onClick={() => {
              router.push(`?page=${page + 1}`);
            }}
            disabled={!hasNext}  /> */}
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
