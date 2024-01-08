import React from 'react';
import './Basket.css'

const Adress = () => {

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
                    <label htmlFor="street-address">Ulica</label>
                    <input required type="text" id="street-address" name="street-address" autoComplete="street-address" enterKeyHint="next"></input>
                
                </div>
                <div>
                    <label htmlFor="number">Numer</label>
                    <input required type="text" id="city" name="number" autoComplete="address-level2" enterKeyHint="next"></input>
                </div>
                <div>
                    <label htmlFor="phone">Telefon kontaktowy</label>
                    <input required type="tel" id="phone" name="phone" autoComplete="tel" enterKeyHint="done"></input>
                </div>

                <button>Save address</button>
                </form>
            </div>
        </div>
    );
};

export default Adress;

