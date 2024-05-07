import { LoginForm } from "@/Components/LoginForm";
import React from "react";
import { Input } from "../../Components/ui/input";
import { Card } from "../../Components/ui/card";
import { MyJobTable } from "@/Components/MyJobTable";
import { Button } from "../../Components/ui/button";

export default function page() {
  return (
    <>
      <div className=" flex flex-col justify-center items-center">
        <div className=" flex gap-8">
          <Input style={{ width: "700px" }} />
          <Button>Search</Button>
        </div>

        <div>
          <Card className="w-fit">
            <MyJobTable />
          </Card>
        </div>
      </div>
    </>
  );
}
