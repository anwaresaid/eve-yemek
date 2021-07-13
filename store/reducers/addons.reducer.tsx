import { addonsTypes } from '../types/addons.type';

const initialState = [];

export const listAddonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case addonsTypes.ADDON_LIST_REQUEST:
      return { loading: true };
    case addonsTypes.ADDON_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        addons: action.payload,
      };

    case addonsTypes.ADDON_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const createAddonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case addonsTypes.ADDON_CREATE_REQUEST:
      return { loading: true };

    case addonsTypes.ADDON_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        addons: action.payload,
      };

    case addonsTypes.ADDON_CREATE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    case addonsTypes.ADDON_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const findAddonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case addonsTypes.ADDON_FIND_REQUEST:
      return { loading: true };
    case addonsTypes.ADDON_FIND_SUCCESS:
      return {
        loading: false,
        success: true,
        addon: action.payload,
      };
    case addonsTypes.ADDON_FIND_RESET:
      return {};

    case addonsTypes.ADDON_FIND_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const updateAddonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case addonsTypes.ADDON_UPDATE_REQUEST:
      return { loading: true };
    case addonsTypes.ADDON_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        addons: action.payload,
      };
    case addonsTypes.ADDON_UPDATE_RESET:
      return {};

    case addonsTypes.ADDON_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
