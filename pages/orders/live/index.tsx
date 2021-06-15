import React, { useState, useEffect } from 'react';
import OrdersTable from '../../../components/tables/ordersTable';
import { listOrders } from '../../../store/actions/orders.action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { useSocket } from '../../../helpers/socket';
import { i18n } from '../../../language'
import Loading from '../../../components/Loading';

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
    <div id="liveOrdersTable">
      <h1 id="ordersHeader">{i18n.t('liveOrders')}</h1>
      {!loading && orders && (
        <OrdersTable
          orders={orders.items}
          role='restaurant_owner'
        ></OrdersTable>
      )}
      {loading && <Loading />}
      {/* <Button onClick={emitToSocket}>click</Button> */}
    </div>
  );
};

export default liveOrdersList;
