import { restaurantsTypes } from "../types/restaurants.type";
import RestaurantService from "../services/restaurants.service";
import { parseDateInAllRows } from "../../helpers/dateFunctions";



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
          ? error.response.data.error.message
          : error.response.data.error.message,
          
    });
  }
};

export const updateRestaurant = (id, restaurantUpdate) => async (dispatch, getState) => {
  try {
    dispatch({
      type: restaurantsTypes.RESTAURAT_UPDATE_REQUEST,
    });

    const restaurantService = new RestaurantService;
    const res = await restaurantService.updateRestaurant(id, restaurantUpdate);
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



export const listRestaurant = (offset, limit) => async (dispatch, getState) => {
  try {
    dispatch({
      type: restaurantsTypes.RESTAURAT_LIST_REQUEST,
    });

    const restaurantService = new RestaurantService;
    const res = await restaurantService.getRestaurants({offset: offset, limit: limit});
    dispatch({
      type: restaurantsTypes.RESTAURAT_LIST_SUCCESS,
      payload: parseDateInAllRows(res),
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

export const listOwnedRestaurants = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: restaurantsTypes.OWNED_RESTAURANTS_REQUEST,
    });

    const restaurantService = new RestaurantService;

    const res = await restaurantService.listOwnedRestaurants();
    dispatch({
      type: restaurantsTypes.OWNED_RESTAURANTS_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: restaurantsTypes.OWNED_RESTAURANTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const openCloseRestaurant = (id, statusBody) => async (dispatch, getState) => {
  try {
    const restaurantService = new RestaurantService;
    const res = await restaurantService.openCloseOwnedRestaurant(id, statusBody);
    dispatch({
      type: restaurantsTypes.OWNED_RESTAURANT_OPEN_CLOSE,
      payload: res,
    });
  } catch (error) {
    console.log(error)
  }
};
