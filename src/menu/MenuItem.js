import React, { useContext, useState, useEffect } from 'react';
import './Menu.css';
import { DataContext } from '../DataProvider';
import useBasket from './useBasket';

const MenuItem = ({ category }) => {
  const { menuData } = useContext(DataContext);
  const filteredData = menuData[category];
  const { addToBasket } = useBasket();
  const sizes = ['S', 'M', 'L', 'XL'];
  const [selectedPrices, setSelectedPrices] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);

  const handlePriceChange = (e, itemId, hasPizzaPrice) => {
    const { value } = e.target;
    
    setSelectedPrices((prevPrices) => ({
      ...prevPrices,
      [itemId]: value,
    }));

    const selectedIndex = e.target.selectedIndex - 1;
    const selectedSize = sizes[selectedIndex];

    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [itemId]: selectedSize,
    }));

    localStorage.setItem('selectedPrices', JSON.stringify({
      ...selectedPrices,
      [itemId]: value,
    }));
  
    localStorage.setItem('selectedSizes', JSON.stringify({
      ...selectedSizes,
      [itemId]: selectedSize,
    }));

    setIsSizeSelected(value !== '');
  };
  
  useEffect(() => {
    const storedPrices = JSON.parse(localStorage.getItem('selectedPrices')) || {};
    const storedSizes = JSON.parse(localStorage.getItem('selectedSizes')) || {};

    setSelectedPrices(storedPrices);
    setSelectedSizes(storedSizes);
  }, []);

  useEffect(() => {
    const visibleItemIds = filteredData.map((item) => item.id);
    const updatedSelectedPrices = { ...selectedPrices };
    const updatedSelectedSizes = { ...selectedSizes };

    for (const id in updatedSelectedPrices) {
        if (!visibleItemIds.includes(id)) {
            delete updatedSelectedPrices[id];
            delete updatedSelectedSizes[id];
        }
    }

    setSelectedPrices(updatedSelectedPrices);
    setSelectedSizes(updatedSelectedSizes);
}, [filteredData]);

  useEffect(() => {
    const clearDataOnRefresh = () => {
      localStorage.removeItem('selectedPrices');
      localStorage.removeItem('selectedSizes');
    };

    window.addEventListener('beforeunload', clearDataOnRefresh);

    return () => {
      window.removeEventListener('beforeunload', clearDataOnRefresh);
    };
  }, []);

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
                        <option key="default" value="">
                          Wybierz rozmiar
                        </option>
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
                  onClick={() => {
                    const hasPizzaPrice = item.pizzaPrice !== undefined;
                    if (hasPizzaPrice && !isSizeSelected) {
                      alert('Please select a size.');
                      return;
                    }
                    addToBasket(item, selectedPrices[item.id], selectedSizes[item.id]);
                  }}
                  disabled={item.pizzaPrice !== undefined && !isSizeSelected && selectedPrices[item.id] === ''}
                >
                  <span className='material-symbols-outlined'>add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MenuItem;