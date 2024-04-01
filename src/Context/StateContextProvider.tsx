import React from "react";
import StateContext from "./StateContext";

type StateContextProviderProps = {
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactElement;
};

export interface StateContextType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  durations: string;
  setdurations: React.Dispatch<React.SetStateAction<string>>;
  salaries: string;
  setsalaries: React.Dispatch<React.SetStateAction<string>>;
  postingdates: string;
  setpostingdates: React.Dispatch<React.SetStateAction<string>>;
  workExps: string;
  setworkexps: React.Dispatch<React.SetStateAction<string>>;
  emps: string;
  setemps: React.Dispatch<React.SetStateAction<string>>;
}

export const StateContextProvider = ({
  children,
}: StateContextProviderProps) => {
  const [value, setValue] = React.useState<string>("");
  const [durations, setdurations] = React.useState<string>("");
  const [salaries, setsalaries] = React.useState<string>("");
  const [postingdates, setpostingdates] = React.useState<string>("");
  const [workExps, setworkexps] = React.useState<string>("");
  const [emps, setemps] = React.useState<string>("");

  return (
    <StateContext.Provider
      value={{
        value,
        setValue,
        durations,
        setdurations,
        salaries,
        setsalaries,
        postingdates,
        setpostingdates,
        workExps,
        setworkexps,
        emps,
        setemps,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
