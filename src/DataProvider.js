import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [adress, setAddress] = useState({
        district: '',
        street: 'Przejdź na stronę główną'
    });
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
    const [timeList, setTimeList] = useState([]);
    const [orderList, setOrderList] = useState([]);

    const fetchStreets = async () =>{
        try{
            const streetResponse = await fetch('https://getstreets-ovvvjoo5mq-uc.a.run.app/');
            const streetData = await streetResponse.json();
            setStreetsInDistricts(streetData);
            setstreetList(streetData.ochota.concat(streetData.wola).concat(streetData.wesola).concat(streetData .zoliborz));
        } catch(error){
            console.error('Error fetching street data:', error);
        }
    };

    const fetchData = async () => {
        try {
            const menuResponse = await fetch('https://getmenu-ovvvjoo5mq-uc.a.run.app');
            const menuData = await menuResponse.json();

            setMenuData(menuData);
        } catch (error) {
            console.error('Error fetching menu data:', error);
        }
    };

    const fetchTime = async () => {
        try {
            const timeResponse = await fetch('https://fetchtime-ovvvjoo5mq-uc.a.run.app/');
            const timeList = await timeResponse.json();

            setTimeList(timeList);
        } catch (error) {
            console.error('Error fetching menu data:', error);
        }
    };

    const fetchOrderID = async () => {
        try {
            const orderResponse = await fetch('https://fetchorderid-ovvvjoo5mq-uc.a.run.app/');
            const orderList = await orderResponse.json();

            setOrderList(orderList);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchStreets();
        fetchTime();
        fetchOrderID();

        const addressString = localStorage.getItem('address');
        if(addressString ==! null){
            const address = JSON.parse(addressString);
            setAddress(address);
        }
    }, []);

    return(
        <DataContext.Provider value={{adress, menuData, streetsInDistricts, streetList, timeList, orderList}}>
            {children}
        </DataContext.Provider>
    );
} 

export { DataProvider, DataContext};