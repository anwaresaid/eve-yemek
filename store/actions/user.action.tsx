import { userTypes } from "../types/user.type";
import UserService from "../services/user.service";
import auth from "../../helpers/core/auth";

const login =
    (email: string, password: string, remember: boolean) =>
    async (dispatch) => {
        try {
            const res: any = await UserService.login(email, password, remember);

            if (res?.ok) {
                const user = {
                    id: res?.data?.id,
                    email: res?.data?.email,
                    roles: res?.data?.roles,
                    access_token: res?.data?.access_token,
                };
                auth.login(user);
                await dispatch({ type: userTypes.LOGIN, payload: user });
                window.location.replace("/");
            } else {
                await dispatch({
                    type: userTypes.LOGIN_FAILED,
                    payload: {
                        login_error_msg:
                            res?.err?.message ||
                            "Something went wrong while logging in",
                    },
                });
            }
        } catch (err) {
            dispatch({
                type: userTypes.LOGIN_FAILED,
                payload: {
                    login_error_msg: "Something went wrong while logging in",
                },
            });
        }
    };

export const changePassword =
    (new_password: string, password: string) => async (dispatch) => {
        try {
            dispatch({
                type: userTypes.CHANGE_PASSWORD_REQUEST,
            });

            const res = await UserService.changePassword(
                new_password,
                password
            );

            dispatch({
                type: userTypes.CHANGE_PASSWORD_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: userTypes.CHANGE_PASSWORD_FAILED,
                payload:
                    error.response && error.response.data?.error?.message
                        ? error.response.data.error.message
                        : error.message,
            });
        }
    };

export default {
    login
};
