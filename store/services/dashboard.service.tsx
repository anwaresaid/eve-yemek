import { baseUrl } from "../../helpers/constants";
import axios from "../../helpers/_axios";

export default class DashboardService {

    async getReport(){
        const {data}  = await axios.get(baseUrl + '/dashboard/reports/all')
        return data;
    }
}