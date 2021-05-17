import { addonsTypes } from "../types/addons.type";

const initialState = [];

export const listAddonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case addonsTypes.ADDON_LIST_REQUEST:
      return { loading: true}
    case addonsTypes.ADDON_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        addons: action.payload
      }

    case addonsTypes.ADDON_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      } 
      
    default:
      return state;
  }
};

