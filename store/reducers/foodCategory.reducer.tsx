import { foodCategoryTypes } from "../types/foodCategory.type";

const initialState = [];

export const listFoodCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case foodCategoryTypes.FOOD_CATEGORY_LIST_REQUEST:
      return { loading: true}
    case foodCategoryTypes.FOOD_CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        foodCat: action.payload
      }

    case foodCategoryTypes.FOOD_CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        error: action.payload
      } 
      
    default:
      return state;
  }
};

