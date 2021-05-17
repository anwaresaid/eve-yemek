import axios from "../../helpers/_axios";

export default class OrdersService {

    getOrders() {
        return axios.get('https://dev.eve-yemek.com/orders')
                .then(res => res.data);
    }

    getOrder(id){
        return axios.get('https://dev.eve-yemek.com/orders/'+id)
                .then(res => res.data);
    }
}