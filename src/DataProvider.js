import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [menuData, setMenuData] = useState({
        pizza: [],
        drinks: [],
        sides: [],
        sauces: []
    });

    const fetchData = async () => {
        try {
            const menuResponse = await fetch('https://getmenu-ovvvjoo5mq-uc.a.run.app');
            const menuData = await menuResponse.json();

            setMenuData(menuData);
        } catch (error) {
            console.error('Error fetching menu data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <DataContext.Provider value={{menuData}}>
            {children}
        </DataContext.Provider>
    );
} 

export { DataProvider, DataContext};