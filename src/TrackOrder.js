import React, { useContext, useState } from 'react';
import { DataContext } from './DataProvider';
import "./TrackOrder.css"
import "./Basket.css"

const TrackOrder = () =>{
  const {orderList} = useContext(DataContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');

  const trackOrder = () => {
    const orderId = document.getElementById('orderID').value;
    const foundOrder = orderList.find((order) => order.orderId === orderId);

    if (foundOrder) {
      console.log('Order found!');
      console.log('Order Status:', foundOrder.status);
      setOrderStatus(foundOrder.status);
      setModalOpen(true);
      setNotFound(false);
    } else {
      console.log('Order not found!');
      setModalOpen(true);
      setNotFound(true);
      setOrderStatus('');
    }
  };

  return (
    <div className='track'>
      <div className='fullBasket'>
        <h4 className='basketTitle'>
          <span>Sprawdź status swojego zamówienia!</span>
        </h4><div className='basketText'>
          <form className='form'><input className='input' required type="text" id="orderID" name="orderID" enterKeyHint="done" placeholder='Podaj ID zamówienia'></input></form>
          <button className='btn bt pl ripple basketText' onClick={() => trackOrder()}>Sprawdź</button>
      </div>
      </div>
      {modalOpen && (
          <div className='modal'>
            <div className='modal-content'>
              {notFound ? (
                <h2>Zamówienia nie znaleziono!</h2>
              ) : (
                <h2>Znaleziono zamówienie!</h2>
              )}
              {notFound ? (
                <p className='textEmpty'>Podane zamówienie nie istnieje. Proszę sprawdzić poprawność ID zamówienia.</p>
              ) : (
                <p className='textEmpty'>Status zamówienia: {orderStatus}.</p>
              )}
            </div>
          </div>
        )}
  </div>
  );
}

export default TrackOrder;