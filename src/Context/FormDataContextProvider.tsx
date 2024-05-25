'use client'
import { Dispatch, SetStateAction, useState } from "react";
import FormDataContext from "./FormDataContext";
import * as React from 'react';

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
  UserEmail: string | null | undefined;
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
    UserEmail: "",
  });

  return (
    <FormDataContext.Provider value={{ Formdata, SetFormdata }}>
      {children}
    </FormDataContext.Provider>
  );
};
