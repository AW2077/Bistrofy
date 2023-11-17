import React from 'react';
import './NavigationBar.css';
import Menu from './Menu';
import SearchBar from './SearchBar';
import Basket from './Basket';
import TrackOrder from './TrackOrder';
import Contact from './Contact';

const NavigationBar = ({ updateContent }) => {
  return (
    <nav>
      <header>
        <div class="header">
          <a onClick={() => updateContent(<SearchBar/>)}  class="logo"><img id='pizza-icon' src="pizza.png" alt='company logo'></img>Pizzapol</a>
          <div class="header-right">
            <a onClick={() => updateContent(<Menu/>)}>Menu</a>
            <a onClick={() => updateContent(<TrackOrder/>)}>Track your order</a>
            <a onClick={() => updateContent(<Contact/>)}>Contact</a>
            <a onClick={() => updateContent(<Basket/>)}><img id='basket-icon' src="basket.png" alt='basket icon'></img></a>
          </div>
        </div>   
      </header>
    </nav>
  );
};

export default NavigationBar;