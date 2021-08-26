import axios from "../../helpers/_axios";

export default class OrdersService {

    async getOrders(...args) {
        let query = '/orders?'
        Object.keys(args[0]).forEach(key => query += args[0][key] ? (key + '=' + args[0][key] + '&'): '')
        const { data: { data } } = await axios.get(query)
        return data;
    }

    getOrder(id) {
        return axios.get('/orders/' + id)
            .then(res => res.data.data);
    }

    updateOrderStatus(id, status) {
        return axios.put('/orders/' + id, { 'status': status }).then(res => res.data.data)
    }

    updateDeliveryStatus(id, status) {
        return axios.put('/delivery/status', { 'order': id, 'status': status }).then(res => res.data.data)
    }
}