import { settingsTypes } from "../types/settings.type";
import SettingsService from "../services/settings.service";
import { i18n } from "../../language";

export const listSettings = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: settingsTypes.SETTINGS_LIST_REQUEST,
        });

        const settingsService = new SettingsService();

        const res = await settingsService.getSettings();

        dispatch({
            type: settingsTypes.SETTINGS_LIST_SUCCESS,
            payload: res,
        });
    } catch (error) {
        dispatch({
            type: settingsTypes.SETTINGS_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateSettings = (data: any) => async (dispatch, getState) => {
    try {
        dispatch({
            type: settingsTypes.SETTINGS_UPDATE_REQUEST,
        });

        const settingsService = new SettingsService();

        const res = await settingsService.updateSettings(data);

        dispatch({
            type: settingsTypes.SETTINGS_UPDATE_SUCCESS,
            payload: res,
        });
    } catch (error) {
        dispatch({
            type: settingsTypes.SETTINGS_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const changePasswordRequest =
    (email: string) => async (dispatch, getState) => {
        try {
            dispatch({
                type: settingsTypes.SETTINGS_CHANGE_PASSWORD_REQUEST,
            });

            const settingsService = new SettingsService();

            const res = await settingsService.changePasswordRequest(email);

            console.log(res);
        } catch (error) {
          dispatch({
            type: settingsTypes.SETTINGS_CHANGE_PASSWORD_FAIL,
            payload:
                error.response && error.response.data?.error?.message
                    ? error.response.data.error.message
                    : error.message,
          });
        }
    };
