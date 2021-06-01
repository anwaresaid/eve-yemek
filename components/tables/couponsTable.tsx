import React, { useEffect, useState } from 'react';
import StandardTable from '../StandardTable';
import { InputText } from 'primereact/inputtext';
import { useRouter } from 'next/router';
import editButton from '../InTableComponents/editButton';
import activeTag from '../InTableComponents/activeTag';

const CouponsTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );
  const path = 'coupons';

  const router = useRouter();

  const header = (
    <div className='table-header'>
      List of Addons
      <span className='p-input-icon-left'>
        <i className='pi pi-search' />
        <InputText
          type='search'
          onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
          placeholder='Search'
        />
      </span>
    </div>
  );

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
      body: (rowData) => activeTag(rowData.active === true),
    },
    {
      field: 'ops',
      header: 'İşlemler',
      body: (rowData) => editButton(rowData, router, path),
    },
  ];

  return (
    <StandardTable
      header={header}
      columns={columns}
      value={props.coupons}
      globalFilter={globalFilter}
      emptyMessage='No coupons found'
    ></StandardTable>
  );
};

export default CouponsTable;
