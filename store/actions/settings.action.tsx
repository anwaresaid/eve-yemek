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

export const forgotPasswordRequest =
    (email: string) => async (dispatch, getState) => {
        try {
            dispatch({
                type: settingsTypes.SETTINGS_FORGOT_PASSWORD_REQUEST,
            });

            const settingsService = new SettingsService();

            const res = await settingsService.forgotPasswordRequest(email);

            dispatch({
              type: settingsTypes.SETTINGS_FORGOT_PASSWORD_SUCCESS,
            });
        } catch (error) {
          dispatch({
            type: settingsTypes.SETTINGS_FORGOT_PASSWORD_FAIL,
            payload:
                error.response && error.response.data?.error?.message
                    ? error.response.data.error.message
                    : error.message,
          });
        }
    };

export const updateSchedule = (resturantId:string, scheduleDays: object) => async (dispatch, getState) => {
    try {
        dispatch({
            type: settingsTypes.SETTINGS_SCHEDULE_UPDATE_REQUEST,
        });

        const settingsService = new SettingsService();

        const res = await settingsService.updateSchedule(resturantId, scheduleDays);

        dispatch({
          type: settingsTypes.SETTINGS_SCHEDULE_UPDATE_SUCCESS,
        });
    } catch (error) {
      dispatch({
        type: settingsTypes.SETTINGS_SCHEDULE_UPDATE_FAIL,
        payload:
            error.response && error.response.data?.error?.message
                ? error.response.data.error.message
                : error.message,
      });
    }
}

export const updateScheduleReset = () => async (dispatch, getState) => {
    dispatch({
        type: settingsTypes.SETTINGS_SCHEDULE_UPDATE_RESET,
    });
}
