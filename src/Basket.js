import React, { useState, useEffect } from 'react';

const Basket = () =>{
    const [basketData, setBasketData] = useState([]);


    useEffect(() =>{
        const storedBasket = localStorage.getItem('basket');
        if(storedBasket){
            setBasketData(JSON.parse(storedBasket));
        }
    }, []);

    return(
        <div>
        <h2>Your Basket</h2>
        <ul>
            {basketData.map((pizza) => (
            <li key={pizza.id}>{pizza.name}</li>
            ))}
        </ul>
        </div>
    );
}
export default Basket;