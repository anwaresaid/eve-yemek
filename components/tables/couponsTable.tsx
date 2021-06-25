import React, { useEffect, useState } from 'react';
import StandardTable from '../StandardTable';
import { InputText } from 'primereact/inputtext';
import { useRouter } from 'next/router';
import editButton from '../InTableComponents/editButton';
import activeTag from '../InTableComponents/activeTag';
import Header from '../InTableComponents/Header';
import { i18n } from '../../language';

const CouponsTable = (props) => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const path = 'coupons';

  const router = useRouter();

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'coupon_code', header: i18n.t('couponCode') },
    { field: 'name', header: i18n.t('name') },
    { field: 'description', header: i18n.t('description') },
    { field: 'expire_date', header: i18n.t('expiration') },
    { field: 'discount_type', header: i18n.t('couponType') },
    { field: 'discount', header: i18n.t('discount') },
    { field: 'max_usage', header: i18n.t('maximumUsage') },
    {
      field: 'active',
      header: i18n.t('active'),
      body: (rowData) => activeTag(rowData.active),
    },
    {
      field: 'ops',
      header: i18n.t('operations'),
      body: (rowData) => editButton(rowData, router, path),
    },
  ];

  return (
    <StandardTable
      header={Header(setGlobalFilter, i18n.t('coupons'))}
      columns={columns}
      value={props.coupons}
      globalFilter={globalFilter}
      emptyMessage={i18n.t('noXfound', {x: i18n.t('coupons')})}
    ></StandardTable>
  );
};

export default CouponsTable;
