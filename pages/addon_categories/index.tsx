import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { i18n } from '../../language';
import AddOnCategoryTable from '../../components/tables/addonCategoryTable';
import { listAddonCategory } from '../../store/actions/addon-category.action';
import _ from 'lodash'
import Loading from '../../components/Loading';
import BackBtn from '../../components/backBtn';

const AddonCategoriesList = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const res = useSelector((state: RootState) => state.listAddonCategory);
  const { loading, success, addonCat: addonCategories } = res;
  const path = 'addon_categories';
  useEffect(() => {
    dispatch(listAddonCategory());
  }, [dispatch]);

  // global filter
  const header = (
    <div className='table-header'>
      {i18n.t('addonCategories')}
      <span className='p-input-icon-left'>
        <i className='pi pi-search' />
        <InputText
          type='search'
          onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
          placeholder='Ara'
        />
      </span>
    </div>
  );

  return (
    <div id="addonCategoryTabe">
      {!loading && addonCategories &&
        <>
          <h1 id="addonCatHeader">{i18n.t('addonCategories')}</h1>
          <AddOnCategoryTable addonCategories={_.without(_.map(addonCategories.items, (item) => { if (!item.is_deleted) return item }), undefined)}>
          </AddOnCategoryTable>
        </>}
      {loading && <Loading />}
    </div>
  );
};

export default AddonCategoriesList;
