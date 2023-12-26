import React, { useContext, useEffect, useState } from 'react';
import './SearchBar.css';
import { DataContext } from './DataProvider';

const SearchBar = () => {
    
    const [value, setValue] = useState("");
    const [district, setDistrict] = useState("Wprowadź ulicę, żeby wyszukać swój lokal!");
    const {streetsInDistricts} = useContext(DataContext);
    const {streetList} = useContext(DataContext);

    useEffect(() =>{
    })
    
    const onChange = (event) =>{
        setValue(event.target.value);
        setDistrict("Wprowadź ulicę, żeby wyszukać swój lokal!");
    };

    
    const onSearch = (searchTerm) =>{
        setValue(searchTerm);

        if(streetsInDistricts.ochota.includes(searchTerm)){
            setDistrict('Twoje zamówienie zostanie dostarczone z lokalu na Ochocie')
            const address = {
                district: "Ochota",
                street: searchTerm
            }
            localStorage.setItem("address", JSON.stringify(address));

        } else if(streetsInDistricts.wola.includes(searchTerm)){
            setDistrict('Twoje zamówienie zostanie dostarczone z lokalu na Woli')
            const address = {
                district: "Wola",
                street: searchTerm
            }
            localStorage.setItem("address", JSON.stringify(address));

        } else if(streetsInDistricts.wesola.includes(searchTerm)){
            setDistrict('Twoje zamówienie zostanie dostarczone z lokalu na Wesołej')
            const address = {
                district: "Wesoła",
                street: searchTerm
            }
            localStorage.setItem("address", JSON.stringify(address));

        } else if(streetsInDistricts.zoliborz.includes(searchTerm)){
            setDistrict('Twoje zamówienie zostanie dostarczone z lokalu na Żoliborzu')
            const address = {
                district: "Żoliborz",
                street: searchTerm
            }
            localStorage.setItem("address", JSON.stringify(address));

        } else {
            setDistrict('Niestety nie osługujemy tego adresu!');
            localStorage.removeItem('address');
        }

    };

    return (
            <div className="search">
                <h3>Twoje ulubione jedzenie już w zasięgu ręki</h3>
                <h4 >Sprawdź restauracje z dostawą w Twojej okolicy</h4>
                <br></br>
                <div className='search-inner'>
                    <input type='text' placeholder='Wyszukaj ulicę' value={value} onChange={onChange}></input>
                    <button onClick={() => onSearch(value)}> Wybierz </button>
                </div>
                <div className='dropdown'>
                    {streetList
                    .filter(item => {
                        const searchTerm = value.toLowerCase();
                        const name = item.toLowerCase();
                        return searchTerm && name.startsWith(searchTerm) && name !== searchTerm;
                    })
                    .slice(0,10)
                    .map(item => (
                        <div onClick={() => {setValue(item)}} className='dropdown-row'>{item}</div>))}
                </div>
                <br></br>
                <br></br>
                <p>{district}</p>
            </div>
      );
  };
  
  export default SearchBar;