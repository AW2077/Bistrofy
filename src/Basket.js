import React, { useState, useEffect } from 'react';

const Basket = () =>{
    const [basketData, setBasketData] = useState([]);

    const placeOrder = () =>{

        const basketContent = JSON.parse(localStorage.getItem('basket'));
        if(basketContent.length === 0){
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
        }

    useEffect(() =>{
        const storedBasket = JSON.parse(localStorage.getItem('basket'));
            setBasketData(storedBasket);
    }, []);

    if(!basketData){
        return(
            <div>
            <h2>Your Basket</h2>
            <ul>
                 Your basket is empty!
                
            </ul>
            <br></br>
            <button onClick={() => placeOrder()} >Place order</button>
            </div>
        );
    }

    if(basketData.length === 0){
        return(
            <div>
            <h2>Your Basket</h2>
            <ul>
                 Your basket is empty!
                
            </ul>
            <br></br>
            <button onClick={() => placeOrder()} >Place order</button>
            </div>
        );
    } else {

        
        return(
        <div>
        <h2>Your Basket</h2>
        <ul>
             {basketData.map((pizza, index) =>(
                 <li key={index}>{pizza.quantity}x {pizza.name}</li>
                 ))} 
            
        </ul>
        <br></br>
        <button onClick={() => placeOrder()} >Place order</button>
        </div>
    );
}
}
export default Basket;