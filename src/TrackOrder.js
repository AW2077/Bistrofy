import React, { useState } from 'react';
import "./TrackOrder.css"
import "./Basket.css"

const TrackOrder = () =>{
  const [orderInfo, setOrderInfo] = useState(null);

  const trackOrder = () => {
    const orderId = document.getElementById('orderID').value;


  };

  return (
    <div className='track'>
      <div className='fullBasket'>
        <h4 className='basketTitle'>
          <span>Sprawdź status swojego zamówienia!</span>
        </h4><div className='basketText'>
          <form><input required type="text" id="orderID" name="orderID" enterKeyHint="done" placeholder='Podaj id zamówienia'></input></form>
          <button className='btn bt pl ripple basketText' onClick={() => trackOrder()}>Sprawdź</button>
          {orderInfo && (
            <div className='additionalInfo'>
              <p>Additional info:</p>
              <p>{JSON.stringify(orderInfo)}</p>
            </div>
          )}
      </div>
    </div>
  </div>
  );
}

export default TrackOrder;