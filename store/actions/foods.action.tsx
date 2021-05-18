import { foodsTypes } from "../types/foods.type";
import FoodsService from "../services/foods.service";

//Example flow

export const createFood = (
    {   name,
        image, 
        price,
        discount_price,
        restaurant_id,
        category_id, 
        add_on_id,
        is_veg,
        featured,
        is_active,
        description,} 
     ) => async dispatch => {
    try{
        
        dispatch({type: foodsTypes.FOOD_CREATE_REQUEST})
        
        const foodService = new FoodsService;
        const res = await foodService.createFood(
            name,
            description,
            image,
            price,
            discount_price,
            restaurant_id,
            category_id,
            add_on_id,
            is_veg,
            featured,
            is_active
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

      dispatch({type:foodsTypes.FOOD_CREATE_REQUEST});

  }
}