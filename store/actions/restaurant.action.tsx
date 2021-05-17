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

export const createRestaurant = (restaurantCreate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: restaurantsTypes.RESTAURAT_CREATE_REQUEST,
      });
  
      const restaurantService = new RestaurantService;
      const res = await restaurantService.createRestaurant(restaurantCreate);
      dispatch({
        type: restaurantsTypes.RESTAURAT_CREATE_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: restaurantsTypes.RESTAURAT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const updateRestaurant = (id,restaurantUpdate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: restaurantsTypes.RESTAURAT_UPDATE_REQUEST,
      });
  
      const restaurantService = new RestaurantService;
      const res = await restaurantService.updateRestaurant(id,restaurantUpdate);
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


  
export const listRestaurant = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: restaurantsTypes.RESTAURAT_LIST_REQUEST,
    });

    const restaurantService = new RestaurantService;
    const res = await restaurantService.getRestaurants();
    dispatch({
      type: restaurantsTypes.RESTAURAT_LIST_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: restaurantsTypes.RESTAURAT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const findRestaurant = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: restaurantsTypes.RESTAURAT_FIND_REQUEST,
    });

    const restaurantService = new RestaurantService;
    const res = await restaurantService.findRestaurant(id);
    dispatch({
      type: restaurantsTypes.RESTAURAT_FIND_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: restaurantsTypes.RESTAURAT_FIND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};