import { userTypes } from '../types/user.type';
import UserService from '../services/user.service';
import auth from '../../helpers/core/auth';
import { i18n } from '../../language';

const login =
  (email: string, password: string, remember: boolean) => async (dispatch) => {
    try {
      const res: any = await UserService.login(email, password, remember);

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
      dispatch({
        type: userTypes.CHANGE_PASSWORD_REQUEST,
      });

      const res = await UserService.changePassword(new_password, password);

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
  login,
};
