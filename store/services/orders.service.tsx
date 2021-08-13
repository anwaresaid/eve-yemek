import axios from "../../helpers/_axios";

export default class OrdersService {

    async getOrders(offset, limit, fields = null, text = null) {
        var query
        if (!fields || fields == '' || !text || text == '') {
            query = '/orders?offset=' + offset + '&limit=' + limit
        } else {
            query = '/orders?offset=' + offset + '&limit=' + limit + '&fields=' + fields + '&text=' + text
        }
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