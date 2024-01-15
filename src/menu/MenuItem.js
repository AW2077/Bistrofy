import React, { useContext, useState, useEffect, useMemo } from 'react';
import './Menu.css';
import { DataContext } from '../DataProvider';
import useBasket from './useBasket';
import _ from 'lodash';

const MenuItem = ({ category }) => {
  const { menuData } = useContext(DataContext);
  const filteredData = menuData[category];
  const { addToBasket } = useBasket();
  const sizes = ['S', 'M', 'L', 'XL'];
  const [selectedPrices, setSelectedPrices] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [isSizeSelected, setIsSizeSelected] = useState(false);

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

    const debouncedClearData = _.debounce(clearDataOnRefresh, 1000);

    window.addEventListener('beforeunload', debouncedClearData);

    return () => {
      window.removeEventListener('beforeunload', debouncedClearData);
    };
  }, []);

  const renderIngredients = useMemo(() => {
    if (!filteredData) return null;

    return (ingredients) => {
      if (!ingredients) return null;

      return ingredients.map((ingredient, index) => (
        <span key={ingredient.id}>
          {ingredient.name}
          {index !== ingredients.length - 1 && ', '}
        </span>
      ));
    };
  }, [filteredData]);

  const renderItemImage = useMemo(() => {
    return (imgSrc) => (
      <img
        src={imgSrc}
        alt={imgSrc.name}
        loading='lazy'
        className='itemImage'
      />
    );
  }, []);

  return (
    <div className='itemContainer'>
      {filteredData &&
        filteredData.map((item) => (
          <div className='item' key={item.id}>
            <div className='imageWrapper'>
            {renderItemImage(item.img)}
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
                        <option className='option' key="default" value="">
                          Wybierz rozmiar
                        </option>
                        {item.pizzaPrice.map((price, index) => (
                          <option className='option' key={index} value={price}>
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
                  {renderIngredients(item.ingredients)}
                </div>
              )}
              {item.class && (
                <div className='itemClass'>
                  {item.class}
                </div>
              )}
              <div className='itemButton'>
                <button
                  className={'btnYes ripple'}
                  onClick={() => {
                    const hasPizzaPrice = item.pizzaPrice !== undefined;
                    if (hasPizzaPrice && !isSizeSelected) {
                      alert('Proszę wybrać najpierw rozmiar.');
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