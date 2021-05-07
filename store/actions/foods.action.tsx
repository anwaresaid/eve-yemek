import { foodsTypes } from "../types/foods.type";
import FoodsService from "../services/foods.service";

//Example flow

const getAllFoods = () => async dispatch => {
    try{
        
        dispatch({type: foodsTypes.FOOD_CREATE_REQUEST})
        
        const foodService = new FoodsService;
        const res = await foodService.getFoods();

        if(res?.error){
            // Dispatch error
            return;
        }

        dispatch({type:foodsTypes.FOOD_CREATE_REQUEST});

    }catch(err){
        return Promise.reject(err);
    }
}

export default {
    getAllFoods
}