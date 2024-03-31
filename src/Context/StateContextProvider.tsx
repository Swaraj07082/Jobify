import React from "react";
import StateContext from "./StateContext";

type StateContextProviderProps = {
    children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactElement;
}


export interface StateContextType {
    value : string,
    setValue :React.Dispatch<React.SetStateAction<string>> 
}

export const StateContextProvider =({children} : StateContextProviderProps)=>{
  const [value, setValue] = React.useState<string>("");

    
return(

<StateContext.Provider value={{value , setValue}}>
    {children}
</StateContext.Provider>

)

}