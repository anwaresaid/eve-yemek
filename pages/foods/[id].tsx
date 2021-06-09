import React, { useRef, useState, useEffect } from 'react';
import EditFoods from '../../components/editFoods/editFoods'
import {listAddons} from '../../store/actions/addons.action';
import {listFoodCategory} from '../../store/actions/foodCategory.action';
import { listRestaurant } from '../../store/actions/restaurant.action';
import { findFood } from '../../store/actions/foods.action';
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from 'typesafe-actions';
import {useRouter} from 'next/router';
import { foodsTypes } from '../../store/types/foods.type';
export const EditFood = () => {

    const router = useRouter();
    const dispatch = useDispatch();


//setting dropdown selected items

    const [selectedRestaurant, setSelectedRestaurant] = useState(null);



//use selectors for setting dispatch to variable.
    const addonList = useSelector((state:RootState) => state.listAddons);
    const { loading: addonsLoading, success:addonSuccess, addons: addonslist } = addonList;
    const resFoodCat = useSelector((state:RootState) => state.listFoodCategory);
    const { loading: foodCatLoading, success: foodCatSuccess, foodCat: foodCatlist } = resFoodCat;
    const resRestaurants = useSelector((state:RootState) => state.listRestaurant);
    const { loading: restaurantsLoading, success: restaurantsSuccess, restaurants} = resRestaurants;
    const resFood = useSelector((state:RootState) => state.findFood);
    const { loading: foodLoading , success: foodSuccess, food: foods } = resFood;
    const resUpdatedFood = useSelector((state:RootState) => state.updateFood);
    const { loading: updatedFoodLoading , success: updatedFoodSuccess, food: updatedFood } = resUpdatedFood;


    

    useEffect(() =>{
        if(!addonSuccess)
            dispatch(listAddons());

        if(!foodCatSuccess)
            dispatch(listFoodCategory());

        if(!restaurantsSuccess)
            dispatch(listRestaurant());

        if(!foodSuccess)
           {
             dispatch( findFood(router.query.id));
           }

        if(updatedFoodSuccess){
            dispatch({
                type: foodsTypes.FOOD_UPDATE_RESET
              })
              dispatch({
                type: foodsTypes.FOOD_FIND_RESET
              })

        }
    }, [updatedFoodSuccess,addonSuccess,foodCatSuccess,restaurantsSuccess,foodSuccess, router.query.id]);


    return (
        <EditFoods 
            updatedFoodSuccess={updatedFoodSuccess}
            addonSuccess={addonSuccess}
            foodCatSuccess={foodCatSuccess}
            restaurantsSuccess={restaurantsSuccess}
            foodSuccess={foodSuccess}
            selectedRestaurant={selectedRestaurant}
            id ={router.query.id}
            foods={foods}
            restaurants={restaurants}
            addonslist={addonslist}
            foodCatlist={foodCatlist}
            page = {"foods"} 
            />
            )
}

 export default  (EditFood);
