import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import Loading from '../../components/Loading';
import StandardTable from '../../components/StandardTable';
import { i18n } from '../../language';
import Header from '../../components/InTableComponents/Header/index';
import _ from 'lodash';
import { listDeliveries } from '../../store/actions/deliveries.action';

const Deliveries = () => {
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState(null);
  const res = useSelector((state: RootState) => state.listDeliveries);
  const { loading, success, deliveries } = res;
  const dispatch = useDispatch();
  const path = 'deliveries';

  useEffect(() => {
    dispatch(listDeliveries());
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
    {
      header: i18n.t('order'),
      body: (row) => (
        <a
          href={'/orders/' + row.order.id}
          style={{ textDecoration: 'none' }}
        >
          {row.order.order_code}
        </a>
      ),
    },
    {
      header: i18n.t('user'),
      body: (row) => (
        row.user ? (
          <a
          href={'/users/delivery_scouts/' + row.user.id}
          style={{ textDecoration: 'none' }}
        >
          {row.user.name}
        </a>
        ) : ''
      ),
    },
    {
      header: i18n.t('status'),
      body: (row) => (row.status),
    },
    {
      field: 'ops',
      header: i18n.t('operations'),
      body: (rowData) => editButton(rowData),
    },
  ];

  const getList = () => {
    return _.without(
      _.map(deliveries, (item) => {
        if (!item.is_deleted) {
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
        deliveries && (
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
