import { settingsTypes } from '../types/settings.type';

const initialState = [];

export const listSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case settingsTypes.SETTINGS_LIST_REQUEST:
      return { loading: true };

    case settingsTypes.SETTINGS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        settings: action.payload,
      };

    case settingsTypes.SETTINGS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
