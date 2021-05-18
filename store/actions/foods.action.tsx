import { foodsTypes } from "../types/foods.type";
import FoodsService from "../services/foods.service";

//Example flow

export const createFood = (
    {   name,
        image, 
        price,
        discount_price,
        restaurant_id,
        food_category_id, 
        add_on_id,
        is_veg,
        featured,
        active,
        description,} 
     ) => async dispatch => {
    try{
        
        dispatch({
          type: foodsTypes.FOOD_CREATE_REQUEST
        });
        
        const foodService = new FoodsService;
        const res = await foodService.createFood(
            name,
            description,
            image,
            price,
            discount_price,
            restaurant_id,
            food_category_id,
            add_on_id,
            is_veg,
            featured,
            active
        );

        dispatch({
            type: foodsTypes.FOOD_CREATE_SUCCESS,
            payload: res,
          });
        }catch (error) {
        dispatch({
          type: foodsTypes.FOOD_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
  }
}
export const updateFood = (id,updatedFood) => async dispatch => {
    try{
        
        dispatch({
          type: foodsTypes.FOOD_UPDATE_REQUEST
        });
        
        const foodService = new FoodsService;
        const res = await foodService.updateFood(id,{...updatedFood});

        dispatch({
            type: foodsTypes.FOOD_UPDATE_SUCCESS,
            payload: res,
          });
        }catch (error) {
        dispatch({
          type: foodsTypes.FOOD_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
  }
}
export const findFood = (id) => async dispatch => {
    try{
        
        dispatch({
          type: foodsTypes.FOOD_FIND_REQUEST
        });
        
        const foodService = new FoodsService;
        const res = await foodService.findFood(id);

        dispatch({
            type: foodsTypes.FOOD_FIND_SUCCESS,
            payload: res,
          });
        }catch (error) {
        dispatch({
          type: foodsTypes.FOOD_FIND_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
  }
}