import React, { useEffect, useState } from 'react';
import StandardTable from '../StandardTable';
import { InputText } from 'primereact/inputtext';
import { useRouter } from 'next/router';
import editButton from '../InTableComponents/editButton';
import activeTag from '../InTableComponents/activeTag';
import { priceBodyTemplate } from '../InTableComponents/price';
import Header from '../InTableComponents/Header';
import { i18n } from '../../language';

const AddonsTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );
  const path = 'addons';

  const router = useRouter();

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: i18n.t('name') },
    { field: 'add_on_category.name', header: i18n.t('category') },
    { field: 'price', header: i18n.t('price'), body: (rowData)=> priceBodyTemplate(rowData.price) },
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
      header={Header(setGlobalFilter, i18n.t('addons'))}
      columns={columns}
      value={props.addons}
      globalFilter={globalFilter}
      emptyMessage={i18n.t('noXfound', {x: i18n.t('addons')})}
    ></StandardTable>
  );
};

export default AddonsTable;
