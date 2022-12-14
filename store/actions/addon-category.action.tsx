import { addonCategoryTypes } from '../types/addon-category.type';
import AddOnCategoryService from '../services/addon-category.service';

export const listAddonCategory = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: addonCategoryTypes.ADDON_CATEGORY_LIST_REQUEST,
    });

    const addonCategoryService = new AddOnCategoryService();
    const res = await addonCategoryService.getAllAddonCategories(0, 9999);
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

export const getAddonCategoryDetails = (id: any) => async (dispatch) => {
  try {
    dispatch({
      type: addonCategoryTypes.ADDON_CATEGORY_DETAILS_REQUEST,
    });

    const addonCategoryService = new AddOnCategoryService();
    const res = await addonCategoryService.getAddonCategoryDetails(id);
    dispatch({
      type: addonCategoryTypes.ADDON_CATEGORY_DETAILS_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: addonCategoryTypes.ADDON_CATEGORY_DETAILS_FAIL,
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
        type: addonCategoryTypes.ADDON_CATEGORY_UPDATE_REQUEST,
      });

      const addonCategoryService = new AddOnCategoryService();
      const res = await addonCategoryService.updateAddonCategory(id, data);
      dispatch({
        type: addonCategoryTypes.ADDON_CATEGORY_UPDATE_SUCCESS,
        payload: res,
      });
    } catch (err) {
      dispatch({
        type: addonCategoryTypes.ADDON_CATEGORY_UPDATE_FAIL,
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
      type: addonCategoryTypes.ADDON_CATEGORY_CREATE_REQUEST,
    });

    const addonCategoryService = new AddOnCategoryService();
    const res = await addonCategoryService.createAddonCategory(data);
    dispatch({
      type: addonCategoryTypes.ADDON_CATEGORY_CREATE_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: addonCategoryTypes.ADDON_CATEGORY_CREATE_FAIL,
      payload:
        err.response && err.response.data.error.message
          ? err.response.data.error.message
          : err.message,
    });
  }
};
