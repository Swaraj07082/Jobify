import { createContext } from  "react";
import { StateContextType } from  "../Providers/StateContextProvider";

const StateContext = createContext<StateContextType>({
    value : '',
    setValue : ()=>{},
    durations: '',
    setdurations : ()=>{},
    salaries: '',
    setsalaries : ()=>{},
    postingdates: '',
    setpostingdates: ()=>{},
    workExps: '',
    setworkexps : ()=>{},
    emps: '',
    setemps : ()=>{}
});

export default StateContext;