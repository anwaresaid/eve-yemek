import axios from "../../helpers/_axios";

export default class PaymentsService {

    async getUntransferedPayments() {
        const { data: { data } } = await axios.get('/payment/transfer');
        return data
    }

    async makeManualTransfer(id) {
        const { data: { data } } = await axios.post('/payment/transfer/' + id)
        return data
    }
}