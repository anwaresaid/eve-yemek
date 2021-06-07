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
import Food_CategoriesTable from '../../components/tables/foodCategoryTable';
import { ProgressSpinner } from 'primereact/progressspinner';


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

  return (
    <>
      {!loading && foodCategoriesList && <Food_CategoriesTable foodCategories={foodCategoriesList.items}></Food_CategoriesTable>}
      {loading && <ProgressSpinner/>}
        
    </>
  );
};
export default FoodCategoriesList;
