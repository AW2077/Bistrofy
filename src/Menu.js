import React, {useEffect, useState} from 'react';
import './Menu.css'

const Menu = () => {
  const [basket, setBasket] = useState([]);
  const [pizzaMenu, setPizzaMenu] = useState([]);
  // const pizzaMenu = [
  //   {id: 1, name: 'Margherita'},
  //   {id: 2, name: 'Pepperoni'}
  // ];

  
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
            console.log(element.name, " ", element.id);
          });
          setPizzaMenu(fetchedPizzaMenu);

        } else {
          console.error("Error: "+xhr.status);
        }
      }
    };
    xhr.send();
    
  }
  
  useEffect(() =>{
    const storedBasket = JSON.parse(localStorage.getItem('basket'));
    if(storedBasket){
      setBasket(storedBasket);
    }

    getMenuData();
  }, []);
  
  
  const addToBasket = (pizza) => {
    
    const updateBasket = [...basket, pizza];
    setBasket(updateBasket);
    localStorage.setItem('basket', JSON.stringify(updateBasket));
  };

  return(
    <div>
      <h1>Menu</h1>
      <ul>
        {pizzaMenu.map((pizza) => (
          <li key={pizza.id} onClick={() => addToBasket(pizza)}>
            {pizza.name}
          </li>
        ))}
      </ul>
    </div>
  );
        };
export default Menu;
