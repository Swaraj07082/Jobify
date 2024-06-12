import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import db from "@/lib/db";
import { useRouter } from "next/navigation";

interface DeleteProps {
  id: string;
}
export function Delete({ id }: DeleteProps) {
  console.log(id);

  async function deleteContent() {
    // const deleteJob = await db.job.delete({
    //   where: {
    //     id: id,
    //   },
    // });
    console.log(id);
    try {
      const response = await fetch(`/api/demo?id=${id}`, {
        method: "DELETE",
      });

      console.log("working");

      if (response.ok) {
        console.log("Job deleted successfully");
      } else {
        console.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="destructive" className="max-md:text-xs hover:shadow-custom hover:bg-white hover:text-destructive text-white">Delete</Button>
      </PopoverTrigger>
      <PopoverContent className=" w-fit">
        <div className="flex flex-col gap-y-5 items-center justify-center">
          <div className="">
            <h4 className="font-medium leading-none"> Are you sure?</h4>
          </div>

          <div className="flex gap-x-4">
            <Button>Cancel</Button>
            <Button
              variant={"destructive"}
              onClick={(e) => {
                // console.log(
                //   e.currentTarget.parentElement?.parentElement?.innerHTML
                // );
                deleteContent();
                console.log("clicked");
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
