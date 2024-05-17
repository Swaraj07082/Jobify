'use client'
import { Dispatch, SetStateAction, useState } from "react";
import FormDataContext from "./FormDataContext";

type FormDataContextProviderProps = {
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactElement;
};

export interface FormDataType {
  jobTitle: string;
  companyName: string;
  salary: string;
  salaryType: string;
  jobLocation: string;
  experienceLevel: string;
  skillset: string;
  employmentType: string;
  description: string;
  companyLogo: string;
  email: string;
  values?:Array<Object>
}
export interface FormDataContextType {
  Formdata: FormDataType;
  SetFormdata: Dispatch<SetStateAction<FormDataType>>;
}

export const FormDataContextProvider = ({
  children,
}: FormDataContextProviderProps) => {
  const [Formdata, SetFormdata] = useState<FormDataType>({
    jobTitle: "",
    companyName: "",
    salary: "",
    salaryType: "",
    jobLocation: "",
    experienceLevel: "",
    skillset: "",
    employmentType: "",
    description: "",
    companyLogo: "",
    email: "",
  });

  return (
    <FormDataContext.Provider value={{ Formdata, SetFormdata }}>
      {children}
    </FormDataContext.Provider>
  );
};
