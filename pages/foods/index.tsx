import React, { useState,useEffect } from "react";
import FoodsTable from '../../components/tables/foodsTable'
import { listFood } from '../../store/actions/foods.action';
import {useDispatch,useSelector} from 'react-redux';
import { RootState } from "typesafe-actions";
import { ProgressSpinner } from 'primereact/progressspinner';


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
            {console.log(foods)}
            {!loading && foods && <><h1>Foods</h1><FoodsTable foods={foods.items}></FoodsTable></>}
            {loading && <ProgressSpinner/>}
        </div>
    );


}
export default FoodsList;
