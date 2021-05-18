import { addonsTypes } from "../types/addons.type";
import AddonService from "../services/addons.service";



export const listAddons = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: addonsTypes.ADDON_LIST_REQUEST,
      });
  
      const addonService = new AddonService;
      const res = await addonService.getAddons();
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