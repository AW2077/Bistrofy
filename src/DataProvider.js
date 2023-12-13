import React,{ createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [idNameMap, setIdNameMap] = useState("initialValue");
    
    const contextValue = { idNameMap, setIdNameMap }

    window.setIdNameMap = setIdNameMap;
    window.idNameMap = idNameMap;

    return(
        <DataContext.Provider value={{contextValue}}>
            {children}
        </DataContext.Provider>
    );
} 