import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { listFoodCategory } from '../../store/actions/foodCategory.action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { i18n } from '../../language';
import _ from 'lodash'
import Food_CategoriesTable from '../../components/tables/foodCategoryTable';
import Loading from '../../components/Loading';


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
    <div id="foodsTable">
      {!loading && foodCategoriesList && [foodCategoriesList.items.length==0? <h1>{i18n.t('noXfound',{x:i18n.t('mealCategories')})}</h1>:<><h1 id="foodsCatHeader">{i18n.t('mealCategory')}</h1> <Food_CategoriesTable foodCategories={_.without(_.map(foodCategoriesList.items, (item) => {if (!item.is_deleted) return item}), undefined)}></Food_CategoriesTable></>]}
      {loading && <Loading />}
        
    </div>
  );
};
export default FoodCategoriesList;
