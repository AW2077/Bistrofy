import React, { useContext, useEffect, useState } from 'react';
import './Basket.css'
import { DataContext } from './DataProvider';

const Adress = () => {

    // const [street, setStreet] = useState('Przejdź na stronę główną');
    
    const {adress} = useContext(DataContext);
    
    return (
        <div>
            <h4 className='basketTitle'>Uzupełnij swój adres</h4>
            <div className="wrapper">
                <form>
                <div>
                    <label htmlFor="city">Miasto</label>
                    <input disabled type="text" id="city" name="city" value='Warszawa'></input>
                </div>
                <div>
                    <label htmlFor="district-address">Dzielnica</label>
                    <input disabled type="text" id="district-address" name="district-address" value={localStorage.getItem('address') != null ? JSON.parse(localStorage.getItem('address')).district : 'Przejdź na stronę główną'} autoComplete="street-address" enterKeyHint="next"></input>
                </div>
                <div>
                    <label htmlFor="street-address">Ulica</label>
                    <input disabled type="text" id="street-address" name="street-address" value={localStorage.getItem('address') != null ? JSON.parse(localStorage.getItem('address')).street : 'Przejdź na stronę główną'} autoComplete="street-address" enterKeyHint="next"></input>
                </div>
                <div>
                    <label htmlFor="number">Numer</label>
                    <input required type="text" id="number" name="number" autoComplete="address-level2" enterKeyHint="next"></input>
                </div>
                <div>
                    <label htmlFor="phone">Telefon kontaktowy</label>
                    <input required type="tel" id="phone" name="phone" autoComplete="tel" enterKeyHint="done"></input>
                </div>
                </form>
            </div>
        </div>
    );
};

export default Adress;

