import { foodsTypes } from "../types/foods.type";
import FoodsService from "../services/foods.service";

const getAllFoods = () => async dispatch => {
    try{

        const res = await FoodsService.getAllFoods();

    }catch(err){
        return Promise.reject(err);
    }
}

export default {
    getAllFoods
}