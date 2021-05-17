import { restaurantsTypes } from "../types/restaurant.type";
import RestaurantsService from "../services/restaurants.service";



export const listRestaurants = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: restaurantsTypes.RESTAURANT_LIST_REQUEST,
      });
  
      const restaurantService = new RestaurantsService;
      const res = await restaurantService.getRestaurants();
      dispatch({
        type: restaurantsTypes.RESTAURANT_LIST_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: restaurantsTypes.RESTAURANT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };