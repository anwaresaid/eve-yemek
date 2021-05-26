import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { listAddonCategories } from '../../store/actions/addonCategories.action';
import * as S from '../../styles/food/food.list.style';

const AddonCategoriesList = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const res = useSelector((state: RootState) => state.listAddonCategories);
  const { loading, success, addonCategories } = res;

  useEffect(() => {
    dispatch(listAddonCategories());
  }, [dispatch]);

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success p-mr-2'
          onClick={() => {
            router.push(`/addon_categories/${rowData._id}`);
          }}
        />
      </React.Fragment>
    );
  };

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
      <h1>Eklenti Kategorileri</h1>
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
          <Column field='name' header='Ad' sortable></Column>
          <Column field='enum' header='Tur' sortable></Column>
          <Column header='Islemler' body={actionBodyTemplate}></Column>
        </S.Table>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
};

export default AddonCategoriesList;
