import axios from 'axios';

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

  //prettier-ignore
  private async send(dto) {
    console.log(process.env.FCM_REQUEST_KEY);
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
