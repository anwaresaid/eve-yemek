import { restaurantsTypes } from "../types/restaurants.type";

const initialState = [];

export const listRestaurantOwnersReducer = (state = initialState, action) => {
  switch (action.type) {
    case restaurantsTypes.RESTAURAT_OWNER_LIST_REQUEST:
      return { loading: true}
    case restaurantsTypes.RESTAURAT_OWNER_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        restaurantOwners: action.payload
      }

    case restaurantsTypes.RESTAURAT_OWNER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      } 
      
    default:
      return state;
  }
};


export const updateRestaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case restaurantsTypes.RESTAURAT_UPDATE_REQUEST:
      return { loading: true}
    case restaurantsTypes.RESTAURAT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        restaurant: action.payload
      }

    case restaurantsTypes.RESTAURAT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      } 
      
    default:
      return state;
  }
};