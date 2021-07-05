import axios from "../../helpers/_axios";

export default class SendSmsService {

    async sendSms(users, message) {
        await axios.post('/notifications/bulk-sms', {
            users,
            message
        })
    }
}
