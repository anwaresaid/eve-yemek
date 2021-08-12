import React, { useState, useEffect } from "react"
import AddOnsService from "../../store/services/addons.service";
import { i18n } from "../../language"
import { useRouter } from "next/router";
import SSPaginatorTable from "../../components/SSPaginatorTable"
import { priceBodyTemplate } from "../../components/InTableComponents/price";
import activeTag from "../../components/InTableComponents/activeTag";
import editButton from "../../components/InTableComponents/editButton";


const AddOnsList = () => {
  const router = useRouter();
  const path = 'addons';
  const addOnsService = new AddOnsService;

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: i18n.t('name'), filter: true, filterType: 'search' },
    { field: 'add_on_category.name', header: i18n.t('category'), body: row => <a href={'/addon_categories/' + row.add_on_category.id} style={{ textDecoration: 'none' }}>{row.add_on_category.name}</a>, filter: true, filterType: 'search' },
    { field: 'price', header: i18n.t('price'), body: (rowData) => priceBodyTemplate(rowData.price, rowData.currency_type) },
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

  const fetch = (offset, limit, fields = null, text = null) => {
    return new Promise((resolve, reject) => {
      addOnsService.getAllAddOns(offset, limit, fields, text)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  return (
    <div id='addOnsTable'>
      <h1 id="addOnsHeader">{i18n.t('addons')}</h1>
      <SSPaginatorTable
        headerText={i18n.t('listOfX', { x: i18n.t('addons') })}
        fetch={fetch}
        columns={columns}
        emptyMessage={i18n.t('noXfound', { x: i18n.t('addons') })}
      >
      </SSPaginatorTable>
    </div>
  );
};

export default AddOnsList;
