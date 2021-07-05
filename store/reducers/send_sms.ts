import { sendSmsTypes } from '../types/send_sms';

export const sendSmsReducer = (state = {}, action) => {
  switch (action.type) {
    case sendSmsTypes.SEND_SMS_REQUEST:
      return { loading: true };

    case sendSmsTypes.SEND_SMS_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case sendSmsTypes.SEND_SMS_FAIL:
      return {
        loading: false,
        error: action.payload || true,
      };

    default:
      return state;
  }
};
