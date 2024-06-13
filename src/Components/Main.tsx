import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Location from "../../public/location.json";
import { GenericComboBox } from "./generic/GenericComboBox";

import StateContext from "@/Context/StateContext";
import Image from "next/image";
import { BannerProps } from "./types/BannerProps";
import { Card } from "./ui/card";

export default function Main({
  Jobs,
  query,
  setquery,
  location,
  setlocation,
}: BannerProps) {
  const { value, setValue } = React.useContext(StateContext);
  const { salaries, setsalaries } = React.useContext(StateContext);
  const { postingdates, setpostingdates } = React.useContext(StateContext);
  const { workExps, setworkexps } = React.useContext(StateContext);
  const { emps, setemps } = React.useContext(StateContext);
  const { durations, setdurations } = React.useContext(StateContext);

  const [page, setpage] = useState(0);



  const filtereddata = Jobs.filter(
    (item) =>
      item.jobTitle
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(query.toLowerCase().split(" ").join("")) &&
      item.jobLocation
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(location.toLowerCase().split(" ").join("")) &&
      item.salaryType
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(durations.toLowerCase().split(" ").join("")) &&
      item.experienceLevel
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(workExps.toLowerCase().split(" ").join("")) &&
      item.employmentType
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(emps.toLowerCase().split(" ").join("")) &&
      item.salary
        .toLowerCase()
        .split(" ")
        .join("")
        .includes(salaries.toLowerCase().split(" ").join(""))
  );

  

  return (
    <>
      <div
        className={cn(
          " flex flex-col justify-center items-center gap-x-5 mt-12 max-sm:mt-5 "
        )}
      >
        <div className={cn(" w-[72%] h-24 ")}>
          <GenericComboBox
            data={Location}
            title={[
              "Location",
              "Duration",
              "Salary",
              "Date of Posting",
              "Work experience",
              "Type of employment",
            ]}
            duration={[
              {
                value: "Hourly",
                label: "Hourly",
              },
              {
                value: "Monthly",
                label: "Monthly",
              },
              {
                value: "Yearly",
                label: "Yearly",
              },
            ]}
            salary={[
              {
                value: "Any",
                label: "Any",
              },
              {
                value: "< 30000k",
                label: "< 30000k",
              },
              {
                value: "< 50000k",
                label: "< 50000k",
              },
              {
                value: "< 80000k",
                label: "< 80000k",
              },
              {
                value: "< 100000k",
                label: "< 100000k",
              },
            ]}
            postingdate={[
              {
                value: "All time",
                label: "All time",
              },
              {
                value: "Last 24 hours",
                label: "Last 24 hours",
              },
              {
                value: "Last 7 days",
                label: "Last 7 days",
              },
              {
                value: "Last Month",
                label: "Last Month",
              },
            ]}
            workExp={[
              {
                value: "Any experience",
                label: "Any experience",
              },
              {
                value: "Internship",
                label: "Internship",
              },
              {
                value: "Work remotely",
                label: "Work remotely",
              },
            ]}
            employement={[
              {
                value: "Any",
                label: "Any",
              },
              {
                value: "Full time",
                label: "Full time",
              },
              {
                value: "Temporary",
                label: "Temporary",
              },
              {
                value: "Part time",
                label: "Part time",
              },
            ]}
          />
        </div>

        <div
          className={cn(
            "   flex flex-col w-[72%] max-lg:mt-5 max-[478px]:mt-14  "
          )}
        >
          {filtereddata.map((item, index) => (
            <Card key={item.id} className={cn(" mb-8 hover:shadow-custom")}>
              <div
                className={cn(
                  "flex h-48 w-auto pl-5 max-md:h-40  max-[425px]:h-32 pt-0 "
                )}
              >
                <div className={cn("flex-[1] self-center ")}>
                  <Image
                    src={item.companyLogo}
                    alt="image not found"
                    height={140}
                    width={140}
                  />
                </div>

                <div className={cn(" flex-[4] pl-5 ")}>
                  <div
                    className={cn(
                      "  text-[15px] mt-7  max-sm:mt-6 max-md:text-[12px] max-[425px]:text-[8px]  "
                    )}
                  >
                    {" "}
                    {item.companyName}
                    {index}
                  </div>

                  <div
                    className={cn(
                      "  text-[20px] mt-2 max-[425px]:mt-0 max-[425px]:mb-0 mb-2 max-md:mt-1 max-md:mb-1  max-md:text-[14px] max-[425px]:text-[11px] max-[425px]:font-semibold"
                    )}
                  >
                    {item.jobTitle}
                  </div>

                  <span
                    className={cn(
                      "  text-[15px] mt-2 max-sm:mt-0  max-[425px]:mt-0 max-[425px]:mb-0 max-md:mt-1 max-md:text-[12px] max-[425px]:text-[8px] "
                    )}
                  >
                    {" "}
                    📍{item.jobLocation}
                  </span>
                  <span
                    className={cn(
                      "  text-[15px] mt-2 max-sm:mt-0  max-[425px]:mt-0 max-[425px]:mb-0 max-md:mt-1 max-md:text-[12px] max-[425px]:text-[8px]"
                    )}
                  >
                    {" "}
                    ⌚ {item.employmentType}
                  </span>
                  <span
                    className={cn(
                      "  text-[15px] mt-2 max-sm:mt-0  max-[425px]:mt-0 max-[425px]:mb-0 max-md:mt-1 max-md:text-[12px] max-[425px]:text-[8px]"
                    )}
                  >
                    {" "}
                    💲{item.salary}
                  </span>
                  <div
                    className={cn(
                      "  text-[15px] max-md:text-[12px] max-[425px]:mt-0 max-[425px]:mb-0  mt-2 max-md:mt-1 max-[425px]:text-[8px]"
                    )}
                  >
                    {item.description}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
