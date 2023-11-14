import React from 'react';
import './NavigationBar.css';
import MenuConponent from './MenuComponent';
import SearchBarComponent from './SearchBarComponent';

const NavigationBar = ({ handleLinkClick }) => {
  return (
    <nav>
      <header>
        <div class="header">
          <a onClick={() => handleLinkClick(SearchBarComponent)}  class="logo"><img id='pizza-icon' src="pizza.png" alt='company logo'></img>Pizzapol</a>
          <div class="header-right">
            <a onClick={() => handleLinkClick(MenuConponent)}>Menu</a>
            <a>Track your order</a>
            <a>Contact</a>
            <a ><img id='basket-icon' src="basket.png" alt='basket icon'></img></a>
          </div>
        </div>   
      </header>
    </nav>
  );
};

export default NavigationBar;