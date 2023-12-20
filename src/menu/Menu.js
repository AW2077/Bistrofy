import React, { useState } from 'react';
import NaviBarMenu from './NavBarMenu';
import MenuItem from './MenuItem';

const Menu = () => {
  const [category, setCategory] = useState('pizza');

  const updateContent = (newCategory) => {
    setCategory(newCategory);
  };

  return (
      <div>
        <NaviBarMenu updateContent={updateContent} />
        <div className='mainContent'>
          <MenuItem category={category} />
        </div>
      </div>
  );
};

export default Menu;