import { foodCategoryTypes } from '../types/foodCategory.type';

const initialState = [];

export const listFoodCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case foodCategoryTypes.FOOD_CATEGORY_LIST_REQUEST:
      return { loading: true };

    case foodCategoryTypes.FOOD_CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        foodCat: action.payload,
      };

    case foodCategoryTypes.FOOD_CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const foodCategoryDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case foodCategoryTypes.FOOD_CATEGORY_DETAILS_REQUEST:
      return { loading: true };

    case foodCategoryTypes.FOOD_CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        foodCategory: action.payload,
      };

    case foodCategoryTypes.FOOD_CATEGORY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const createFoodCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case foodCategoryTypes.FOOD_CATEGORY_CREATE_REQUEST:
      return { loading: true };

    case foodCategoryTypes.FOOD_CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        newFoodCategory: action.payload,
      };

    case foodCategoryTypes.FOOD_CATEGORY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const updateFoodCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case foodCategoryTypes.FOOD_CATEGORY_UPDATE_REQUEST:
      return { loading: true };

    case foodCategoryTypes.FOOD_CATEGORY_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        updatedFoodCategory: action.payload,
      };

    case foodCategoryTypes.FOOD_CATEGORY_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case foodCategoryTypes.FOOD_CATEGORY_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
