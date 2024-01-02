import React, { useState, useEffect } from 'react';

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

    return (
        <div>
            <h2>Your Basket</h2>
            {basketData && basketData.length > 0 ? (
                <div>
                    <ul>
                        {basketData.map((item, index) => (
                            <li key={index}>
                                {item.quantity}x {item.name} {item.size} {item.price} zł
                                <button onClick={() => decreaseQuantity(index)}>-</button>
                            </li>
                        ))}
                    </ul>
                    <br />
                    <button onClick={() => placeOrder()}>Place order</button>
                    <br />
                    <button onClick={() => clearBasket()}><span className="material-symbols-outlined">delete</span></button>
                </div>
            ) : (
                <div>
                    <ul>
                        <li>Your basket is empty!</li>
                    </ul>
                    <br />
                    <button onClick={() => placeOrder()}>Place order</button>
                </div>
            )}
        </div>
    );
};

export default Basket;