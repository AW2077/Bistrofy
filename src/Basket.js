import React, { useState, useEffect } from 'react';
import './Basket.css'
import Adress from './Adress';

const Basket = () =>{
    const [basketData, setBasketData] = useState([]);

    const placeOrder = () => {
        const basketContent = JSON.parse(localStorage.getItem('basket'));
        if (!basketContent || basketContent.length === 0) {
            alert('Your basket is empty!');
            return;
        }
        console.log(basketContent === true);

        const order = {
            content: basketContent,
            address: "Grójecka 420",
            district: "Ochota"
        }

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
                    <Adress />
                    <button className='btn pl ripple basketText' onClick={() => placeOrder()}>Zamów!</button>
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