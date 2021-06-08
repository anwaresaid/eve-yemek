import axios from 'axios';

const fcmUrl = 'https://fcm.googleapis.com/fcm/send';
let dto: any;

const sendFCM = async (title: string, message: string, ids: [] | string) => {
  dto = {
    to: ids,
    collapse_key: 'type_a',
    notification: {
      title,
      body: message,
    },
  };

  await send(dto);
};

const send = async (dto: object) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization':
        'key=AAAAVZiHLUQ:APA91bHhcjfRRvhY4JjcQL8Nea8xaJg6RN2oh3id4ta3qgwEmd-AmJweVMEjDVPiqk0lBtT0nWKefrscFqNltLrlZ03rOyg6Eud9cJW4SeNASbKweY-UupNtJFFSY_jEZkmjVMSXJLvo',
    },
  };

  return await axios.post(fcmUrl, dto, config);
};

export default sendFCM;
