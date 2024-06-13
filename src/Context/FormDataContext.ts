"use client";
import { createContext } from "react";
import { FormDataContextType } from "./FormDataContextProvider";

const FormDataContext = createContext<FormDataContextType>({
  Formdata: {
    id: "",
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
  },
  SetFormdata: () => {},
});

export default FormDataContext;
