import { foodCategoryTypes } from "../types/foodCategory.type";
import FoodCategoryService from "../services/food-category.service";


export const listFoodCategory = () => async (dispatch) =>{
    try{ 
        dispatch({
            type:foodCategoryTypes.FOOD_CATEGORY_LIST_REQUEST,
        });

        const foodCategoryService = new FoodCategoryService;
        const res = await foodCategoryService.getFoodCategory();
        dispatch({
            type:foodCategoryTypes.FOOD_CATEGORY_LIST_SUCCESS,
            payload: res
        });
    }catch(err){
        dispatch({
            type:foodCategoryTypes.FOOD_CATEGORY_LIST_FAIL,
            payload: err.response && err.response.response.data.message
                ? err.response.data.message
                : err.message,
        })
    }
}