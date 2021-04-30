import { foodsTypes } from "../types/foods.type";
import FoodsService from "../services/foods.service";

//Example flow

const getAllFoods = () => async dispatch => {
    try{

        const res = await FoodsService.getAllFoods();

        if(res?.error){
            // Dispatch error
            return;
        }

        dispatch({type:foodsTypes.GET_ALL_FOODS, payload:res});

    }catch(err){
        return Promise.reject(err);
    }
}

export default {
    getAllFoods
}