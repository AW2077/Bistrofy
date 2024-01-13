import React, { useContext, useState } from 'react';
import { DataContext } from './DataProvider';
import "./TrackOrder.css"
import "./Basket.css"

const TrackOrder = () =>{
  const {orderList} = useContext(DataContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [matchingOrders, setMatchingOrders] = useState([]);

  const trackOrder = () => {
    const orderId = document.getElementById('orderID').value;
    const foundOrders = orderList.filter((order) => order.orderId.phone === orderId);

    if (foundOrders.length > 0) {
      setMatchingOrders(foundOrders);
      setModalOpen(true);
      setNotFound(false);
    } else {
      setModalOpen(true);
      setNotFound(true);
      setMatchingOrders([]);
    }
  };

  return (
    <div className='track'>
      <div className='fullBasket'>
        <h4 className='basketTitle'>
          <span>Sprawdź status swojego zamówienia!</span>
        </h4><div className='basketText'>
          <form className='form'><input className='input' required type="text" id="orderID" name="orderID" enterKeyHint="done" placeholder='Podaj numer telefonu'></input></form>
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
                <p className='textEmpty'>Podane zamówienie nie istnieje. Proszę sprawdzić poprawność podanego numeru telefonu.</p>
              ) : (
                <div className='textEmpty'>
                  {matchingOrders.length === 1 ? (
                    <span>Status zamówienia: {matchingOrders[0].status}.</span>
                  ) : (
                    <ul>
                      {matchingOrders.map((order, index) => (
                        <li key={index}>
                          Zamówienie nr {index + 1} - status: {order.status}.
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
  </div>
  );
}

export default TrackOrder;