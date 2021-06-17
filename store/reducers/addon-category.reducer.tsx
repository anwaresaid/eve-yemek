import { addonCategoryTypes } from '../types/addon-category.type';

const initialState = [];

export const listAddonCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case addonCategoryTypes.ADDON_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case addonCategoryTypes.ADDON_CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        addonCat: action.payload,
      };

    case addonCategoryTypes.ADDON_CATEGORY_LIST_FAIL:
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
    case addonCategoryTypes.ADDON_CATEGORY_DETAILS_REQUEST:
      return { loading: true };

    case addonCategoryTypes.ADDON_CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        addonCategory: action.payload,
      };

    case addonCategoryTypes.ADDON_CATEGORY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case addonCategoryTypes.ADDON_CATEGORY_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const updateAddonCategoryReducer = (state = [], action) => {
  switch (action.type) {
    case addonCategoryTypes.ADDON_CATEGORY_UPDATE_REQUEST:
      return { loading: true };

    case addonCategoryTypes.ADDON_CATEGORY_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        updatedAddonCategory: action.payload,
      };

    case addonCategoryTypes.ADDON_CATEGORY_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case addonCategoryTypes.ADDON_CATEGORY_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const createAddonCategoryReducer = (state = [], action) => {
  switch (action.type) {
    case addonCategoryTypes.ADDON_CATEGORY_CREATE_REQUEST:
      return { loading: true };

    case addonCategoryTypes.ADDON_CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        newAddonCategory: action.payload,
      };

    case addonCategoryTypes.ADDON_CATEGORY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case addonCategoryTypes.ADDON_CATEGORY_CREATE_RESET:
      return {}

    default:
      return state;
  }
};
