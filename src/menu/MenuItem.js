import React, { useContext, useState } from 'react';
import './Menu.css';
import { DataContext } from '../DataProvider';
import useBasket from './useBasket';

const MenuItem = ({ category }) => {
  const { menuData } = useContext(DataContext);
  const filteredData = menuData[category];
  const { addToBasket, removeFromBasket } = useBasket();

  const [selectedPrices, setSelectedPrices] = useState({});
  const handlePriceChange = (e, itemId) => {
    const { value } = e.target;
    setSelectedPrices((prevPrices) => ({
      ...prevPrices,
      [itemId]: value,
    }));
  };

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div className='itemContainer'>
      {filteredData &&
        filteredData.map((item) => (
          <div className='item' key={item.id}>
            <div className='imageWrapper'>
              <img
                src={item.img}
                alt={item.name}
                loading='lazy'
                className='itemImage'
              />
            </div>
            <div className='contentWrapper'>
              <div className='itemHead'>
                <div className='itemName'>{item.name}</div>
                <span>
                  <strong>
                    {item.pizzaPrice ? (
                      <select
                        className='priceDropdown'
                        onChange={(e) => handlePriceChange(e, item.id)}
                        onBlur={(e) => handlePriceChange(e, item.id)}
                        value={selectedPrices[item.id] || ''}
                      >
                        {item.pizzaPrice.map((price, index) => (
                          <option key={index} value={price}>
                            rozmiar {sizes[index]} - {price} zł
                          </option>
                        ))}
                      </select>
                    ) : (
                      `${item.price} zł`
                    )}
                  </strong>
                </span>
              </div>
              {item.ingredients && (
                <div className='itemInfo'>
                  {item.ingredients.map((ingredient, index) => (
                    <span key={ingredient.id}>
                      {ingredient.name}
                      {index !== item.ingredients.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              )}
              <div className='itemButton'>
                <button
                  className={'btnYes ripple'}
                  onClick={() => addToBasket(item)}
                >
                  <span className='material-symbols-outlined'>add</span>
                </button>
                <button
                  className={'btnNo ripple'}
                  onClick={() => removeFromBasket(item)}
                >
                  <span className='material-symbols-outlined'>remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MenuItem;