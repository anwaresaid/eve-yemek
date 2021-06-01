import React, { useEffect, useState } from 'react';
import StandardTable from '../StandardTable';
import { InputText } from 'primereact/inputtext';
import { useRouter } from 'next/router';
import editButton from '../InTableComponents/editButton';
import activeTag from '../InTableComponents/activeTag';
import Header from '../InTableComponents/Header';

const CouponsTable = (props) => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const path = 'coupons';

  const router = useRouter();

  const columns = [
    { field: '_id', header: 'ID' },
    { field: 'coupon_code', header: 'Kupon Kodu' },
    { field: 'name', header: 'Adi' },
    { field: 'description', header: 'Aciklama' },
    { field: 'expire_date', header: 'ُExpiration' },
    { field: 'discount_type', header: 'Kupon Turu' },
    { field: 'discount', header: 'Indirim' },
    { field: 'max_usage', header: 'Maximum Kullanma' },
    {
      field: 'active',
      header: 'Aktif',
      body: (rowData) => activeTag(rowData.active),
    },
    {
      field: 'ops',
      header: 'İşlemler',
      body: (rowData) => editButton(rowData, router, path),
    },
  ];

  return (
    <StandardTable
      header={Header(setGlobalFilter, 'Kupon')}
      columns={columns}
      value={props.coupons}
      globalFilter={globalFilter}
      emptyMessage='No coupons found'
    ></StandardTable>
  );
};

export default CouponsTable;
