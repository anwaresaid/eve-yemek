import React, { useState, useEffect } from 'react';
import OrdersTable from '../../../components/tables/ordersTable';
import { listOrders } from '../../../store/actions/orders.action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { useSocket } from '../../../helpers/socket';
import { i18n } from '../../../language'
import _ from 'lodash';
import Loading from '../../../components/Loading';

const liveOrdersList = () => {
  const dispatch = useDispatch();
  const socket = useSocket();

  const [refresh, setRefresh] = useState(false);

  const res = useSelector((state: RootState) => state.listOrders);
  const { loading, success, orders } = res;

  useEffect(() => {
    if (orders.items.length === 0 && !success) dispatch(listOrders());
    if (socket) {
      socket.on(`messageToClient`, (payload) => {
        console.log('trying to show payload', payload)
      });

      if(success){
        socket.on(`order.created.${orders.items[0]?.restaurant.id}`, ({payload}) => {
          orders.items.push(payload)
          setRefresh(true)
        })
      }
    }

    return () => {
      socket.disconnect();
    };
  }, [dispatch, success, refresh]);

  return (
    <div id="liveOrdersTable">
      <h1 id="ordersHeader">{i18n.t('liveOrders')}</h1>
      {!loading && orders &&
        <OrdersTable
          orders={_.without(_.map(orders?.items, (item) => {if (!item.is_deleted && item.delivery_status !== 'delivered') return item }), undefined)}
          role='restaurant_owner'
        ></OrdersTable>}
      {loading && <Loading />}
    </div>
  );
};

export default liveOrdersList;
