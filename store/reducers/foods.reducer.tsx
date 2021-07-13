import { foodsTypes } from "../types/foods.type";

const initialState = [];

export const createFoodReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (action.type) {
    case foodsTypes.FOOD_CREATE_REQUEST:
      return { loading: true}
    case foodsTypes.FOOD_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        food: action.payload
      }

    case foodsTypes.FOOD_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload
      } 
      
    case foodsTypes.FOOD_CREATE_RESET:
      return {
        success: false,
        loading: false
      }
    default:
      return state;
  }
};

export const updateFoodReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (action.type) {
    case foodsTypes.FOOD_UPDATE_REQUEST:
      return { loading: true}
    case foodsTypes.FOOD_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        food: action.payload
      }

    case foodsTypes.FOOD_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      } 
    case foodsTypes.FOOD_UPDATE_RESET:
      return{}
      
    default:
      return state;
  }
};

export const findFoodReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (action.type) {
    case foodsTypes.FOOD_FIND_REQUEST:
      return { loading: true}
    case foodsTypes.FOOD_FIND_SUCCESS:
      return {
        loading: false,
        success: true,
        food: action.payload
      }
    case foodsTypes.FOOD_FIND_UPDATE:
      return {
        food: action.payload
      }
    case foodsTypes.FOOD_FIND_FAIL:
      return {
        loading: false,
        error: action.payload
      } 
      
    default:
      return state;
  }
};

export const listFoodReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (action.type) {
    case foodsTypes.FOOD_LIST_REQUEST:
      return { loading: true}
    case foodsTypes.FOOD_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        foods: action.payload
      }

    case foodsTypes.FOOD_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      } 
      
    default:
      return state;
  }
};
export const listFoodByRestaurantReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (action.type) {
    case foodsTypes.FOOD_LIST_BY_RESTAURANT_REQUEST:
      return { loading: true}
    case foodsTypes.FOOD_LIST_BY_RESTAURANT_SUCCESS:
      return {
        loading: false,
        success: true,
        foods: action.payload
      }

    case foodsTypes.FOOD_LIST_BY_RESTAURANT_FAIL:
      return {
        loading: false,
        error: action.payload
      } 
      
    default:
      return state;
  }
};
