import React, { useContext, useEffect, useState } from 'react';
import './Basket.css'
import { DataContext } from './DataProvider';

const Adress = ({ phoneError, setPhoneError }) => {
 
    const {adress} = useContext(DataContext);
    const [phone, setPhone] = useState('');
  
    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
        setPhone(inputValue);
      
        // Regular expression for matching either 111111111 or 111-111-111 format
        const phoneRegex = /^\d{9}$|^\d{3}-\d{3}-\d{3}$/;
      
        if (phoneRegex.test(inputValue) || inputValue === '') {
          setPhoneError('');
        } else {
          setPhoneError('Nieprawidłowy format numeru telefonu');
        }
      };
      
    
    return (
        <div>
            <h4 className='basketTitle'>Uzupełnij swój adres</h4>
            <div className="basketText">
                <form>
                <div className='row'>
                    <label className='label' htmlFor="city">Miasto:</label>
                    <input className='input' disabled type="text" id="city" name="city" value='Warszawa'></input>
                </div>
                <div className='row'>
                    <label className='label' htmlFor="district-address">Dzielnica:</label>
                    <input className='input' disabled type="text" id="district-address" name="district-address" value={localStorage.getItem('address') != null ? JSON.parse(localStorage.getItem('address')).district : 'Przejdź na stronę główną'} autoComplete="street-address" enterKeyHint="next"></input>
                </div>
                <div className='row'>
                    <label className='label' htmlFor="street-address">Ulica:</label>
                    <input className='input' disabled type="text" id="street-address" name="street-address" value={localStorage.getItem('address') != null ? JSON.parse(localStorage.getItem('address')).street : 'Przejdź na stronę główną'} autoComplete="street-address" enterKeyHint="next"></input>
                </div>
                <div className='row'>
                    <label className='label' htmlFor="number">Numer domu/mieszkania:</label>
                    <input className='input' required type="text" id="number" name="number" autoComplete="address-level2" enterKeyHint="next"></input>
                </div>
                <div className='row'>
                    <label className='label' htmlFor='phone'>Telefon kontaktowy:</label>
                    <input className='input' required type='tel' id='phone' name='phone' autoComplete='tel' enterKeyHint='done' value={phone} onChange={handlePhoneChange} placeholder='format XXX-XXX-XXX lub XXXXXXXXX'></input>
                    {phoneError && <p className='error'>{phoneError}</p>}
                </div>
                </form>
            </div>
        </div>
    );
};

export default Adress;

