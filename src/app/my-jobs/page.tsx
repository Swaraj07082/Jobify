"use client";
import { MyJobTable } from "@/Components/MyJobTable";
import { FormDataContextProvider } from "@/Context/FormDataContextProvider";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useMediaQuery } from "usehooks-ts";
import { Card } from "../../Components/ui/card";
import { Input } from "../../Components/ui/input";

export default function Page() {
  const [query, setquery] = useState<string>("");

  const { status } = useSession();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const matches = useMediaQuery("(max-width: 768px)");
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
          style={{
            display: "flex",
            marginTop: "100px",
            marginBottom: "20px",
          }}
        >
          <Input
            onChange={(e) => {
              setquery(e.target.value);
            }}
            shadow={true}
            value={query}
            placeholder="🔍 Search by CompanyName..."
            className=" w-[900px]  mb-7 max-[575px]:w-[400px]  max-[400px]:w-[250px] max-[500px]:w-[300px] mx-10 max-[890px]:w-[700px] max-[800px]:w-[600px] max-md:w-[500px] max-lg:w-[800px]"
          />
        </div>

        {matches ? (
          <div>
            <FormDataContextProvider>
              <MyJobTable
                query={query}
                isLoading={isLoading}
                setisLoading={setisLoading}
              />
            </FormDataContextProvider>
          </div>
        ) : (
          <div>
            <Card className="w-fit mx-10">
              <FormDataContextProvider>
                <MyJobTable
                  query={query}
                  isLoading={isLoading}
                  setisLoading={setisLoading}
                />
              </FormDataContextProvider>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
