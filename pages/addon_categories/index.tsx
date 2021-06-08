import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import editButton from '../../components/InTableComponents/editButton/index';
import AddOnCategoryTable from '../../components/tables/addonCategoryTable';
import { listAddonCategory } from '../../store/actions/addon-category.action';
import * as S from '../../styles/food/food.list.style';

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
      Eklenti Kategorileri Listesi
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
    <>
      {!loading && addonCategories && <AddOnCategoryTable addonCategories={addonCategories.items}></AddOnCategoryTable>}
      {loading && <ProgressSpinner/>}
    </>
  );
};

export default AddonCategoriesList;
