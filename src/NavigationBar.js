import React from 'react';
import './NavigationBar.css';
import Menu from './menu/Menu';
import SearchBar from './SearchBar';
import Basket from './Basket';
import TrackOrder from './TrackOrder';
import Contact from './Contact';

const NavigationBar = ({ updateContent }) => {
  return (
    <div className="navbar">
        <ul>
          <li className="logo"><a id="logo" onClick={() => updateContent(<SearchBar/>)}><img id='pizza-icon' src="pizza.png" alt='company logo'></img>Pizzapol</a></li>
            <div className="header-right">
            <li><a onClick={() => updateContent(<Menu/>)}>Menu</a></li>
            <li><a onClick={() => updateContent(<TrackOrder/>)}>Track your order</a></li>
            <li><a onClick={() => updateContent(<Contact/>)}>Contact</a></li>
            <li><a onClick={() => updateContent(<Basket/>)}><img id='basket-icon' src="basket.png" alt='basket icon'></img></a></li>
          </div>
        </ul>
      </div> 
  );
};

export default NavigationBar;