import { foodsTypes } from "../types/foods.type";
import FoodsService from "../services/foods.service";

//Example flow

export const createFood = (
  { name,
    image,
    price,
    currency_type,
    discount_price,
    restaurant_id,
    food_category_id,
    is_veg,
    featured,
    addon_id,
    active,
    description,
    add_on_categories,
    variants }
) => async dispatch => {
  try {

    dispatch({
      type: foodsTypes.FOOD_CREATE_REQUEST
    });

    const foodService = new FoodsService;
    const res = await foodService.createFood(
      name,
      description,
      image,
      price,
      currency_type,
      discount_price,
      restaurant_id,
      food_category_id,
      addon_id,
      is_veg,
      featured,
      active,
      add_on_categories,
      variants
    );

    dispatch({
      type: foodsTypes.FOOD_CREATE_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: foodsTypes.FOOD_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.error.message
          : error.response.data.error.message,
    });
  }
}
export const updateFood = (id, updatedFood) => async dispatch => {
  try {

    dispatch({
      type: foodsTypes.FOOD_UPDATE_REQUEST
    });

    const foodService = new FoodsService;
    const res = await foodService.updateFood(id, { ...updatedFood });

    dispatch({
      type: foodsTypes.FOOD_UPDATE_SUCCESS,
      payload: res,
    });
    dispatch({
      type: foodsTypes.FOOD_FIND_UPDATE,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: foodsTypes.FOOD_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  } finally {
    dispatch({
      type: foodsTypes.FOOD_UPDATE_RESET,
    });
  }
}
export const findFood = (id) => async dispatch => {
  try {

    dispatch({
      type: foodsTypes.FOOD_FIND_REQUEST
    });

    const foodService = new FoodsService;
    const res = await foodService.findFood(id);

    dispatch({
      type: foodsTypes.FOOD_FIND_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: foodsTypes.FOOD_FIND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
export const listFood = () => async dispatch => {
  try {

    dispatch({
      type: foodsTypes.FOOD_LIST_REQUEST
    });

    const foodService = new FoodsService;
    const res = await foodService.getAllFoods(0, 9999);
    dispatch({
      type: foodsTypes.FOOD_LIST_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: foodsTypes.FOOD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
export const listFoodByRestaurant = (id) => async dispatch => {
  try {

    dispatch({
      type: foodsTypes.FOOD_LIST_BY_RESTAURANT_REQUEST
    });

    const foodService = new FoodsService;
    const res = await foodService.getFoodByRestaurant(id);

    dispatch({
      type: foodsTypes.FOOD_LIST_BY_RESTAURANT_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: foodsTypes.FOOD_LIST_BY_RESTAURANT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}