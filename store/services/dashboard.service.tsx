import axios from "../../helpers/_axios";

export default class DashboardService {

    async getDailyOrders(){
        const {data}  = await axios.get('https://dev.eve-yemek.com/dashboard/orders/daily')
        return data;
    }
}