import React, { useState, useEffect } from 'react';
import { Column } from 'primereact/column';
import { Ripple } from 'primereact/ripple';
import classNames from 'classnames';
import { InputText } from 'primereact/inputtext';
import * as S from '../../styles/food/food.list.style';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useRouter } from 'next/router';
import { listFoodCategory } from '../../store/actions/foodCategory.action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';

const FoodCategoriesList = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const res = useSelector((state: RootState) => state.listFoodCategory);
  const { loading, success, foodCat: foodCategoriesList } = res;

  useEffect(() => {
    dispatch(listFoodCategory());
  }, [dispatch]);

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`${rowData.image}`}
        alt={rowData.image}
        className='food-image'
      />
    );
  };
  const statusBodyTemplate = (rowData) => {
    if (rowData.active == true) {
      return (
        <Tag className='p-mr-2' severity='success' value='True' rounded></Tag>
      );
    } else {
      return <Tag severity='danger' value='False' rounded></Tag>;
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success p-mr-2'
          onClick={() => {
            router.push(`/food_categories/${rowData._id}`);
          }}
        />
      </React.Fragment>
    );
  };

  // global filter
  const header = (
    <div className='table-header'>
      Yemek Kategorileri Listesi
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

  const formatCurrency = (value) => {
    return value.toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    });
  };

  return (
    <>
      <h1>Yemek Kategorileri</h1>
      {foodCategoriesList ? (
          <S.Table
          value={foodCategoriesList.items}
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
          <Column body={imageBodyTemplate} header='Resim' sortable></Column>
          <Column field='name' header='Ad' sortable></Column>
          <Column body={statusBodyTemplate} header='Aktif' sortable></Column>
          <Column header='Islemler' body={actionBodyTemplate}></Column>
        </S.Table>
      ) : (
          <h2>Loading</h2>
      )}
    </>
  );
};
export default FoodCategoriesList;
