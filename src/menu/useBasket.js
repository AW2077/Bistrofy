import { useState, useEffect, useContext } from 'react';
import { DataContext } from '../DataProvider';

const useBasket = (initialItems) => {
  const { menuData } = useContext(DataContext);
  const [basket, setBasket] = useState(initialItems || []);

  const saveItemDataToLocalStorage = (item, price, size) => {
    let storedItems = JSON.parse(localStorage.getItem('basket')) || [];
    const itemIndex = storedItems.findIndex((storedItem) => storedItem.id === item.id);

    if (itemIndex !== -1) {
      storedItems[itemIndex].price = price;
      storedItems[itemIndex].size = size;
    } else {
      storedItems.push({ id: item.id, price, size });
    }

    localStorage.setItem('basket', JSON.stringify(storedItems));
  };

  const addToBasket = (item, selectedPrice, selectedSize) => {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];

    console.log('Adding to basket:', item.id, selectedPrice, selectedSize);

    let selectedItem = null;
    for (const category in menuData) {
      selectedItem = menuData[category].find((menuItem) => menuItem.id === item.id);
      if (selectedItem) {
        break;
      }
    }

    if (!selectedItem) {
      console.error(`Item ${item.id} not found in the menu.`);
      return;
    }

    const existingItem = basket.find(
      (basketItem) =>
        basketItem.id === item.id &&
        ((basketItem.price === selectedPrice) || (basketItem.price === item.price)) &&
        ((basketItem.size === null) || basketItem.size === selectedSize)
    );
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      basket.push({
        id: item.id,
        name: item.name,
        quantity: 1,
        price: selectedPrice || item.price,
        size: selectedSize || null,
      });
    }

    saveItemDataToLocalStorage(item, selectedPrice, selectedSize);

    localStorage.setItem('basket', JSON.stringify(basket));
    setBasket([...basket]);
  };

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem('basket'));
    if (storedBasket) {
      setBasket(storedBasket);
    }
  }, []);

  return { basket, addToBasket };
};

export default useBasket;