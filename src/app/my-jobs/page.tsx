'use client'
import LoginForm from "@/Components/LoginForm";
import React from "react";
import { useContext } from "react";
import { Input } from "../../Components/ui/input";
import { Card } from "../../Components/ui/card";
import { MyJobTable } from "@/Components/MyJobTable";
import { Button } from "../../Components/ui/button";
import { useSearchParams } from "next/navigation";
import FormDataContext from "@/Context/FormDataContext";
import { FormDataContextProvider } from "@/Context/FormDataContextProvider";

export default function Page() {
  // console.log(searchParams)
  // const searchParams = useSearchParams()
 
  // const search = searchParams.get('jobTitle')
  // console.log(search)
  // I know some developers believe that every state change in React forces an application-wide render, but this isn't true. Re-renders only affect the component that owns the state + its descendants (if any). The App component, in this example, doesn't have to re-render when the count state variable changes.

  const { Formdata, SetFormdata } = useContext(FormDataContext);

  console.log(Formdata);

  return (
    <>
      <div className=" flex flex-col justify-center items-center">
        <div style={{ display : 'flex' , marginTop : '100px' , marginBottom : '20px'}} >
          <Input style={{ width: "750px" ,marginRight : '20px' }} />
          <Button>Search</Button>
        </div>

        <div>
          <Card className="w-fit">
            <FormDataContextProvider>
            <MyJobTable Formdata={Formdata} />
            </FormDataContextProvider>
          </Card>
        </div>
      </div>
    </>
  );
}
