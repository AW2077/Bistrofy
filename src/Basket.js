import React, { useState, useEffect, useContext } from 'react';
import './Basket.css'
import Adress from './Adress';
import { DataContext } from './DataProvider';
import { generateTimeList } from './Contact';

const Basket = () =>{
    const [basketData, setBasketData] = useState([]);
    const {timeList} = useContext(DataContext);
    const timeListResult = generateTimeList(timeList);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [phoneError, setPhoneError] = useState('');

    const checkDistrict = () => {
        const storedAddress = localStorage.getItem('address');
        if (storedAddress) {
          try {
            const parsedAddress = JSON.parse(storedAddress);
            return parsedAddress.district || null;
          } catch (error) {
            console.error('Error parsing address from local storage:', error);
            return null;
          }
        }
        return null;
      };
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    const isOpenNow = (district, timeList, currentDateTime) => {
        const currentTime = currentDateTime.getHours() * 60 + currentDateTime.getMinutes();
        const districtInfo = timeList.find(item => item.district === district);
      
        if (districtInfo) {
          const startTime = districtInfo.startTime.split(':');
          const endTime = districtInfo.endTime.split(':');
          const startMinutes = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
          const endMinutes = parseInt(endTime[0]) * 60 + parseInt(endTime[1]);
          return currentTime >= startMinutes && currentTime <= endMinutes;
        }
        return false;
      };
      
      const isOpen = isOpenNow(checkDistrict(), timeListResult, currentTime);
    //   const isOpen = true;

    const placeOrder = () => {

        if(document.getElementById('number').value.length == 0
        || document.getElementById('phone').value.length == 0){
            alert('Proszę uzupełnić puste pola');
        
            return;
        }
         
        var district = document.getElementById('district-address').value;
        var street = document.getElementById('street-address').value;
        var number = document.getElementById('number').value;
        var phone = document.getElementById('phone').value;

        const basketContent = JSON.parse(localStorage.getItem('basket'));
        console.log(basketContent === true);

        const order = {
            content: basketContent,
            address: {
                district: district,
                street: street,
                number: number,
                phone: phone
            }}

        

        const xhr = new XMLHttpRequest();
        xhr.open("POST", " https://placeorder-ovvvjoo5mq-uc.a.run.app");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "https://placeorder-ovvvjoo5mq-uc.a.run.app/");
        xhr.setRequestHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type");
        xhr.setRequestHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 201) {
                console.log(JSON.parse(xhr.responseText));
            } else {
                console.log(`Error: ${xhr.status}, Details: ${xhr.responseText}`);
            }
        };
        xhr.send(JSON.stringify(order));
        };
    
    const clearBasket = () => {
        localStorage.removeItem('basket');
        setBasketData([]);
    };

    const decreaseQuantity = (index) => {
        const updatedBasket = [...basketData];
        if (updatedBasket[index].quantity > 1) {
            updatedBasket[index].quantity -= 1;
            setBasketData(updatedBasket);
            localStorage.setItem('basket', JSON.stringify(updatedBasket));
        } else {
            updatedBasket.splice(index, 1);
            setBasketData(updatedBasket);
            localStorage.setItem('basket', JSON.stringify(updatedBasket));
        }
    };

    useEffect(() => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'));
        if (storedBasket) {
            setBasketData(storedBasket);
        }
    }, []);

    const calculateTotalPrice = (basketData) => {
        let totalPrice = 0;
    
        for (const item of basketData) {
          totalPrice += item.price * item.quantity;
        }
    
        return totalPrice.toFixed(2);
      };
    const total = calculateTotalPrice(basketData);

    const isFormValid = () => {
        const streetElement = document.getElementById('street-address');
        const numberElement = document.getElementById('number');
        const phoneElement = document.getElementById('phone');
      
        if (!streetElement || !numberElement || !phoneElement) {
          return null;
        }
      
        const street = streetElement.value;
        const number = numberElement.value;
        const phone = phoneElement.value;
      
        if (street.length === 0 || number.length === 0 || phone.length === 0 || phoneError) {
          return null;
        }
        return true;
      };

    return (
        <div>
            {basketData && basketData.length > 0 ? (
                <div className='fullBasket'>
                    <h4 className='basketTitle'>
                    <span>Twoje zamówienie</span><span className='price'>{total} zł</span>
                    </h4><div className='basketText'>
                    <ul>
                        {basketData.map((item, index) => (
                            <li key={index}>
                                <span>
                                {item.quantity}x<span className='itemName'> {item.name} {item.size}</span> <span className='price'>{item.price} zł
                                <button className="minus" onClick={() => decreaseQuantity(index)}><span className="x material-symbols-outlined ripple">remove</span></button></span></span>
                            </li>
                        ))}
                    </ul></div>
                    <div className='trash'>WYCZYŚĆ KOSZYK
                    <button className='btn tr' onClick={() => clearBasket()}><span className=" trash material-symbols-outlined">delete</span></button></div>
                    <Adress phoneError={phoneError} setPhoneError={setPhoneError}/>
                    {(!isOpen ? (
                        <p className="pl error">Twój wybrany lokal jest teraz zamknięty!</p>
                        ) :
                    (isFormValid() === null ? (
                        <p className="pl error">Najpierw poprawnie uzupełnij wszystkie pola.</p>
                        ) : 
                        null)
                        )}
                    <button
                    className={`btn bt pl ripple basketText ${!isOpen || isFormValid() === null ? 'disabled' : ''}`} 
                    onClick={() => isOpen && isFormValid() && placeOrder()}
                    disabled={!isOpen || isFormValid() === null}>
                        Zamów!</button>
                </div>
            ) : (
                <div className='emptyBasket'>
                    <h4>Twój koszyk jest pusty</h4>
                    <span className='textEmpty'>Ale nie martw się - nasze smakowite pizze czekają, by do niego trafić! Przejrzyj nasze menu,
                    dodaj ulubione produkty i zamów online, ciesząc się wygodą i pysznym jedzeniem w zasięgu ręki.</span>
                </div>
            )}
        </div>
    );
};

export default Basket;