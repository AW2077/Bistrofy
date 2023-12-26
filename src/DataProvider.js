import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [menuData, setMenuData] = useState({
        pizza: [],
        drinks: [],
        sides: [],
        sauces: []
    });
    const [streetsInDistricts, setStreetsInDistricts] = useState({
        ochota: [],
        wola: [],
        wesola: [],
        zoliborz: []
    });
    const [streetList, setstreetList] = useState([]);

    const fetchStreets = async () =>{
        try{
            const streetResponse = await fetch('https://getstreets-ovvvjoo5mq-uc.a.run.app/');
            const streetData = await streetResponse.json();
            setStreetsInDistricts(streetData);
            setstreetList(streetData.ochota.concat(streetsInDistricts.wola).concat(streetsInDistricts.wesola).concat(streetsInDistricts.zoliborz));
        } catch(error){
            console.error('Error fetching street data:', error);
        }
    }

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
        fetchStreets();
    }, []);

    return(
        <DataContext.Provider value={{menuData, streetsInDistricts, streetList}}>
            {children}
        </DataContext.Provider>
    );
} 

export { DataProvider, DataContext};