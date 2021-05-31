import React, { useState, useEffect } from 'react';
import OrdersTable from '../../../components/tables/ordersTable';
import { listOrders } from '../../../store/actions/orders.action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { ProgressSpinner } from 'primereact/progressspinner';
import io from 'socket.io-client';
import { Button } from 'primereact/button';

const liveOrdersList = () => {
  const [ordersItems, setOrdersItems] = useState([]);
  const [liveOrders, setLiveOrders] = useState();
  const [socket, setSocket] = useState(null);

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
    const sockett = io('http://127.0.0.1:3000', { transports: ['websocket'] });
    setSocket(sockett);
    console.log('hello socket connection');
    sockett.on('messageToClient', (payload) => {
      console.log('anything?');
      console.log(payload);
    });
    // return () => {
    //   sockett.disconnect();
    // };
  }, []);

  const emitToSocket = () => {
    console.log('trying to click');
    console.log(socket);
    socket.emit('orderStatus', { message: 'trying to reach you' });
  };

  return (
    <div>
      {!loading && (
        <OrdersTable orders={ordersItems} role='restaurant_owner'></OrdersTable>
      )}
      {loading && <ProgressSpinner />}
      <Button onClick={emitToSocket}>Click me</Button>
    </div>
  );
};

export default liveOrdersList;
