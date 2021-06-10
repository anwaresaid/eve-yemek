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
    const fcmUrl = 'https://fcm.googleapis.com/fcm/send';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':
          'key=AAAAVZiHLUQ:APA91bHhcjfRRvhY4JjcQL8Nea8xaJg6RN2oh3id4ta3qgwEmd-AmJweVMEjDVPiqk0lBtT0nWKefrscFqNltLrlZ03rOyg6Eud9cJW4SeNASbKweY-UupNtJFFSY_jEZkmjVMSXJLvo',
      },
    };

    return await axios.post(fcmUrl, dto, config);
  }
}
