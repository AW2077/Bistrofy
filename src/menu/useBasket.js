import { useState, useEffect } from 'react';

const useBasket = (initialItems) => {
  const [basket, setBasket] = useState(initialItems || []);

  const addToBasket = (item) => {
    let basket = JSON.parse(localStorage.getItem('basket'));
  
    if(basket){
      for(let i=0; i<basket.length; i++){
        if(basket[i].id === item.id){
          var quantity = basket[i].quantity;
          basket.splice(i,1);
          basket.push({
            id: item.id,
            name: item.name,
            quantity: quantity+1
          });
          localStorage.setItem('basket', JSON.stringify(basket));
          return;
        }
      }
      basket.push({
        id: item.id,
        name: item.name,
        quantity: 1
      });
      localStorage.setItem('basket', JSON.stringify(basket));
  
    } else {
      basket = [];
      basket.push({
        id: item.id,
        name: item.name,
        quantity: 1
      });
      localStorage.setItem('basket', JSON.stringify(basket));
    }
  };

  const removeFromBasket = (item) => {
    let basket = JSON.parse(localStorage.getItem('basket'));

    if(basket){
      for(let i=0; i<basket.length; i++){
        if(basket[i].id === item.id){
          var quantity = basket[i].quantity;
          if(quantity === 1){
            basket.splice(i, 1);
            localStorage.setItem('basket', JSON.stringify(basket));
            return;
          }
          basket.splice(i, 1);
          basket.push({
            id: item.id,
            name: item.name,
            quantity: quantity -1
          });
          localStorage.setItem('basket', JSON.stringify(basket));
          return;
        }
      }
    }
  
  };

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem('basket'));
    if (storedBasket) {
      setBasket(storedBasket);
    }
  }, []);

  return { basket, addToBasket, removeFromBasket };
};

export default useBasket;