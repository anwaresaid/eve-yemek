import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import DeliveryService from '../../store/services/deliveries.service';
import Loading from '../../components/Loading';
import StandardTable from '../../components/StandardTable';
import { i18n } from '../../language';
import Header from '../../components/InTableComponents/Header/index';
import _ from 'lodash';
import { listDeliveries } from '../../store/actions/deliveries.action';
import OrderAndDeliveryStatus from '../../components/InTableComponents/orderStatusTag';
import { fromNowDate } from '../../helpers/dateFunctions';
import SSPaginatorTable from '../../components/SSPaginatorTable';

const Deliveries = () => {
  const router = useRouter();
  const path = 'deliveries';

  const deliveryService = new DeliveryService();

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
      field: 'order.order_code',
      header: i18n.t('order'),
      body: (row) => (
        <a
          href={'/orders/' + row.order.id}
          style={{ textDecoration: 'none' }}
        >
          {row.order.order_code}
        </a>
      ),
      filter: true,
      filterType: 'search'
    },
    {
      field: 'user.name',
      header: i18n.t('deliveryScouts'),
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
      filter: true,
      filterType: 'search'
    },
    {
      header: i18n.t('orderTime'),
      body: (row) => (fromNowDate(row.order.createdAt)),
    },
    {
      field: 'status',
      header: i18n.t('status'),
      body: (row) => (OrderAndDeliveryStatus(row.status)),
      filter: true,
      filterType: 'dropdown',
      dropdownOptions: [
        { label: i18n.t('unassigned'), value: 'unassigned' },
        { label: i18n.t('assigned'), value: 'assigned' },
        { label: i18n.t('picked'), value: 'picked' },
        { label: i18n.t('delivered'), value: 'delivered' },
        { label: i18n.t('cancelled'), value: 'canceled' },
        { label: i18n.t('all'), value: '' }
      ]
    },
    {
      field: 'ops',
      header: i18n.t('operations'),
      body: (rowData) => editButton(rowData),
    },
  ]

  const fetch = (offset, limit, fields = null, text = null) => {
    return new Promise((resolve, reject) => {
      deliveryService.getAllDeliveries(offset, limit, fields, text)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  return (
    <div id='deliveriesCard' className='card'>
      <h1 id='deliveriesHeader'>{i18n.t('deliveries')}</h1>
      <SSPaginatorTable
        headerText={i18n.t('listOfX', { x: i18n.t('deliveries') })}
        fetch={fetch}
        columns={columns}
        emptyMessage={i18n.t('noXfound', { x: i18n.t('deliveries') })}
      ></SSPaginatorTable>
    </div>
  );
};

export default Deliveries;
