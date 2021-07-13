import axios from "../../helpers/_axios";

export default class OrdersService {

    getOrders() {
        return axios.get('/orders')
                .then(res => res.data.data);
    }

    getOrder(id){
        return axios.get('/orders/'+id)
                .then(res => res.data.data);
    }

    updateOrderStatus(id, status){
        return axios.put('/orders/' + id, {'status': status}).then(res => res.data.data)
    }

    updateDeliveryStatus(id, status){
        return axios.put('/delivery/status', {'order': id, 'status': status}).then(res => res.data.data)
    }
}