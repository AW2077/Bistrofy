import React from 'react';
import './Basket.css'

const Adress = () => {


    return (
        <div>
            <h4 className='basketTitle'>Uzupełnij swój adres</h4>
            <div class="wrapper">
                <form>
                <div>
                    <label for="city">Miasto</label>
                    <input disabled type="text" id="city" name="city" value='Warszawa'></input>
                </div>
                <div>
                    <label for="street-address">Ulica</label>
                    <input required type="text" id="street-address" name="street-address" autocomplete="street-address" enterkeyhint="next"></input>
                
                </div>
                <div>
                    <label for="number">Numer</label>
                    <input required type="text" id="city" name="number" autocomplete="address-level2" enterkeyhint="next"></input>
                </div>
                <div>
                    <label for="phone">Telefon kontaktowy</label>
                    <input required type="tel" id="phone" name="phone" autocomplete="tel" enterkeyhint="done"></input>
                </div>

                <button>Save address</button>
                </form>
            </div>
        </div>
    );
};

export default Adress;

