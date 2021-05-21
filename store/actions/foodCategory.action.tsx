import { foodCategoryTypes } from '../types/foodCategory.type';
import FoodCategoryService from '../services/food-category.service';

export const listFoodCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: foodCategoryTypes.FOOD_CATEGORY_LIST_REQUEST,
    });

    const foodCategoryService = new FoodCategoryService();
    const res = await foodCategoryService.getFoodCategory();
    dispatch({
      type: foodCategoryTypes.FOOD_CATEGORY_LIST_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: foodCategoryTypes.FOOD_CATEGORY_LIST_FAIL,
      payload:
        err.response && err.response.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createFoodCategory = (data: any) => async (dispatch) => {
  try {
    dispatch({
      type: foodCategoryTypes.FOOD_CATEGORY_CREATE_REQUEST,
    });

    const foodCategoryService = new FoodCategoryService();

    const res = await foodCategoryService.createFoodCategory(data);

    dispatch({
      type: foodCategoryTypes.FOOD_CATEGORY_CREATE_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: foodCategoryTypes.FOOD_CATEGORY_CREATE_FAIL,
      payload:
        err.response && err.response.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getFoodCategoryDetails = (id: any) => async (dispatch) => {
  try {
    dispatch({
      type: foodCategoryTypes.FOOD_CATEGORY_DETAILS_REQUEST,
    });

    const foodCategoryService = new FoodCategoryService();
    const res = await foodCategoryService.getFoodCategoryDetails(id);
    dispatch({
      type: foodCategoryTypes.FOOD_CATEGORY_DETAILS_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: foodCategoryTypes.FOOD_CATEGORY_CREATE_FAIL,
      payload:
        err.response && err.response.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateFoodCategory = (id:string, data: any) => async (dispatch) => {
  try {
    dispatch({
      type: foodCategoryTypes.FOOD_CATEGORY_UPDATE_REQUEST,
    });

    const foodCategoryService = new FoodCategoryService();

    const res = await foodCategoryService.updateFoodCategory(id, data);

    dispatch({
      type: foodCategoryTypes.FOOD_CATEGORY_UPDATE_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: foodCategoryTypes.FOOD_CATEGORY_UPDATE_FAIL,
      payload:
        err.response && err.response.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};