import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import Loading from '../../components/Loading';
import StandardTable from '../../components/StandardTable';
import { listOrders } from '../../store/actions/orders.action';
import { i18n } from '../../language';
import { MultiSelect } from 'primereact/multiselect';
import Header from '../../components/InTableComponents/Header/index';
import OrderStatus from '../../components/InTableComponents/orderStatusTag';
import { priceBodyTemplate } from '../../components/InTableComponents/price';
import _ from 'lodash';

const Deliveries = () => {
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState(null);
  const res = useSelector((state: RootState) => state.listOrders);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const { loading, success, orders } = res;
  const dispatch = useDispatch();
  const path = 'orders';

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  const editButton = (row) => {
    return (
      <React.Fragment>
        <Button
          id='editBtn'
          icon='pi pi-pencil'
          className='p-button-rounded p-button-info'
          onClick={() => {
            router.push(`/${path}/${row.id}`);
          }}
        />
      </React.Fragment>
    );
  };

  const columns = [
    { field: 'order', header: 'ID' },
    {
      header: i18n.t('restaurant'),
      body: (row) => (
        <a
          href={'/restaurants/' + row.restaurant.id}
          style={{ textDecoration: 'none' }}
        >
          {row.restaurant.name}
        </a>
      ),
    },
    {
      header: i18n.t('orderStatus'),
      body: (rowData) => OrderStatus(rowData.status),
    },
    {
      header: i18n.t('deliveryStatus'),
      body: (rowData) => OrderStatus(rowData.delivery_status),
    },
    {
      field: 'total_amount',
      header: i18n.t('price'),
      body: (rowData) =>
        priceBodyTemplate(rowData.total_amount, rowData.currency_type),
    },
    { field: 'howLongAgo', header: i18n.t('orderTime') },
    {
      field: 'ops',
      header: i18n.t('operations'),
      body: (rowData) => editButton(rowData),
    },
  ];

  const getList = () => {
    return _.without(
      _.map(orders.items, (item) => {
        if (
          !item.is_deleted &&
          (selectedStatuses.includes(item.status) ||
            selectedStatuses.includes(item.delivery_status) ||
            selectedStatuses.length === 0)
        ) {
          return item;
        }
      }),
      undefined
    );
  };

  return (
    <div id='deliveriesTable'>
      {loading ? (
        <Loading />
      ) : (
        success &&
        orders &&
        orders.items && (
          <div id='deliveriesCard' className='card'>
            <h1 id='deliveriesHeader'>{i18n.t('deliveries')}</h1>
            <StandardTable
              header={Header(
                setGlobalFilter,
                i18n.t('deliveries')
              )}
              columns={columns}
              value={getList()}
              globalFilter={globalFilter}
              emptyMessage={i18n.t('noXfound', { x: i18n.t('deliveries') })}
            ></StandardTable>
          </div>
        )
      )}
    </div>
  );
};

export default Deliveries;
