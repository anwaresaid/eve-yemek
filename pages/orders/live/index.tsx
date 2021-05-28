import React, { useState, useEffect } from 'react';
import OrdersTable from '../../../components/tables/ordersTable';
import { listOrders } from '../../../store/actions/orders.action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { ProgressSpinner } from 'primereact/progressspinner';
import io from 'socket.io-client';

const liveOrdersList = () => {
  const [ordersItems, setOrdersItems] = useState([]);
  const [liveOrders, setLiveOrders] = useState();

  const dispatch = useDispatch();

  const res = useSelector((state: RootState) => state.listOrders);
  const { loading, success, orders } = res;

  useEffect(() => {
    if (!orders) dispatch(listOrders());
  }, [dispatch]);

  useEffect(() => {
    if (success) setOrdersItems(orders.items);
    //to filter the live orders
    // if(orders)
    // {
    //     setLiveOrders(()=>{
    //         let live= orders.items.filter(data  => {return data.status.localeCompare("Teslim Edildi")==0;});
    //         return live;
    //  })
    // }
  }, [success]);

  useEffect(() => {
    const socket = io('http://127.0.0.1:3000', { transports: ['websocket'] });
    console.log('hello socket connection');
    socket.on('messageToClient', (payload) => {
      console.log('anything?');
      console.log(payload);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      {!loading && (
        <OrdersTable orders={ordersItems} role='restaurant_owner'></OrdersTable>
      )}
      {loading && <ProgressSpinner />}
    </div>
  );
};

export default liveOrdersList;
