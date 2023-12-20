import React from 'react';
import './Menu.css';

const NaviBarMenu = ({ updateContent }) => {
  const handleClick = (category) => {
    updateContent(category);
  };

  return (
    <div className="bg">
      <div className="menuBar">
        <ul>
          <li><a onClick={() => handleClick('pizza')}>Pizza</a></li>
          <li><a onClick={() => handleClick('sides')}>Przystawki</a></li>
          <li><a onClick={() => handleClick('sauces')}>Sosy</a></li>
          <li><a onClick={() => handleClick('drinks')}>Napoje</a></li>
        </ul>
      </div>
    </div>
  );
};

export default NaviBarMenu;