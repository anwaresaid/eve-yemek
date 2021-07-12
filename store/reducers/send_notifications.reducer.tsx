import { sendNotificationTypes } from '../types/send_notifications.type';

export const sendNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case sendNotificationTypes.SEND_NOTIFICATION_REQUEST:
      return { loading: true };

    case sendNotificationTypes.SEND_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case sendNotificationTypes.SEND_NOTIFICATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const createNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case sendNotificationTypes.NOTIFICATION_CREATE_REQUEST:
      return { loading: true };

    case sendNotificationTypes.NOTIFICATION_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        notification: action.payload
      };

    case sendNotificationTypes.NOTIFICATION_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case sendNotificationTypes.NOTIFICATION_CREATE_RESET:
      return {}

    default:
      return state;
  }
};
