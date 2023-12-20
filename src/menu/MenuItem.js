import React, { useContext } from 'react';
import './Menu.css';
import { DataContext } from '../DataProvider';
import useBasket from './useBasket';

const MenuItem = ({category}) => {
  const { menuData } = useContext(DataContext);
  const filteredData = menuData[category];
  const { addToBasket, removeFromBasket } = useBasket();

  return (
    <div>
      <ul>
      {filteredData && filteredData.map((item) => (
          <li key={item.id}>
            {item.name}{' '}
            <button onClick={() => addToBasket(item)}>+</button>
            <button onClick={() => removeFromBasket(item)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItem;