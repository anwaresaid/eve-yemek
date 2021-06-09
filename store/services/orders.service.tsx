import { baseUrl } from "../../helpers/constants";
import axios from "../../helpers/_axios";

export default class OrdersService {

    getOrders() {
        return axios.get(baseUrl + '/orders')
                .then(res => res.data);
    }

    getOrder(id){
        return axios.get(baseUrl + '/orders/'+id)
                .then(res => res.data);
    }
}