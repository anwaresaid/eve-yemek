import { addonsTypes } from "../types/addons.type";
import AddOnsService from "../services/addons.service";



export const listAddons = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: addonsTypes.ADDON_LIST_REQUEST,
      });
  
      const addonService = new AddOnsService;
      const res = await addonService.getAllAddOns(0, 9999);
      dispatch({
        type: addonsTypes.ADDON_LIST_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: addonsTypes.ADDON_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createAddons = (addon) => async (dispatch, getState) => {
    try {
      dispatch({
        type: addonsTypes.ADDON_CREATE_REQUEST,
      });
  
      const addonService = new AddOnsService;
      const res = await addonService.createAddons(addon);
      dispatch({
        type: addonsTypes.ADDON_CREATE_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: addonsTypes.ADDON_CREATE_FAIL,
        payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
      });
    }
  };
export const findAddons = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: addonsTypes.ADDON_FIND_REQUEST,
      });
  
      const addonService = new AddOnsService;
      const res = await addonService.findAddons(id);
      dispatch({
        type: addonsTypes.ADDON_FIND_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: addonsTypes.ADDON_FIND_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const updateAddons = (id,addon) => async (dispatch, getState) => {
    try {
      dispatch({
        type: addonsTypes.ADDON_UPDATE_REQUEST,
      });
  
      const addonService = new AddOnsService;
      const res = await addonService.updateAddons(id,addon);
      dispatch({
        type: addonsTypes.ADDON_UPDATE_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: addonsTypes.ADDON_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };