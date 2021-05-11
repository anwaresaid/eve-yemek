import { restaurantsTypes } from "../types/restaurants.type";
import RestaurantService from "../services/restaurants.service";



export const listRestaurantOwners = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: restaurantsTypes.RESTAURAT_OWNER_LIST_REQUEST,
      });
  
      const restaurantService = new RestaurantService;
      const res = await restaurantService.getRestaurantOwners();
      dispatch({
        type: restaurantsTypes.RESTAURAT_OWNER_LIST_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: restaurantsTypes.RESTAURAT_OWNER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateRestaurant = (restaurant_ID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: restaurantsTypes.RESTAURAT_UPDATE_REQUEST,
      });
  
      const restaurantService = new RestaurantService;
      const res = await restaurantService.updateRestaurant(restaurant_ID);
      dispatch({
        type: restaurantsTypes.RESTAURAT_UPDATE_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: restaurantsTypes.RESTAURAT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };