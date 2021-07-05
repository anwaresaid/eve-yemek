import axios from "../../helpers/_axios";

export default class SendSmsService {

    async sendSms(users, message) {
        const data = await axios.post('/notifications/bulk-sms', {
            users,
            message
        })
        console.log(data);
    }
}
