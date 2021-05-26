import { addonCategoriesTypes } from '../types/addon_categories.type';

export const listAddonCategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case addonCategoriesTypes.ADDON_CATEGORIES_LIST_REQUEST:
      return { loading: true };

    case addonCategoriesTypes.ADDON_CATEGORIES_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        addonCategories: action.payload,
      };

    case addonCategoriesTypes.ADDON_CATEGORIES_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
