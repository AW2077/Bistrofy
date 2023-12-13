import React, {useEffect, useState} from 'react';
import './Menu.css'

const Menu = () => {
  const [basket, setBasket] = useState([]);
  const [idNameMap, setIdNameMap] = useState([]);
  
  const getMenuData = () =>{
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://getmenu-ovvvjoo5mq-uc.a.run.app ");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "https://placeorder-ovvvjoo5mq-uc.a.run.app/");
    xhr.setRequestHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type");
    xhr.setRequestHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if(xhr.status === 200) {
          var fetchedPizzaMenu = [];
          var jsonResponse = JSON.parse(xhr.responseText);
          jsonResponse.forEach(element => {
            fetchedPizzaMenu.push({id:element.id, name:element.name});
          });
          window.setIdNameMap(fetchedPizzaMenu);

          setIdNameMap(fetchedPizzaMenu);
          

        } else {
          console.error("Error: "+xhr.status);
        }
      }
    };
    xhr.send();
    
  }
  
  const addToBasket = (pizza =>{

    let basket = JSON.parse(localStorage.getItem('basket'));
    
    if(basket){
      for(let i=0; i<basket.length; i++){
        if(basket[i].id === pizza.id){
          var quantity = basket[i].quantity;
          basket.splice(i,1);
          basket.push({
            id: pizza.id,
            name: pizza.name,
            quantity: quantity+1
          });
          localStorage.setItem('basket', JSON.stringify(basket));
          return;
        }
      }
      basket.push({
        id: pizza.id,
        name: pizza.name,
        quantity: 1
      });
      localStorage.setItem('basket', JSON.stringify(basket));

    } else {
      basket = [];
      basket.push({
        id: pizza.id,
        name: pizza.name,
        quantity: 1
      });
      localStorage.setItem('basket', JSON.stringify(basket));
    }
})


  const removeFromBasket = (pizza =>{

    let basket = JSON.parse(localStorage.getItem('basket'));

    if(basket){
      for(let i=0; i<basket.length; i++){
        if(basket[i].id === pizza.id){
          var quantity = basket[i].quantity;
          if(quantity === 1){
            basket.splice(i, 1);
            localStorage.setItem('basket', JSON.stringify(basket));
            return;
          }
          basket.splice(i, 1);
          basket.push({
            id: pizza.id,
            name: pizza.name,
            quantity: quantity -1
          });
          localStorage.setItem('basket', JSON.stringify(basket));
          return;
        }
      }
    }



  })

  useEffect(() =>{
    const storedBasket = JSON.parse(localStorage.getItem('basket'));
    if(storedBasket){
      setBasket(storedBasket);
    }

    getMenuData();
  }, []);

  return(
    <div>
      <h1>Menu</h1>
      <ul>
        {idNameMap.map((pizza) => (
          <li>
            {pizza.name} <button onClick={() => addToBasket(pizza)}>+</button><button onClick={() => removeFromBasket(pizza)}>-</button>
          </li>
        ))}
        
      </ul>
    </div>
  );
        };
export default Menu;
