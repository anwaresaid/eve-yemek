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
import editButton from '../../components/InTableComponents/editButton';
import imageBodyTemplate from '../../components/InTableComponents/Image/index';
import { i18n } from '../../language';


const FoodCategoriesList = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const res = useSelector((state: RootState) => state.listFoodCategory);
  const { loading, success, foodCat: foodCategoriesList } = res;
  const path = 'food_categories';
  useEffect(() => {
    dispatch(listFoodCategory());
  }, [dispatch]);

  const statusBodyTemplate = (rowData) => {
    if (rowData.active == true) {
      return (
        <Tag className='p-mr-2' severity='success' value='True' rounded></Tag>
      );
    } else {
      return <Tag severity='danger' value='False' rounded></Tag>;
    }
  };
  // global filter
  const header = (
    <div className='table-header'>
      {i18n.t('mealCategories')}
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
      <h1>{i18n.t('mealCategories')}</h1>
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
          <Column body={imageBodyTemplate} header={i18n.t('image')} sortable></Column>
          <Column field='name' header={i18n.t('name')} sortable></Column>
          <Column body={statusBodyTemplate} header={i18n.t('active')} sortable></Column>
          <Column header={i18n.t('operations')} body={(rowData)=>editButton(rowData,router,path)}></Column>
        </S.Table>
      ) : (
          <h2>Loading</h2>
      )}
    </>
  );
};
export default FoodCategoriesList;
