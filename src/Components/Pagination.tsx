import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../Components/ui/pagination";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

interface PaginationProps {
  Page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  NO_OF_JOBS: number;
}

export function PaginationDemo({ Page, setPage, NO_OF_JOBS }: PaginationProps) {
  console.log(Page);

  const JOB_PER_PAGE = 2;
  
  let NO_OF_PAGES: number;

  if (NO_OF_JOBS % JOB_PER_PAGE === 0) {
    NO_OF_PAGES = NO_OF_JOBS / JOB_PER_PAGE;
  } else {
    NO_OF_PAGES = Math.floor(NO_OF_JOBS / JOB_PER_PAGE) + 1;
  }

  console.log(NO_OF_JOBS);
  console.log(NO_OF_PAGES);

  const [Prevdisable, setPrevdisable] = useState<boolean>(Page <= 1);
  const [Nextdisable, setNextdisable] = useState<boolean>(Page >= NO_OF_PAGES);

  useEffect(() => {
    setPrevdisable(Page <= 1);
    setNextdisable(Page >= NO_OF_PAGES);
  }, [Page, NO_OF_PAGES]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant={"ghost"}
            onClick={() => {
              if (Page > 1) setPage(Page - 1);
            }}
            disabled={Prevdisable}
          >
            <PaginationPrevious href={`?page=${Page}`} />
          </Button>
        </PaginationItem>
        {/* {Array.from({ length: NO_OF_PAGES }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={Page === index + 1}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))} */}
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <Button
            variant={"ghost"}
            onClick={() => {
              if (Page < NO_OF_PAGES) setPage(Page + 1);
            }}
            disabled={Nextdisable}
          >
            <PaginationNext href={`?page=${Page}`}  />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
