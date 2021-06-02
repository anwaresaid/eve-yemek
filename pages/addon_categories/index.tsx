import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import editButton from '../../components/InTableComponents/editButton/index';
import { i18n } from '../../language';
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
    <>
      <h1>{i18n.t('addonCategories')}</h1>
      {success && addonCategories ? (
        <S.Table
          value={addonCategories.items}
          removableSort
          paginator
          paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
          currentPageReportTemplate='{totalRecords} kayıttan {first} - {last} arasındaki kayıtlar gösteriliyor'
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          header={header}
          className='p-datatable-restaurants'
          globalFilter={globalFilter}
          emptyMessage='Yemek kategorileri bulunamadı'
        >
          <Column field='_id' header='ID' sortable></Column>
          <Column field='name' header={i18n.t('name')} sortable></Column>
          <Column field='enum' header={i18n.t('type')} sortable></Column>
          <Column header={i18n.t('operations')} body={(rowData)=> editButton(rowData,router,path)}></Column>
        </S.Table>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
};

export default AddonCategoriesList;
