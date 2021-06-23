import React, { useState,useEffect } from "react";
import FoodsTable from '../../components/tables/foodsTable'
import { listFood } from '../../store/actions/foods.action';
import {useDispatch,useSelector} from 'react-redux';
import { RootState } from "typesafe-actions";
import Loading from "../../components/Loading";
import _ from 'lodash'
import { i18n } from "../../language";

const FoodsList =  () => {
    const dispatch = useDispatch();

    const res = useSelector((state:RootState) => state.listFood);
    const {loading, success, foods} = res;



     useEffect( () => {
            dispatch(listFood());
     }, [dispatch]);
    
     return (
        <div id="foodsCategoryTable">
            {!loading && foods && [foods.items.length==0? <h1>{i18n.t('noXfound',{x:i18n.t('meals')})}</h1>:<><h1>{i18n.t('meals')}</h1><FoodsTable foods={_.without(_.map(foods.items, (item) => {if (!item.is_deleted) return item}), undefined)}></FoodsTable></>]}
            {loading && <Loading />}
        </div>
    );


}
export default FoodsList;
