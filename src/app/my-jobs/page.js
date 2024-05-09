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
        <div style={{ display : 'flex' , marginTop : '100px' , marginBottom : '20px'}} >
          <Input style={{ width: "750px" ,marginRight : '20px' }} />
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
