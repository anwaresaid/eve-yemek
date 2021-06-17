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
}