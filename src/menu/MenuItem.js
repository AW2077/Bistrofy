import React, { useContext } from 'react';
import './Menu.css';
import { DataContext } from '../DataProvider';
import useBasket from './useBasket';

const MenuItem = ({category}) => {
  const { menuData } = useContext(DataContext);
  const filteredData = menuData[category];
  const { addToBasket, removeFromBasket } = useBasket();

  return (
    <div className='itemContainer'>
      {filteredData && filteredData.map((item) => (
          <div className='item' key={item.id}>
            <div className='imageWrapper'>
            <img
              src={item.img}
              alt={item.name}
              loading="lazy"
              className='itemImage'
            />
            </div>
            <div className='contentWrapper'>
              <div className='itemHead'>
                <div className='itemName'>{item.name}</div>
                <span>22zł</span>
                </div>
              <div className='itemInfo'>lormem ipsum cven ofhni oeOInE cio </div>
              <div className='itemButton'>
                <button className={'btnYes ripple'} onClick={() => addToBasket(item)}>
                  <span class="material-symbols-outlined">add</span></button>
                <button className={'btnNo ripple'} onClick={() => removeFromBasket(item)}>
                  <span class="material-symbols-outlined">remove</span></button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MenuItem;