import { addonCategoryTypes } from "../types/addon-category.type";
import AddonCategoryService from "../services/addon-category.service";



export const listAddonCategory = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: addonCategoryTypes.ADDON_CATEGORY_LIST_REQUEST,
      });
  
      const addonCategoryService = new AddonCategoryService;
      const res = await addonCategoryService.getAddonCategory();
      dispatch({
        type: addonCategoryTypes.ADDON_CATEGORY_LIST_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: addonCategoryTypes.ADDON_CATEGORY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };