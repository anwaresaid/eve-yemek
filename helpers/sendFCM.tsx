const fcmUrl = 'https://fcm.googleapis.com/fcm/send';
let dto: any;

const sendFCM = (
  title: string,
  message: string,
  ids: [] | string,
  multiple: boolean = false
) => {
  if (multiple) {
    dto = [];
  }
};

export default sendFCM;
