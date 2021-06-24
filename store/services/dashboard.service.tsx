import axios from "../../helpers/_axios";

export default class DashboardService {

    async getReport(){
        const {data:{data}}  = await axios.get('/dashboard/reports/all')
        return data;
    }
}