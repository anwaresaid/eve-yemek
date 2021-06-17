import { sendNotificationTypes } from '../types/send_notifications.type';
import { usersListTypes } from '../types/userslists.type';
import SendNotificationService from '../services/send_notifications.service';
import UserListService from '../services/userslists.service';

export const sendNotifications =
  (title, message, user_ids) => async (dispatch, getState) => {
    try {
      dispatch({
        type: usersListTypes.USERS_FCM_TOKEN_REQUEST,
      });

      const userListService = new UserListService();
      const result = await userListService.getFcmTokensFromUserIds(user_ids);

      dispatch({
        type: usersListTypes.USERS_FCM_TOKEN_SUCCESS,
        payload: result,
      });

      dispatch({
        type: sendNotificationTypes.SEND_NOTIFICATION_REQUEST,
      });

      const sendNotificationService = new SendNotificationService();
      const res = await sendNotificationService.sendNotifications(
        title,
        message,
        result
      );

      dispatch({
        type: sendNotificationTypes.SEND_NOTIFICATION_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: sendNotificationTypes.SEND_NOTIFICATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
