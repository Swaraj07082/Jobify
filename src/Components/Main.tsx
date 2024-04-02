import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Select } from "./ui/select";
import GenericSelect from "./generic/GenericSelect";
import Location from "../../public/location.json";
import { GenericComboBox } from "./generic/GenericComboBox";
import GenericRadioGroup from "./generic/GenericRadioGroup";

import { Joan } from "next/font/google";
import StateContext from "@/Context/StateContext";
import { BannerProps } from "./types/BannerProps";
import { Button } from "./ui/button";
import Image from "next/image";
import { Card } from "./ui/card";

export default function Main({
  Jobs,
  query,
  setquery,
  location,
  setlocation,
}: BannerProps) {
  // console.log(Location)
  // console.log(Jobs)

  const { value, setValue } = React.useContext(StateContext);
  const { salaries, setsalaries } = React.useContext(StateContext);
  const { postingdates, setpostingdates } = React.useContext(StateContext);
  const { workExps, setworkexps } = React.useContext(StateContext);
  const { emps, setemps } = React.useContext(StateContext);
  const { durations, setdurations } = React.useContext(StateContext);

  const [page, setpage] = useState(0);

  // console.log(query.toLowerCase().split(" ").join(""))
  const filtereddata = Jobs.filter(
    (item) =>
      // item.jobTitle.toLocaleLowerCase().indexOf(query.toLowerCase()) !== -1
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

  console.log(filtereddata);

  return (
    <>
      <div
        className={cn(
          " flex flex-col justify-center items-center mt-12 gap-y-12 "
        )}
      >
        <div className={cn(" flex  gap-x-[65px]  ")}>
          {/* <GenericSelect placeholder='Location' data={Location}/> */}
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

        <div className={cn("   w-[72%] ")}>
          {filtereddata.map((item) => (
            <Card key={item.id} className={cn(" mb-5")}>
              <div className={cn("flex h-56 w-auto ")}>
                <div className={cn("flex-[1]  self-center pl-11 ")}>
                  <Image
                    src={item.companyLogo}
                    alt="image not found"
                    height={140}
                    width={140}
                  />
                </div>

                <div className={cn(" flex-[4] ")}>
                  <div className={cn("  text-[15px] mt-7 ")}>
                    {" "}
                    {item.companyName}
                  </div>

                  <div className={cn("  text-[20px] mt-2 mb-2 ")}>
                    {item.jobTitle}
                  </div>

                  <span className={cn("  text-[15px] mt-2 ")}>
                    {" "}
                    📍{item.jobLocation}
                  </span>
                  <span className={cn("  text-[15px] mt-2")}>
                    {" "}
                    ⌚ {item.employmentType}
                  </span>
                  <span className={cn("  text-[15px] mt-2 ")}>
                    {" "}
                    💲{item.salary}
                  </span>
                  <div className={cn("  text-[15px]  mt-2")}>
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
