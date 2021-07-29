import axios from "../../helpers/_axios";

export default class DemandService {

    async getDemandData() {
        const { data: { data } } = await axios.get('/users/demands');
        return data
    }
}