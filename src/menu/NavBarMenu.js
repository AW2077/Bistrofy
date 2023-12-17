import React from 'react';
import './Menu.css';
import Pizza from './subpages/Pizza';
import Sides from './subpages/Sides';
import Sauces from './subpages/Sauces';
import Drinks from './subpages/Drinks';


const NaviBarMenu = ({ updateContent }) => {
    return (
      <div class="bg">
        <div class="mainContent">
          <ul>
            
              <li><a onClick={() => updateContent(<Pizza/>)}>Pizza</a></li>
              <li><a onClick={() => updateContent(<Sides/>)}>Przystawki</a></li>
              <li><a onClick={() => updateContent(<Sauces/>)}>Sosy</a></li>
              <li><a onClick={() => updateContent(<Drinks/>)}>Napoje</a></li>
              </ul>
            </div>
        </div> 
    );
  };
  
  export default NaviBarMenu;