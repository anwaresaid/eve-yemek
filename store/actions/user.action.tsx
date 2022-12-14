import { userTypes } from '../types/user.type';
import UserService from '../services/user.service';
import auth from '../../helpers/core/auth';
import { i18n } from '../../language';

export const login =
  (email: string, password: string, remember: boolean) => async (dispatch) => {
    try {
      const userService = new UserService();
      const res: any = await userService.login(email, password, remember);

      if (res?.ok) {
        const user = {
          id: res?.data.user?.id,
          email: res?.data.user?.email,
          roles: res?.data.user?.roles,
          ...(res?.data?.user?.roles?.includes('restaurant_owner') && {
            restaurant_ids: res?.data?.restaurant_ids,
          }),
          access_token: res?.data.access_token,
        };
        auth.login(user);
        await dispatch({ type: userTypes.LOGIN, payload: user });
        window.location.replace('/');
      } else {
        var errorMessage;
        switch (res.err.errorCode) {
          case 401:
            errorMessage = i18n.t('invalidEmailOrPassword');
            break;
          case 404:
            errorMessage = i18n.t('userNotFound');
            break;
          default:
            errorMessage =
              res.err.error.message ??
              i18n.t('somethingWentWrongWhileLoggingIn');
        }
        await dispatch({
          type: userTypes.LOGIN_FAILED,
          payload: {
            login_error_msg: errorMessage,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: userTypes.LOGIN_FAILED,
        payload: {
          login_error_msg: i18n.t('somethingWentWrongWhileLoggingIn'),
        },
      });
    }
  };

export const changePassword =
  (new_password: string, password: string) => async (dispatch) => {
    try {
      const userService = new UserService();
      dispatch({
        type: userTypes.CHANGE_PASSWORD_REQUEST,
      });

      const res = await userService.changePassword(new_password, password);

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

export const resetPasswordRequest = (email: string) => async (dispatch) => {
  try {
    const userService = new UserService();
    dispatch({
      type: userTypes.RESET_PASSWORD_REQUEST_REQUEST,
    });

    const res = await userService.resetPasswordRequest(email);

    dispatch({
      type: userTypes.RESET_PASSWORD_REQUEST_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: userTypes.RESET_PASSWORD_REQUEST_FAIL,
      payload:
        error.response && error.response.data?.error?.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const resetPassword = (password: string, token, id) => async (dispatch) => {
  try {
    const userService = new UserService();
    dispatch({
      type: userTypes.RESET_PASSWORD_REQUEST,
    });

    const res = await userService.resetPassword(password, token, id);

    dispatch({
      type: userTypes.RESET_PASSWORD_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: userTypes.RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data?.error?.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export default {
  login,
};
