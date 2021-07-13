import { i18n } from "../../language";
import { userTypes } from "../types/user.type";

const initialState = [];

export const loginReducer = (state = {attempts: 0, failed_attempts: 0}, action) => {
    const { type, payload } = action;

    switch (type) {
        case userTypes.LOGIN:
            return {
                ...state,
                attempts: state.attempts + 1,
                login_error_msg: i18n.t('takingYouToYourDashboard'),
                user: payload,
            };
        case userTypes.LOGIN_FAILED:
            return {
                ...state,
                attempts: state.attempts + 1,
                failed_attempts: state.failed_attempts + 1, 
                login_error_msg: payload?.login_error_msg,
            };

        default:
            return state;
    }
};

export const changePasswordReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case userTypes.CHANGE_PASSWORD_REQUEST:
            return {
                loading: true,
            };
        case userTypes.CHANGE_PASSWORD_FAILED:
            return {
                loading: false,
				error:action.payload
            };
        case userTypes.CHANGE_PASSWORD_SUCCESS:
            return {
                loading: false,
				success:true
            };

        default:
            return state;
    }
};
