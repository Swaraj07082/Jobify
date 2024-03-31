import { createContext } from "react";
import { StateContextType } from "./StateContextProvider";

const StateContext = createContext<StateContextType>({
    value : '',
    setValue : ()=>{}
});

export default StateContext;