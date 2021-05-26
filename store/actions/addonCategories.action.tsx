import { addonCategoriesTypes } from '../types/addon_categories.type';
import AddonCategoriesService from '../services/addonCategories.service';

export const listAddonCategories = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: addonCategoriesTypes.ADDON_CATEGORIES_LIST_REQUEST,
    });

    const addonCategoriesService = new AddonCategoriesService();
    const res = await addonCategoriesService.getAddonCategories();

    dispatch({
      type: addonCategoriesTypes.ADDON_CATEGORIES_LIST_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: addonCategoriesTypes.ADDON_CATEGORIES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
