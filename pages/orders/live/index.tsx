import React, { useState, useEffect } from 'react';
import OrdersTable from '../../../components/tables/ordersTable';
import { listOrders } from '../../../store/actions/orders.action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useSocket } from '../../../helpers/socket';

const liveOrdersList = () => {
  const dispatch = useDispatch();
  const socket = useSocket();

  const res = useSelector((state: RootState) => state.listOrders);
  const { loading, success, orders } = res;

  useEffect(() => {
    if (!orders) dispatch(listOrders());
    if (socket) {
      socket.on('messageToClient', (payload) => {
        //do something on listen
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  // example code to emit for future implementations
  // const emitToSocket = () => {
  //   const message = socket.emit('orderStatus', {
  //     message: 'trying to reach you',
  //   });
  // };

  return (
    <div id="liveOrdersTabe">
      {!loading && orders && (
        <OrdersTable
          orders={orders.items}
          role='restaurant_owner'
        ></OrdersTable>
      )}
      {loading && <ProgressSpinner />}
      {/* <Button onClick={emitToSocket}>click</Button> */}
    </div>
  );
};

export default liveOrdersList;
