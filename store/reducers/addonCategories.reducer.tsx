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

export const addonCategoryDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case addonCategoriesTypes.ADDON_CATEGORY_DETAILS_REQUEST:
      return { loading: true };

    case addonCategoriesTypes.ADDON_CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        addonCategory: action.payload,
      };

    case addonCategoriesTypes.ADDON_CATEGORY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case addonCategoriesTypes.ADDON_CATEGORY_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const updateAddonCategoryReducer = (state = [], action) => {
  switch (action.type) {
    case addonCategoriesTypes.ADDON_CATEGORY_UPDATE_REQUEST:
      return { loading: true };

    case addonCategoriesTypes.ADDON_CATEGORY_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        updatedAddonCategory: action.payload,
      };

    case addonCategoriesTypes.ADDON_CATEGORY_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case addonCategoriesTypes.ADDON_CATEGORY_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const createAddonCategoryReducer = (state = [], action) => {
  switch (action.type) {
    case addonCategoriesTypes.ADDON_CATEGORY_CREATE_REQUEST:
      return { loading: true };

    case addonCategoriesTypes.ADDON_CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        newAddonCategory: action.payload,
      };

    case addonCategoriesTypes.ADDON_CATEGORY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
