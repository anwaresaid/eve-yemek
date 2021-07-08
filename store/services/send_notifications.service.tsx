import axios from 'axios';
import customAxios from '../../helpers/_axios'
export default class SendNotificationService {
  public async sendNotifications(title, message, fcm_tokens) {
    const dto = {
      registration_ids: fcm_tokens,
      collapse_key: 'type_a',
      notification: {
        title,
        body: message,
      },
    };

    await this.send(dto);
  }

  public async createNotification(user_id: string, message: string) {
    const {
      data: { data },
    } = await customAxios.post('/notifications', {user: user_id, message});
    return data;
  }

  //prettier-ignore
  private async send(dto) {
    const fcmUrl = 'https://fcm.googleapis.com/fcm/send';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':
          `key=${process.env.NEXT_PUBLIC_FCM_REQUEST_KEY}`,
      },
    };

    return await axios.post(fcmUrl, dto, config);
  }
}
