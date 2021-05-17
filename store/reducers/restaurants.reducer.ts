import { restaurantsTypes } from "../types/restaurant.type";

const initialState = [];

export const listRestaurantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case restaurantsTypes.RESTAURANT_LIST_REQUEST:
      return { loading: true}
    case restaurantsTypes.RESTAURANT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        restaurants: action.payload
      }

    case restaurantsTypes.RESTAURANT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      } 
      
    default:
      return state;
  }
};

