import { addonCategoryTypes } from "../types/addon-category.type";

const initialState = [];

export const listAddonCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case addonCategoryTypes.ADDON_CATEGORY_LIST_REQUEST:
      return { loading: true}
    case addonCategoryTypes.ADDON_CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        addonCat: action.payload
      }

    case addonCategoryTypes.ADDON_CATEGORY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      } 
      
    default:
      return state;
  }
};

