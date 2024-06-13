import { cn } from "@/lib/utils";
import Link from "next/link";
import { Card } from "./ui/card";
import { toast } from "./ui/use-toast";

interface ToggleMenuProps {
  status: string;
}

export default function ToggleMenu({ status }: ToggleMenuProps) {
  return (
    <Card
      className={cn(
        " h-56 m-4 flex flex-col justify-center gap-y-3 shadow-lg "
      )}
    >
      <div className={cn(" ml-3")}>
        <Link href={"/"} className=" hover:text-[#0066FF]">
          Start a Search
        </Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link
          href={status === "authenticated" ? "/my-jobs" : "/register"}
          onClick={() => {
            status === "unauthenticated" ? (
              toast({
                duration: 2100,
                title: "You need to Register first",
              })
            ) : (
              <></>
            );
          }}
          className=" hover:text-[#0066FF]"
        >
          My Jobs
        </Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link
          className=" hover:text-[#0066FF]"
          href={status === "authenticated" ? "/salary-est" : "/register"}
          onClick={() => {
            status === "unauthenticated" ? (
              toast({
                duration: 2100,
                title: "You need to Register first",
              })
            ) : (
              <></>
            );
          }}
        >
          Salary Estimate
        </Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link
          href={status === "authenticated" ? "/post-job" : "/register"}
          onClick={() => {
            status === "unauthenticated" ? (
              toast({
                duration: 2100,
                title: "You need to Register first",
              })
            ) : (
              <></>
            );
          }}
          className=" hover:text-[#0066FF]"
        >
          Post a Job
        </Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link href={"/login"} className=" hover:text-[#0066FF]">
          Login
        </Link>
      </div>

      <div className={cn(" ml-3")}>
        <Link href={"/register"} className=" hover:text-[#0066FF]">
          Register
        </Link>
      </div>
    </Card>
  );
}
