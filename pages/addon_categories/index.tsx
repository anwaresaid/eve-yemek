import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { i18n } from '../../language';
import SSPaginatorTable from '../../components/SSPaginatorTable';
import editButton from '../../components/InTableComponents/editButton';
import AddOnCategoryService from '../../store/services/addon-category.service';

const AddonCategoriesList = () => {

  const router = useRouter();
  const path = 'addon_categories';
  const addOnCategoryService = new AddOnCategoryService();

  const columns = [
    { field: 'id', header: "ID" },
    { field: 'name', header: i18n.t('name'), filter: true, filterType: 'search' },
    { field: 'enum', header: i18n.t('type'), filter: true, filterType: 'search' },
    { field: '', header: i18n.t('operations'), body: (rowData) => editButton(rowData, router, path) }
  ]

  const fetch = (offset, limit, fields = null, text = null) => {
    return new Promise((resolve, reject) => {
      addOnCategoryService.getAllAddonCategories(offset, limit, fields, text)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  return (
    <div id="addonCategoryTabe">
      <h1 id="addonCatHeader">{i18n.t('addonCategories')}</h1>
      <SSPaginatorTable
        headerText={i18n.t('listOfX', { x: i18n.t('addonCategories') })}
        fetch={fetch}
        columns={columns}
        emptyMessage={i18n.t('noXfound', { x: i18n.t('addonCategories') })}
      >
      </SSPaginatorTable>
    </div>
  );
};

export default AddonCategoriesList;
