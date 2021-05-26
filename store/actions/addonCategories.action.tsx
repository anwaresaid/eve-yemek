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

export const getAddonCategoryDetails = (id: any) => async (dispatch) => {
  try {
    dispatch({
      type: addonCategoriesTypes.ADDON_CATEGORY_DETAILS_REQUEST,
    });

    const addonCategoriesService = new AddonCategoriesService();
    const res = await addonCategoriesService.getAddonCategoryDetails(id);
    dispatch({
      type: addonCategoriesTypes.ADDON_CATEGORY_DETAILS_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: addonCategoriesTypes.ADDON_CATEGORY_DETAILS_FAIL,
      payload:
        err.response && err.response.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateAddonCategory =
  (id: string, data: any) => async (dispatch) => {
    try {
      dispatch({
        type: addonCategoriesTypes.ADDON_CATEGORY_UPDATE_REQUEST,
      });

      const addonCategoriesService = new AddonCategoriesService();
      const res = await addonCategoriesService.updateAddonCategory(id, data);
      dispatch({
        type: addonCategoriesTypes.ADDON_CATEGORY_UPDATE_SUCCESS,
        payload: res,
      });
    } catch (err) {
      dispatch({
        type: addonCategoriesTypes.ADDON_CATEGORY_UPDATE_FAIL,
        payload:
          err.response && err.response.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const createAddonCategory = (data: any) => async (dispatch) => {
  try {
    dispatch({
      type: addonCategoriesTypes.ADDON_CATEGORY_CREATE_REQUEST,
    });

    const addonCategoriesService = new AddonCategoriesService();
    const res = await addonCategoriesService.createAddonCategory(data);
    dispatch({
      type: addonCategoriesTypes.ADDON_CATEGORY_CREATE_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: addonCategoriesTypes.ADDON_CATEGORY_CREATE_FAIL,
      payload:
        err.response && err.response.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
