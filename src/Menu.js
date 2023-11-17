import React, {useEffect, useState} from 'react';
import './Menu.css'
import Basket from './Basket';

const Menu = ({ updateContent }) => {

  const [basket, setBasket] = useState([]);
  const pizzaMenu = [
    {id: 1, name: 'Margherita'},
    {id: 2, name: 'Pepperoni'}
  ];

  useEffect(() =>{
    const storedBasket = JSON.parse(localStorage.getItem('basket'));
    if(storedBasket){
      setBasket(storedBasket);
    }
  }, []);

  const addToBasket = (pizza) => {
    const updateBasket = [...basket, pizza];
    setBasket(updateBasket);
    localStorage.setItem('basket', JSON.stringify(updateBasket));
    updateContent(<Basket basketData={updateBasket}/>);
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
      <Basket basketData={basket}/>
    </div>
  );
};
export default Menu;
