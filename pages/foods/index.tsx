import React, { useState,useEffect } from "react";
import FoodsTable from '../../components/tables/foodsTable'
import { listFood } from '../../store/actions/foods.action';
import {useDispatch,useSelector} from 'react-redux';
import { RootState } from "typesafe-actions";
import Loading from "../../components/Loading";
import { i18n } from "../../language";

const FoodsList =  () => {
    const dispatch = useDispatch();

    const res = useSelector((state:RootState) => state.listFood);
    const {loading, success, foods} = res;



     useEffect( () => {
        if(!success)
            dispatch(listFood());
     }, [success]);
    
     return (
        <div id="foodsCategoryTable">
            {!loading && foods && <><h1>{i18n.t('meals')}</h1><FoodsTable foods={foods.items}></FoodsTable></>}
            {loading && <Loading />}
        </div>
    );


}
export default FoodsList;
