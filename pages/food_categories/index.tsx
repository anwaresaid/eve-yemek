import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as S from '../../styles/food/food.list.style'
import { i18n } from '../../language';
import _ from 'lodash'
import FoodCategoryService from '../../store/services/food-category.service';
import activeTag from '../../components/InTableComponents/activeTag';
import editButton from '../../components/InTableComponents/editButton';
import SSPaginatorTable from '../../components/SSPaginatorTable';


const FoodCategoriesList = () => {

  const router = useRouter();
  const path = 'food_categories';

  const foodCategoryService = new FoodCategoryService()

  const imageBodyTemplate = (rowData) => {
    return <S.Image src={`${rowData.image}`} alt={rowData.image} />
  }

  const columns = [
    { field: 'id', header: "ID" },
    { field: 'image', header: i18n.t('image'), body: imageBodyTemplate },
    { field: 'name', header: i18n.t('name'), filter: true, filterType: 'search' },
    { field: 'country', header: i18n.t('country'), filter: true, filterType: 'search' },
    { field: 'status', header: i18n.t('status'), body: (rowData) => activeTag(rowData.active) },
    { field: '', header: i18n.t('operations'), body: (rowData) => editButton(rowData, router, path) }
  ]

  const fetch = (offset, limit, fields = null, text = null) => {
    return new Promise((resolve, reject) => {
      foodCategoryService.getAllFoodCategories(offset, limit, fields, text)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  return (
    <div id="foodsTable">
      <h1 id="foodsCatHeader">{i18n.t('mealCategories')}</h1>
      <SSPaginatorTable
        headerText={i18n.t('listOfX', { x: i18n.t('mealCategories') })}
        fetch={fetch}
        columns={columns}
        emptyMessage={i18n.t('noXfound', { x: i18n.t('mealCategories') })}
      >
      </SSPaginatorTable>
    </div>
  );
};
export default FoodCategoriesList;
