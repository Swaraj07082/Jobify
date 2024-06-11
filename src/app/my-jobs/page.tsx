"use client";
import LoginForm from "@/Components/LoginForm";
import React, { useState } from "react";
import { useContext } from "react";
import { Input } from "../../Components/ui/input";
import { Card } from "../../Components/ui/card";
import { MyJobTable } from "@/Components/MyJobTable";
import { Button } from "../../Components/ui/button";
import { useSearchParams } from "next/navigation";
import FormDataContext from "@/Context/FormDataContext";
import { FormDataContextProvider } from "@/Context/FormDataContextProvider";
import { useSession } from "next-auth/react";
import db from "@/lib/db";
import { ThreeDots } from "react-loader-spinner";

export default function Page() {
  // console.log(searchParams)
  // const searchParams = useSearchParams()

  // const search = searchParams.get('jobTitle')
  // console.log(search)
  // I know some developers believe that every state change in React forces an application-wide render, but this isn't true. Re-renders only affect the component that owns the state + its descendants (if any). The App component, in this example, doesn't have to re-render when the count state variable changes.

  // const { Formdata, SetFormdata } = useContext(FormDataContext);

  // console.log(Formdata);

  //   const session = useSession()
  //   console.log(session.data?.user?.email)
  //   const UserEmail = session.data?.user?.email

  //   const GetJobs = async() =>{
  //     if (!UserEmail) {
  //       console.error('User email is null or undefined')
  //       return;
  //     }

  //     const myjobs = await db.job.findMany({
  //       where : { UserEmail : UserEmail}
  //     })

  // return myjobs

  //   }

  const [query, setquery] = useState<string>("");

  console.log(query);

  const {status} = useSession()
  const [isLoading, setisLoading] = useState<boolean>(false)

  return (
    <>
       {isLoading ? (
          <div className=" w-screen h-screen bg-[#bfbebe42] overflow-hidden flex justify-center items-center"> 

          <ThreeDots
          visible={true}
          height="80"
          width="150"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
          </div>
        ) : (
          <></>
        )}
      <div className=" flex flex-col justify-center items-center">
        <div
          style={{ display: "flex", marginTop: "100px", marginBottom: "20px" }}
        >
          <Input
            // style={{ width: "850px", marginRight: "5px" }}
            onChange={(e) => {
              setquery(e.target.value);
            }}
            value={query}
            placeholder="Search by CompanyName..."
            className=" w-[900px] mx-10 max-[890px]:w-[700px] max-[800px]:w-[600px] max-md:w-[500px] max-lg:w-[800px]"
          />
          {/* max-[815px]:w-[600px] max-lg:w-[800px] */}
          {/* <Button>Search</Button> */}
        </div>

        <div>
          <Card className="w-fit mx-10">
            <FormDataContextProvider>
              {/* <MyJobTable Formdata={Formdata} /> */}
              <MyJobTable query={query} isLoading={isLoading} setisLoading={setisLoading} />
            </FormDataContextProvider>
          </Card>
        </div>
      </div>
    </>
  );
}
