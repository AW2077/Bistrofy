import React, { useState, useEffect } from 'react';

const Basket = () =>{
    const [basketData, setBasketData] = useState([]);

    const placeOrder = () =>{
        const xhr = new XMLHttpRequest();
        xhr.open("POST", " https://placeorder-ovvvjoo5mq-uc.a.run.app");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "https://placeorder-ovvvjoo5mq-uc.a.run.app/");
        xhr.setRequestHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type");
        xhr.setRequestHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

        const orderContents = [];
        basketData.forEach((element) =>{
            orderContents.push(element.id);
        })


        const body = JSON.stringify({
        
            orderContents
        });

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 201) {
                console.log(JSON.parse(xhr.responseText));
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
        xhr.send(body);

    }

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
             {basketData.map((pizza, index) =>(
             <li key={index}>{pizza.name}</li>
             ))} 
            
             
        </ul>
        <br></br>
        <button onClick={() => placeOrder()} >Place order</button>
        </div>
    );
}
export default Basket;