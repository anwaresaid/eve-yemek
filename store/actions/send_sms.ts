import { sendSmsTypes } from '../types/send_sms';
import SendSmsService from '../services/send_sms';

export const sendSms = (users, message) => async (dispatch, getState) => {
    try{
        dispatch({
            type: sendSmsTypes.SEND_SMS_REQUEST
        });
        
        const sendSmsService = new SendSmsService;
        const res = await sendSmsService.sendSms(users, message);
        console.log(res);
        dispatch({
            type: sendSmsTypes.SEND_SMS_SUCCESS
        });
    }catch (error) {
        dispatch({
          type: sendSmsTypes.SEND_SMS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
}